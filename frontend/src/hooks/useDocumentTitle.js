import { useEffect } from 'react';

/**
 * Custom Hook: useDocumentTitle
 * Sets the browser document title dynamically based on current page view.
 * 
 * @param {string} title - Page title suffix
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | TaskFlow` : 'TaskFlow – Task Management System';

    // Cleanup on unmount
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
