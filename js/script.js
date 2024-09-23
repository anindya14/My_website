// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // If the form is valid, you can submit it
                // For now, we'll just show an alert
                alert('Form submitted successfully!');
                this.reset();
            }
        });
    });

    // Add a scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('id', 'scrollToTopBtn');
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Add hover effect to project cards (if they exist)
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Form validation function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
        }
    });
    return isValid;
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
