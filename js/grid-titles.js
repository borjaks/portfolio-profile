/**
 * Grid Lightbox Enhancement
 * Ensure grid images can be clicked to open the lightbox with their titles
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all grid images
  const gridImages = document.querySelectorAll('.grid-box img');
  
  // Add click handlers for each image
  gridImages.forEach(img => {
    // Make sure cursor shows it's clickable
    img.style.cursor = 'pointer';
    
    // Add click event to open lightbox
    img.addEventListener('click', function(e) {
      // Get the parent grid box
      const gridBox = this.closest('.grid-box');
      if (!gridBox) return;
      
      // Get title from data-title attribute
      const title = gridBox.getAttribute('data-title') || '';
      
      // If lightbox function exists, open it
      if (typeof openLightbox === 'function') {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(this.src, title);
      }
    });
  });
});
