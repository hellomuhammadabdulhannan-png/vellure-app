/**
 * VELLURE print engine
 *
 * Why this exists:
 * window.print() prints the WHOLE web page (header, lists, dark theme, modals...).
 * On a thermal printer that becomes 6-8 pages. Instead we render only the thing to be
 * printed inside a hidden #print-root (see PrintPortal + print.css) and tell the browser
 * the exact paper size through @page right before printing.
 */

export interface PrintSpec {
  /** Paper width in millimetres (e.g. 80 for an 80mm roll, 76 for a 3"x2" label). */
  widthMm: number;
  /** Paper height in mm. Leave out together with autoHeight for continuous rolls. */
  heightMm?: number;
  /** Measure the content and use its height (continuous receipt roll). */
  autoHeight?: boolean;
  /** Page margin in mm (default 0). */
  marginMm?: number;
}

const STYLE_ID = 'vellure-page-style';
const PX_PER_MM = 96 / 25.4;

function getPageStyleEl(): HTMLStyleElement {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

function measureHeightMm(root: HTMLElement, widthMm: number): number {
  const previousStyle = root.getAttribute('style');
  root.style.cssText =
    `display:block;position:absolute;left:-99999px;top:0;visibility:hidden;width:${widthMm}mm;`;
  const heightPx = root.scrollHeight;
  if (previousStyle === null) root.removeAttribute('style');
  else root.setAttribute('style', previousStyle);
  return Math.ceil(heightPx / PX_PER_MM);
}

export function printNow(spec: PrintSpec): void {
  const root = document.getElementById('print-root');
  if (!root) {
    window.print();
    return;
  }

  const margin = spec.marginMm ?? 0;
  let heightMm = spec.heightMm;
  if (spec.autoHeight || heightMm === undefined) {
    // +4mm so the cutter does not slice through the last line
    heightMm = measureHeightMm(root, spec.widthMm - margin * 2) + margin * 2 + 4;
  }

  const styleEl = getPageStyleEl();
  styleEl.textContent = `@page { size: ${spec.widthMm}mm ${heightMm}mm; margin: ${margin}mm; }`;

  const cleanup = () => {
    styleEl.textContent = '';
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);

  // small delay so the browser applies the new @page rule first
  window.setTimeout(() => window.print(), 80);
}

/** Convert millimetres to CSS pixels (96 dpi) - used for scaling fixed-pixel layouts. */
export function mmToPx(mm: number): number {
  return mm * PX_PER_MM;
}

/** Remember a UI choice (paper format etc.) so it only has to be picked once. */
export function loadSetting<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const v = localStorage.getItem(`vellure_print_${key}`);
    if (v && (allowed as readonly string[]).includes(v)) return v as T;
  } catch {
    /* ignore storage errors */
  }
  return fallback;
}

export function saveSetting(key: string, value: string): void {
  try {
    localStorage.setItem(`vellure_print_${key}`, value);
  } catch {
    /* ignore storage errors */
  }
}
