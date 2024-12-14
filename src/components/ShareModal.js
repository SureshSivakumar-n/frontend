import React, { useRef, useEffect } from 'react';

const ShareModal = () => {
  const shareButtonRef = useRef(null); 

  const handleShareClick = () => {
    // Logic for sharing content (e.g., using a sharing library)
  };

  useEffect(() => {
    if (shareButtonRef.current) { 
      shareButtonRef.current.addEventListener('click', handleShareClick); 
    }

    return () => { 
      if (shareButtonRef.current) {
        shareButtonRef.current.removeEventListener('click', handleShareClick); 
      }
    };
  }, [shareButtonRef]); 

  return (
    <div>
      {/* Other modal content */}
      <button id="share-button" ref={shareButtonRef}>Share</button> 
    </div>
  );
};

export default ShareModal;