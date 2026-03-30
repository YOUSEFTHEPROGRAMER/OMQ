document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================================================
       DEEPTH CREATION - MAIN JAVASCRIPT ENGINE
       Handles: Dynamic Portfolio, Sensor Cursor, Scroll Reveals & Theme Core
       ========================================================================= */

    /* ==== 1. VISITOR NAME RETRIEVAL ==== */
    const visitorName = localStorage.getItem('visitorName');
    const dynamicNameEl = document.getElementById('dynamic-visitor-name');
    if(dynamicNameEl) {
        dynamicNameEl.textContent = visitorName ? visitorName : 'Creator';
    }

    /* ==== 2. UNIVERSAL SENSOR CURSOR ==== */
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;
        
        // Track mouse
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instant dot update
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            // Subtly move the edge patterns (parallax effect on main background)
            const patterns = document.querySelectorAll('.edge-pattern-1bb, .edge-pattern-2bb');
            const xMap = (window.innerWidth - mouseX * 2) / 100;
            const yMap = (window.innerHeight - mouseY * 2) / 100;
            
            patterns.forEach(pattern => {
                const speed = pattern.getAttribute('data-speed') || 1;
                pattern.style.transform = `translate(${xMap * speed * 2}px, ${yMap * speed * 2}px)`;
            });
        });
        
        // Smooth outline physics
        const animateCursor = () => {
            const dx = mouseX - outlineX;
            const dy = mouseY - outlineY;
            
            outlineX += dx * 0.15; // Smooth trailing
            outlineY += dy * 0.15;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);
        
        // Setup Hover Targets
        const setupHovers = () => {
            // General buttons/links trigger
            const hoverTargets = document.querySelectorAll(".hover-target, button, a");
            hoverTargets.forEach(target => {
                target.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-hovering"));
                target.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-hovering"));
            });

            // Project/Image Hover (View mode)
            const projectTargets = document.querySelectorAll(".project-hover, .project-card");
            projectTargets.forEach(target => {
                target.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-project"));
                target.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-project"));
            });
        };
        
        // Initial setup
        setTimeout(setupHovers, 500); // small delay to let DOM inject
    }

    /* ==== 3. DYNAMIC PORTFOLIO INJECTION ==== */
    const galleryContainer = document.getElementById("gallery-container");
    const numImages = 14; 
    
    // Abstract Creative Categories
    const categories = [
        { title: "Visual Identity", cat: "Branding" },
        { title: "Digital Campaign", cat: "Social Experience" },
        { title: "Print Layout", cat: "Editorial Design" },
        { title: "Cyber Concept", cat: "UI/UX Aesthetic" },
        { title: "Motion Pack", cat: "Graphic Animation" }
    ];

    if (galleryContainer) {
        galleryContainer.innerHTML = ''; // Clear fallback
        for (let i = 1; i <= numImages; i++) {
            const template = categories[(i - 1) % categories.length];
            const delay = (i % 3) * 0.2; // Staggered reveal delays
            
            const card = document.createElement("a");
            card.href = "#"; // Replace with real links if needed
            card.className = "project-card reveal fade-up";
            card.style.transitionDelay = `${delay}s`;
            
            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="images/${i}.png" class="project-img" alt="${template.title} ${i}" onerror="this.onerror=null; this.src='images/${i}.jpg';">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${template.title}</h3>
                    <span class="project-category">${template.cat} // VOL. ${Math.floor(Math.random() * 9) + 1}</span>
                </div>
            `;
            galleryContainer.appendChild(card);
        }
    }

    /* ==== 4. SCROLL REVEAL (IntersectionObserver Engine) ==== */
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => scrollObserver.observe(el));


    /* ==== 5. NAVBAR SCROLL INTELLIGENCE ==== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* ==== 6. THEME TOGGLE (LIGHT / DARK SWITCH) ==== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    const sunIcon = `<svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Default to Light Mode based on body class, unless overridden by storage
    const savedTheme = localStorage.getItem("deepth-theme");
    
    // User explicitly chose dark before
    if (savedTheme === "dark") {
        document.body.classList.remove("light-mode");
        themeToggleBtn.innerHTML = sunIcon;
    } else {
        // Defaults to light (as set in index.html class="light-mode")
        document.body.classList.add("light-mode");
        themeToggleBtn.innerHTML = moonIcon;
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        
        localStorage.setItem("deepth-theme", isLight ? "light" : "dark");
        themeToggleBtn.innerHTML = isLight ? moonIcon : sunIcon;
    });

});
