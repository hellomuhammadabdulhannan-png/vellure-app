import React from 'react';
import { Invoice } from '../types';
import { BRAND_DETAILS } from '../data/initialData';
import { formatBDT } from '../utils/formatters';
import { SvgBarcode } from './SvgBarcode';
import { SvgQrCode } from './SvgQrCode';
import { VELLURE_LOGO_PRINT } from '../assets/logo';

/* ------------------------------------------------------------------ */
/*  Invoice: 80mm thermal receipt  (or A4)                             */
/* ------------------------------------------------------------------ */

export type InvoiceFormat = 'thermal80' | 'a4';

const dashed: React.CSSProperties = { borderTop: '1px dashed #000', margin: '1.6mm 0' };
const row: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '2mm' };

export const ReceiptInvoicePrint: React.FC<{ invoice: Invoice; format: InvoiceFormat; compact?: boolean }> = ({
  invoice,
  format,
  compact = false,
}) => {
  const isA4 = format === 'a4';
  const unpaid = invoice.codAmount > 0;

  return (
    <div
      className="vp-page"
      style={{
        width: isA4 ? '190mm' : '72mm',
        margin: isA4 ? '0 auto' : '0 4mm',
        padding: isA4 ? '4mm 0' : '2mm 2.5mm',
        background: '#fff',
        color: '#000',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        fontSize: isA4 ? '11pt' : '8.5pt',
        lineHeight: 1.3,
        boxSizing: 'border-box',
      }}
    >
      {/* Brand */}
      <div style={{ textAlign: 'center' }}>
        <img
          src={VELLURE_LOGO_PRINT}
          alt={BRAND_DETAILS.name}
          style={{ width: isA4 ? (compact ? '30mm' : '48mm') : compact ? '18mm' : '36mm', height: 'auto', display: 'block', margin: '0 auto' }}
        />
        <div style={{ fontSize: isA4 ? '9pt' : '7.5pt', marginTop: '1mm' }}>{BRAND_DETAILS.address}</div>
        <div style={{ fontSize: isA4 ? '9pt' : '7.5pt' }}>
          {BRAND_DETAILS.mobile} • {BRAND_DETAILS.website}
        </div>
      </div>

      <div style={dashed} />

      {/* Invoice meta */}
      <div style={row}>
        <strong>INVOICE #{invoice.id}</strong>
        <span>{invoice.date}</span>
      </div>

      <div style={dashed} />

      {/* Customer */}
      <div>
        <div style={{ fontWeight: 700, fontSize: isA4 ? '12pt' : '9.5pt' }}>{invoice.customerName}</div>
        <div style={{ fontWeight: 600 }}>{invoice.customerPhone}</div>
        <div>
          {invoice.deliveryAddress}, {invoice.district}
          {invoice.thana ? `, ${invoice.thana}` : ''}
        </div>
        <div style={{ marginTop: '0.8mm' }}>
          Courier: <strong>{invoice.courierPartner}</strong>
        </div>
        <div>
          Tracking: <strong>{invoice.trackingId}</strong>
        </div>
      </div>

      <div style={dashed} />

      {/* Items */}
      <div style={{ ...row, fontWeight: 700, textTransform: 'uppercase', fontSize: isA4 ? '9pt' : '7.5pt' }}>
        <span>Item</span>
        <span>Amount</span>
      </div>
      {invoice.items.map((item, idx) => (
        <div key={idx} style={{ margin: '1.2mm 0', breakInside: 'avoid' }}>
          <div style={row}>
            <span style={{ fontWeight: 600, flex: 1 }}>
              {item.productName} ({item.size})
            </span>
            <strong>{formatBDT(item.quantity * item.unitPrice)}</strong>
          </div>
          <div style={{ fontSize: isA4 ? '9pt' : '7.5pt' }}>
            {item.quantity} x {formatBDT(item.unitPrice)}
            {item.type ? ` • ${item.type}` : ''}
          </div>
        </div>
      ))}

      <div style={dashed} />

      {/* Totals */}
      <div style={row}>
        <span>Subtotal</span>
        <span>{formatBDT(invoice.subtotal)}</span>
      </div>
      <div style={row}>
        <span>Delivery Fee</span>
        <span>+{formatBDT(invoice.deliveryFee)}</span>
      </div>
      {invoice.discount > 0 && (
        <div style={row}>
          <span>Discount</span>
          <span>-{formatBDT(invoice.discount)}</span>
        </div>
      )}
      {invoice.advancePaid > 0 && (
        <div style={row}>
          <span>Advance Received</span>
          <span>-{formatBDT(invoice.advancePaid)}</span>
        </div>
      )}

      <div
        style={{
          ...row,
          marginTop: '1.5mm',
          padding: '1.2mm 1.5mm',
          border: '1.5px solid #000',
          fontWeight: 800,
          fontSize: isA4 ? '13pt' : '10.5pt',
        }}
      >
        <span>{unpaid ? 'COD PAYABLE' : 'PAID IN FULL'}</span>
        <span>{formatBDT(invoice.codAmount)}</span>
      </div>

      <div style={{ marginTop: '1.2mm', fontSize: isA4 ? '9pt' : '7.5pt' }}>
        Payment: {invoice.paymentMethod} • {invoice.paymentStatus}
      </div>
      {invoice.notes ? (
        <div style={{ marginTop: '0.8mm', fontSize: isA4 ? '9pt' : '7.5pt' }}>Note: {invoice.notes}</div>
      ) : null}

      <div style={{ marginTop: '2mm', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: isA4 ? '70mm' : '56mm' }}>
          <SvgBarcode value={invoice.trackingId} height={isA4 ? 44 : 34} showText={true} />
        </div>
      </div>

      <div style={dashed} />

      <div style={{ textAlign: 'center', fontSize: isA4 ? '10pt' : '8pt' }}>
        <div style={{ fontWeight: 700 }}>Thank you for choosing {BRAND_DETAILS.name}</div>
        <div>WhatsApp: {BRAND_DETAILS.whatsapp}</div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Thank-you sticker for thermal rolls (3"x2" or 80mm)                */
/* ------------------------------------------------------------------ */

export type ThankYouThermalVariant = '3x2' | '80mm';

export const ThankYouThermalPrint: React.FC<{
  variant: ThankYouThermalVariant;
  recipientName: string;
  fragrance: string;
  message: string;
}> = ({ variant, recipientName, fragrance, message }) => {
  const compact = variant === '3x2';
  const clamp = (lines: number): React.CSSProperties => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  });

  return (
    <div
      className="vp-page"
      style={{
        // 3"x2" label = 76 x 50 mm (kept a hair smaller than the page to avoid a spill-over page)
        width: compact ? '75mm' : '72mm',
        height: compact ? '49mm' : undefined,
        margin: compact ? '0' : '0 4mm',
        padding: compact ? '2mm 2.5mm' : '3mm 0',
        boxSizing: 'border-box',
        background: '#fff',
        color: '#000',
        textAlign: 'center',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src={VELLURE_LOGO_PRINT}
          alt={BRAND_DETAILS.name}
          style={{ height: compact ? '12mm' : '22mm', width: 'auto', display: 'block', margin: '0 auto' }}
        />
      </div>

      <div>
        <div style={{ fontWeight: 800, fontSize: compact ? '9pt' : '12pt', ...clamp(1) }}>
          Thank You, {recipientName}
        </div>
        <div style={{ fontStyle: 'italic', fontSize: compact ? '6pt' : '8pt', marginTop: '0.8mm', ...clamp(compact ? 2 : 4) }}>
          {message}
        </div>
        <div
          style={{
            display: 'inline-block',
            maxWidth: '100%',
            marginTop: '1mm',
            padding: '0.4mm 2mm',
            border: '1px solid #000',
            fontWeight: 700,
            fontSize: compact ? '6pt' : '8pt',
            ...clamp(1),
          }}
        >
          {fragrance}
        </div>
      </div>

      {!compact && (
        <div style={{ fontSize: '7pt', margin: '1.5mm 0' }}>
          Let the flacon rest 24 hours after transit. Apply to warm pulse points for long-lasting sillage.
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', gap: '2mm' }}>
        <div style={{ fontSize: compact ? '5.5pt' : '7.5pt', lineHeight: 1.3 }}>
          <div style={{ fontWeight: 700 }}>{BRAND_DETAILS.website}</div>
          <div>WhatsApp: {BRAND_DETAILS.whatsapp}</div>
        </div>
        <SvgQrCode
          value={`https://${BRAND_DETAILS.website}/vip?customer=${encodeURIComponent(recipientName)}`}
          size={compact ? 52 : 72}
        />
      </div>
    </div>
  );
};
