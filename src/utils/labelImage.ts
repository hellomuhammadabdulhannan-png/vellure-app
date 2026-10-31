/**
 * Turn an on-screen label (a DOM element) into a crisp black & white PNG at the
 * thermal printer's real resolution (203 DPI for Rongta RP328).
 *
 * Why: when a phone "prints" a PDF the printer app shrinks the page to fit the
 * sticker, leaving a tiny, faint label. An image that is already exactly the
 * sticker's pixel size is printed 1:1 by every thermal printer app.
 */

export const THERMAL_DPI = 203;

export function mmToDots(mm: number, dpi = THERMAL_DPI): number {
  return Math.max(1, Math.round((mm / 25.4) * dpi));
}

const SKIP_PROPS = new Set(['transition', 'animation']);

function copyComputedStyles(src: Element, dst: Element): void {
  const cs = window.getComputedStyle(src);
  const out = (dst as HTMLElement).style;
  if (out) {
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];
      if (SKIP_PROPS.has(prop) || prop.startsWith('transition') || prop.startsWith('animation')) continue;
      out.setProperty(prop, cs.getPropertyValue(prop), cs.getPropertyPriority(prop));
    }
  }
  const sKids = Array.from(src.children);
  const dKids = Array.from(dst.children);
  for (let i = 0; i < sKids.length; i++) {
    if (dKids[i]) copyComputedStyles(sKids[i], dKids[i]);
  }
}

async function toDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:')) return url;
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(blob);
  });
}

async function inlineImages(root: HTMLElement): Promise<void> {
  const imgs = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    imgs.map(async (img) => {
      const src = img.getAttribute('src');
      if (src) img.setAttribute('src', await toDataUrl(src));
    })
  );
}

export interface LabelImageOptions {
  /** Target width/height in printer dots (pixels). */
  widthPx: number;
  heightPx: number;
  /** Black/white cut-off 0-255. Higher = darker print. */
  threshold?: number;
  /** 'stretch' fills the sticker (default). 'contain' shrinks the whole thing so everything fits. */
  fit?: 'stretch' | 'contain';
}

export async function labelElementToPng(el: HTMLElement, opts: LabelImageOptions): Promise<Blob> {
  const { widthPx, heightPx } = opts;
  const threshold = opts.threshold ?? 185;

  const srcW = el.offsetWidth;
  const srcH = el.offsetHeight;

  const clone = el.cloneNode(true) as HTMLElement;
  copyComputedStyles(el, clone);
  await inlineImages(clone);

  const contain = opts.fit === 'contain';
  let boxW = srcW;
  let boxH: number;
  let scale: number;
  let offX = 0;
  if (contain) {
    boxH = srcH;
    scale = Math.min(widthPx / srcW, heightPx / srcH);
    offX = Math.max(0, (widthPx - srcW * scale) / 2);
  } else {
    // stretch the design to the target aspect ratio so the sticker is filled edge to edge
    boxH = Math.max(Math.round((srcW * heightPx) / widthPx), 1);
    scale = widthPx / srcW;
  }
  clone.style.width = `${boxW}px`;
  clone.style.height = `${boxH}px`;
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  clone.style.boxSizing = 'border-box';

  const xhtml = new XMLSerializer().serializeToString(clone);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${widthPx}" height="${heightPx}">` +
    `<rect width="100%" height="100%" fill="#fff"/>` +
    `<g transform="translate(${offX},0) scale(${scale})">` +
    `<foreignObject x="0" y="0" width="${boxW}" height="${boxH}">` +
    `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${boxW}px;height:${boxH}px;background:#fff">${xhtml}</div>` +
    `</foreignObject></g></svg>`;

  const img = new Image();
  img.decoding = 'sync';
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Label could not be rendered'));
  });
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await loaded;

  const canvas = document.createElement('canvas');
  canvas.width = widthPx;
  canvas.height = heightPx;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, widthPx, heightPx);
  ctx.drawImage(img, 0, 0, widthPx, heightPx);

  // pure black & white: no grey anti-aliasing, so thermal heads print solid dark pixels
  const data = ctx.getImageData(0, 0, widthPx, heightPx);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
    const v = lum < threshold ? 0 : 255;
    px[i] = px[i + 1] = px[i + 2] = v;
    px[i + 3] = 255;
  }
  ctx.putImageData(data, 0, 0);

  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png')
  );
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function shareBlob(blob: Blob, filename: string): Promise<boolean> {
  const file = new File([blob], filename, { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: filename });
      return true;
    } catch {
      return false; // user cancelled
    }
  }
  return false;
}
