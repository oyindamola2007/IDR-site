// Smooth scrolling for nav links and buttons
function setupSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"], [data-scroll-target]');

    scrollLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetSelector =
                link.getAttribute("data-scroll-target") || link.getAttribute("href");

            if (!targetSelector || !targetSelector.startsWith("#")) return;

            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) return;

            event.preventDefault();

            const headerOffset = document.querySelector("header")?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset + 2;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        });
    });
}

// Mobile navigation toggle
function setupNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navCta = document.querySelector(".nav-cta");

    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        const nextState = !isExpanded;

        toggle.setAttribute("aria-expanded", String(nextState));
        navLinks.classList.toggle("open", nextState);
        if (navCta) navCta.classList.toggle("open", nextState);
    });

    // Close mobile menu on link click
    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.tagName === "A") {
            toggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("open");
            if (navCta) navCta.classList.remove("open");
        }
    });
}

// Active link highlighting on scroll
function setupActiveSectionHighlight() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;

        let currentSectionId = "";

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY - headerHeight - 40;

            if (scrollPosition >= offsetTop) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (!href) return;

            if (href === `#${currentSectionId}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
}

// Basic form validation
function setupFormValidation() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const nameInput = /** @type {HTMLInputElement | null} */ (
        document.getElementById("name")
    );
    const emailInput = /** @type {HTMLInputElement | null} */ (
        document.getElementById("email")
    );
    const messageInput = /** @type {HTMLTextAreaElement | null} */ (
        document.getElementById("message")
    );

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const statusElement = document.getElementById("form-status");

    function showError(el, errorEl, message) {
        if (!el || !errorEl) return;
        el.setAttribute("aria-invalid", "true");
        errorEl.textContent = message;
        errorEl.classList.add("visible");
    }

    function clearError(el, errorEl) {
        if (!el || !errorEl) return;
        el.removeAttribute("aria-invalid");
        errorEl.classList.remove("visible");
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (statusElement) {
            statusElement.textContent = "";
            statusElement.classList.remove("success", "error");
        }

        let isValid = true;

        if (!nameInput || !emailInput || !messageInput) return;

        // Name
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, nameError, "Please enter your name.");
        } else {
            clearError(nameInput, nameError);
        }

        // Email
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, emailError, "Please enter a valid email address.");
        } else {
            clearError(emailInput, emailError);
        }

        // Message
        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, messageError, "Please enter a short message.");
        } else {
            clearError(messageInput, messageError);
        }

        if (!isValid) {
            if (statusElement) {
                statusElement.textContent =
                    "Please check the highlighted fields and try again.";
                statusElement.classList.add("error");
            }
            return;
        }

        // Simulate a successful submission
        if (statusElement) {
            statusElement.textContent =
                "Thank you. Your message has been recorded. This demo form does not send emails.";
            statusElement.classList.add("success");
        }

        form.reset();
    });
}

// Scroll reveal animations
function setupScrollReveal() {
    const revealElements = document.querySelectorAll("[data-reveal]");
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
        }
    );

    revealElements.forEach((el) => observer.observe(el));
}

// Footer year
function setCurrentYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupSmoothScrolling();
    setupNavToggle();
    setupActiveSectionHighlight();
    setupFormValidation();
    setupScrollReveal();
    setCurrentYear();
});

