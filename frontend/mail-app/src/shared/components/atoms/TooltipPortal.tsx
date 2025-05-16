import { createPortal } from 'react-dom';
import React from 'react';

interface TooltipPortalProps {
  children: React.ReactNode;
  position: { top: number; left: number };
}

export const TooltipPortal: React.FC<TooltipPortalProps> = ({ children, position }) => {
  return createPortal(
    <div style={{
      position: 'fixed',
      top: position.top,
      left: position.left,
      zIndex: 9999,
      pointerEvents: 'none',
    }}>
      {children}
    </div>,
    document.body
  );
}; 