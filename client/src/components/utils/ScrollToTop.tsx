import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Some routes (like Home) might require wrapping container to scroll
    // But default window scroll should be reset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    
    // Attempt to scroll the main container if it exists
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      if (mainContainer.style.overflowY === 'auto' || mainContainer.classList.contains('overflow-y-auto')) {
        mainContainer.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }
    }
  }, [pathname]);

  return null;
}
