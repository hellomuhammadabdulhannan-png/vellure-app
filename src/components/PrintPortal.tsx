import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders its children into <body> inside #print-root.
 * On screen it is hidden; when printing, print.css hides the rest of the app
 * and shows only this container, so exactly one clean document is printed.
 */
export const PrintPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(<div id="print-root">{children}</div>, document.body);
};
