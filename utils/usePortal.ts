import { useEffect, useState } from 'react';

export function usePortal(id = 'portal-root') {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
    setPortalElement(element);
    return () => {
      if (element && element.parentNode) {
        // Only remove if we created it
        // (optional: keep if you want a persistent portal root)
        // element.parentNode.removeChild(element);
      }
    };
  }, [id]);

  return portalElement;
}
