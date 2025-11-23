// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .education-card, .certification-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form Validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add click event to project links to track analytics (optional)
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // You can add analytics tracking here
        console.log('Project link clicked:', link.href);
    });
});

// Add animation to skill tags on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Image Upload Functionality
const imageUpload = document.getElementById('image-upload');
const profileImage = document.getElementById('profile-image');
const imagePlaceholder = document.getElementById('image-placeholder');

// Load saved image from localStorage on page load
window.addEventListener('load', () => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
        profileImage.style.display = 'block';
        imagePlaceholder.style.display = 'none';
    }
});

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            profileImage.src = imageUrl;
            profileImage.style.display = 'block';
            imagePlaceholder.style.display = 'none';
            
            // Save to localStorage
            localStorage.setItem('profileImage', imageUrl);
        };
        reader.readAsDataURL(file);
    }
});

// CV Upload Functionality
const cvUpload = document.getElementById('cv-upload');
const cvStatus = document.getElementById('cv-status');
const cvPreview = document.getElementById('cv-preview');
const cvFilename = document.getElementById('cv-filename');
const removeCvBtn = document.getElementById('remove-cv');
const downloadCvBtn = document.getElementById('download-cv');

// Load saved CV from localStorage on page load
window.addEventListener('load', () => {
    const savedCv = localStorage.getItem('cvFile');
    const savedCvName = localStorage.getItem('cvFileName');
    if (savedCv && savedCvName) {
        displayCvPreview(savedCv, savedCvName);
    }
});

cvUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        if (file.type !== 'application/pdf') {
            showCvStatus('Please select a PDF file', 'error');
            cvUpload.value = '';
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showCvStatus('CV size should be less than 10MB', 'error');
            cvUpload.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const cvData = event.target.result;
            const fileName = file.name;
            
            // Save to localStorage
            localStorage.setItem('cvFile', cvData);
            localStorage.setItem('cvFileName', fileName);
            
            displayCvPreview(cvData, fileName);
            showCvStatus('CV uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

function displayCvPreview(cvData, fileName) {
    cvFilename.textContent = fileName;
    cvPreview.style.display = 'flex';
    downloadCvBtn.style.display = 'inline-block';
    downloadCvBtn.href = cvData;
    downloadCvBtn.download = fileName;
}

function showCvStatus(message, type) {
    cvStatus.textContent = message;
    cvStatus.className = `cv-status ${type}`;
    setTimeout(() => {
        cvStatus.style.display = 'none';
    }, 3000);
}

// Remove CV
removeCvBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove the CV?')) {
        localStorage.removeItem('cvFile');
        localStorage.removeItem('cvFileName');
        cvPreview.style.display = 'none';
        downloadCvBtn.style.display = 'none';
        cvUpload.value = '';
        cvStatus.style.display = 'none';
    }
});

// Download CV button click handler
downloadCvBtn.addEventListener('click', (e) => {
    const cvData = localStorage.getItem('cvFile');
    if (!cvData) {
        e.preventDefault();
        alert('No CV uploaded yet');
    }
});

