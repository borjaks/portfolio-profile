// Final solution: Create a fixed set of image viewer buttons outside the carousel

// Function to wait for DOM content to be fully loaded
function ready(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

// Our main initialization function
ready(function() {
  console.log('Initializing image viewer');
  
  // Create the lightbox HTML structure
  const lightboxHTML = `
    <div class="lightbox-overlay">
      <div class="lightbox-container">
        <img class="lightbox-image" src="" alt="Full-size image">
        <button class="lightbox-close">&times;</button>
      </div>
    </div>
  `;
  
  // Add the lightbox HTML to the body
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  
  // Get references to lightbox elements
  const lightbox = document.querySelector('.lightbox-overlay');
  const lightboxImg = document.querySelector('.lightbox-image');
  const closeBtn = document.querySelector('.lightbox-close');
  
  // Function to open the lightbox with a specific image
  function openLightbox(imgSrc) {
    console.log('Opening lightbox with image:', imgSrc);
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Handle grid images - these work fine
  const gridImages = document.querySelectorAll('.grid-box img');
  console.log('Found', gridImages.length, 'grid images');
  
  gridImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(this.src);
    });
  });
  
  // Create a centrally positioned carousel image viewer
  const carouselImageViewer = document.createElement('div');
  carouselImageViewer.className = 'carousel-image-viewer';
  carouselImageViewer.innerHTML = `
    <div class="viewer-header">
      <h4>Carousel Images Gallery</h4>
      <p>Click any thumbnail to view full size</p>
    </div>
    <div class="thumbnail-container"></div>
  `;
  
  // Style the image viewer with responsive design
  carouselImageViewer.style.width = '100%';
  carouselImageViewer.style.maxWidth = '1200px';
  carouselImageViewer.style.margin = '0 auto 30px auto';
  carouselImageViewer.style.backgroundColor = 'var(--bg-color, #f5f5f5)';
  carouselImageViewer.style.borderRadius = '10px';
  carouselImageViewer.style.padding = '25px';
  carouselImageViewer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
  carouselImageViewer.style.color = 'var(--text-color, #333)';
  carouselImageViewer.style.fontFamily = 'Poppins, sans-serif';
  carouselImageViewer.style.textAlign = 'center';
  carouselImageViewer.style.zIndex = '5';
  carouselImageViewer.style.position = 'relative';
  carouselImageViewer.style.border = '1px solid rgba(0, 0, 0, 0.03)';
  carouselImageViewer.style.backdropFilter = 'blur(5px)';
  
  // Add media queries for responsive design
  const addResponsiveStyles = () => {
    if (window.innerWidth <= 768) {
      carouselImageViewer.style.padding = '15px';
      carouselImageViewer.style.maxWidth = '95%';
    } else {
      carouselImageViewer.style.padding = '25px';
      carouselImageViewer.style.maxWidth = '1200px';
    }
  };
  
  // Call initially and add resize listener
  addResponsiveStyles();
  window.addEventListener('resize', addResponsiveStyles);
  
  // Style the header
  const viewerHeader = carouselImageViewer.querySelector('.viewer-header');
  viewerHeader.style.marginBottom = '15px';
  
  // Style the heading
  const viewerHeading = carouselImageViewer.querySelector('h4');
  viewerHeading.style.fontSize = '1.8rem';
  viewerHeading.style.fontWeight = '600';
  viewerHeading.style.marginBottom = '5px';
  viewerHeading.style.color = 'var(--main-color, royalblue)';
  
  // Style the description
  const viewerDesc = carouselImageViewer.querySelector('p');
  viewerDesc.style.fontSize = '1.4rem';
  viewerDesc.style.marginBottom = '10px';
  viewerDesc.style.opacity = '0.8';
  
  // Style the thumbnail container with responsive design
  const thumbnailContainer = carouselImageViewer.querySelector('.thumbnail-container');
  thumbnailContainer.style.display = 'flex';
  thumbnailContainer.style.flexWrap = 'wrap';
  thumbnailContainer.style.justifyContent = 'center';
  thumbnailContainer.style.gap = '20px';
  thumbnailContainer.style.padding = '15px';
  thumbnailContainer.style.marginTop = '10px';
  
  // Add responsive design for thumbnail container
  const updateThumbnailLayout = () => {
    if (window.innerWidth <= 768) {
      thumbnailContainer.style.gap = '10px';
    } else if (window.innerWidth <= 1024) {
      thumbnailContainer.style.gap = '15px';
    } else {
      thumbnailContainer.style.gap = '20px';
    }
  };
  
  // Call initially and add resize listener
  updateThumbnailLayout();
  window.addEventListener('resize', updateThumbnailLayout);
  
  // Find the carousel container to insert our viewer before it
  const carousel = document.querySelector('#carousel-container');
  if (carousel) {
    // Insert the image viewer before the carousel
    carousel.parentNode.insertBefore(carouselImageViewer, carousel);
    
    // Hide gallery when in grid mode
    const syncGalleryWithViewMode = () => {
      // Check if carousel is hidden (grid mode is active)
      if (carousel.classList.contains('carousel-hide')) {
        // Hide the gallery when in grid mode
        carouselImageViewer.style.display = 'none';
      } else {
        // Show the gallery when in carousel mode
        carouselImageViewer.style.display = 'block';
      }
    };
    
    // Run initially to set correct state
    syncGalleryWithViewMode();
    
    // Watch for grid mode icon clicks
    const gridModeIcon = document.querySelector('#gridMode-icon');
    if (gridModeIcon) {
      gridModeIcon.addEventListener('click', syncGalleryWithViewMode);
    }
    
    // Also handle page load state
    window.addEventListener('DOMContentLoaded', syncGalleryWithViewMode);
  } else {
    // If no carousel is found, try to find the portfolio section
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
      // Try to add it at the bottom of the portfolio section
      portfolioSection.appendChild(carouselImageViewer);
    } else {
      // Fallback to just adding to the body
      document.body.appendChild(carouselImageViewer);
    }
  }
  
  // Collect all carousel images and add thumbnails
  const carouselImages = document.querySelectorAll('.carousel-item img');
  console.log('Found', carouselImages.length, 'carousel images');
  
  if (carouselImages.length > 0) {
    carouselImages.forEach((img, index) => {
      // Create a thumbnail for each image with responsive sizing
      const thumbnail = document.createElement('div');
      thumbnail.className = 'image-thumbnail';
      
      // Set responsive dimensions using a function
      const setThumbnailSize = () => {
        if (window.innerWidth <= 480) {
          thumbnail.style.width = '90px';
          thumbnail.style.height = '70px';
        } else if (window.innerWidth <= 768) {
          thumbnail.style.width = '110px';
          thumbnail.style.height = '85px';
        } else {
          thumbnail.style.width = '150px';
          thumbnail.style.height = '110px';
        }
      };
      
      // Call initially and add event listener
      setThumbnailSize();
      window.addEventListener('resize', setThumbnailSize);
      
      thumbnail.style.backgroundColor = 'var(--bg-color, #f5f5f5)';
      thumbnail.style.borderRadius = '8px';
      thumbnail.style.overflow = 'hidden';
      thumbnail.style.cursor = 'pointer';
      thumbnail.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      thumbnail.style.border = '1px solid rgba(0, 0, 0, 0.05)';
      thumbnail.style.transition = 'all 0.3s ease';
      thumbnail.style.margin = '5px';
      
      // Create image inside thumbnail with proper responsiveness
      const thumbImg = document.createElement('img');
      thumbImg.src = img.src;
      thumbImg.style.width = '100%';
      thumbImg.style.height = '100%';
      // Match the object-fit: contain setting from the memory about fixing image responsiveness
      thumbImg.style.objectFit = 'contain';
      thumbImg.style.transition = 'all 0.3s ease';
      thumbImg.style.backgroundColor = 'var(--bg-color, #f5f5f5)';
      thumbImg.style.padding = '5px';
      
      // Add data attribute to store the original image path for easier reference
      thumbImg.dataset.fullImage = img.src;
      
      thumbnail.appendChild(thumbImg);
      
      // Add caption with image number
      const caption = document.createElement('div');
      caption.className = 'thumbnail-caption';
      caption.textContent = `Image ${index + 1}`;
      caption.style.fontSize = '1.2rem';
      caption.style.padding = '5px';
      caption.style.textAlign = 'center';
      caption.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      caption.style.borderTop = '1px solid rgba(0, 0, 0, 0.05)';
      
      thumbnail.appendChild(caption);
      
      // Add hover effect
      thumbnail.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
      });
      
      thumbnail.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      });
      
      // Add click handler to open lightbox
      thumbnail.addEventListener('click', function() {
        openLightbox(img.src);
      });
      
      // Add thumbnail to container
      thumbnailContainer.appendChild(thumbnail);
    });
  } else {
    // If no carousel images found, show a message
    const noImagesMessage = document.createElement('p');
    noImagesMessage.textContent = 'No carousel images found on this page.';
    noImagesMessage.style.fontSize = '1.6rem';
    noImagesMessage.style.opacity = '0.7';
    noImagesMessage.style.padding = '20px';
    thumbnailContainer.appendChild(noImagesMessage);
    
    // Hide the image viewer if no images
    carouselImageViewer.style.display = 'none';
  }
  
  // Close lightbox when close button is clicked
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
});

// Add the lightbox styles
const cssStyles = `
  /* Lightbox styles */
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  
  .lightbox-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .lightbox-container {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    animation: lightbox-zoom 0.3s ease forwards;
  }
  
  @keyframes lightbox-zoom {
    from { transform: scale(0.5); }
    to { transform: scale(1); }
  }
  
  .lightbox-image {
    display: block;
    max-width: 100%;
    max-height: 90vh;
    margin: 0 auto;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
  
  .lightbox-close:hover {
    opacity: 1;
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .lightbox-close {
      top: -30px;
      right: 0;
    }
    
    .toggle-panel-button {
      bottom: 10px;
      right: 10px;
      padding: 6px 10px;
      font-size: 11px;
    }
    
    .carousel-control-panel {
      bottom: 10px;
      right: 10px;
    }
  }
`;

// Add the styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = cssStyles;
document.head.appendChild(styleElement);
