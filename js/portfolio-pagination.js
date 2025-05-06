
    // Configuration
    const itemsPerPage = 6; // Show 6 items per page
    const paginationContainer = document.querySelector('.pagination-container');
    let currentPage = 1;

    function getTotalItems() {
        return document.querySelectorAll('.portfolio-box').length;
    }
    function getTotalPages() {
        return Math.ceil(getTotalItems() / itemsPerPage);
    }

    // Initialize pagination
    function initPagination() {
        createPaginationButtons();
        showPage(currentPage);
    }

    // Create pagination buttons
    function createPaginationButtons() {
        // Clear any existing buttons
        paginationContainer.innerHTML = '';

        // Add Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePaginationButtons();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Add number buttons
        const totalPages = getTotalPages();
        console.log('Pagination Debug: totalPages =', totalPages, ', totalItems =', getTotalItems());
        if (totalPages < 1 && getTotalItems() > 0) {
            // fallback: always show at least 1 page if there are items
            totalPages = 1;
        }
        for (let i = 1; i <= totalPages; i++) {
            const numButton = document.createElement('button');
            numButton.textContent = i;
            numButton.classList.toggle('active', i === currentPage);
            numButton.addEventListener('click', (function(pageNum) {
                return function() {
                    currentPage = pageNum;
                    showPage(currentPage);
                    updatePaginationButtons();
                };
            })(i));
            paginationContainer.appendChild(numButton);
        }

        // Add Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === getTotalPages();
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                updatePaginationButtons();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Update pagination buttons state
    function updatePaginationButtons() {
        const totalPages = getTotalPages();
        const buttons = paginationContainer.querySelectorAll('button');
        
        // Update Prev button
        buttons[0].disabled = currentPage === 1;
        
        // Update number buttons
        for (let i = 1; i <= totalPages; i++) {
            buttons[i].classList.toggle('active', i === currentPage);
        }
        
        // Update Next button
        buttons[totalPages + 1].disabled = currentPage === totalPages;
    }

    // Show items for the current page
    function showPage(page) {
        const portfolioBoxes = document.querySelectorAll('.portfolio-box');
        const totalItems = portfolioBoxes.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

        // Hide all items
        portfolioBoxes.forEach((box) => {
            box.style.display = 'none';
        });

        // Show items for current page
        for (let i = startIndex; i < endIndex; i++) {
            if (portfolioBoxes[i]) {
                portfolioBoxes[i].style.display = 'block';
            }
        }

        // Scroll to portfolio section
        const portfolioSection = document.querySelector('#portfolio');
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Initialize pagination when DOM is loaded
    initPagination();
});
