import React from 'react';
import { WEBSITE_QR } from '../assets/logo';

interface SvgQrCodeProps {
  /** Kept for compatibility. The printed code is always the official VELLURE website QR. */
  value?: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

/**
 * Official VELLURE website QR code (real, scannable image).
 * Used on thermal labels, invoices and thank-you cards.
 */
export const SvgQrCode: React.FC<SvgQrCodeProps> = ({ size = 64, className = '' }) => (
  <img
    src={WEBSITE_QR}
    alt="VELLURE website QR code"
    width={size}
    height={size}
    className={`inline-block ${className}`}
    style={{ width: size, height: size, imageRendering: 'pixelated', background: '#ffffff' }}
  />
);
