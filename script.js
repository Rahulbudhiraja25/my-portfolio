// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  
    // === Dark Mode Toggle ===
    const toggleButton = document.getElementById("toggle-dark");
    const prefersDark = localStorage.getItem("theme") === "dark";
    
    if (prefersDark) {
      document.body.classList.add("dark");
    }
    
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }
  
    // === Smooth Scroll for all anchor links ===
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    // === Contact Form Validation + API Request ===
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const name = contactForm.querySelector("input[name='name']");
        const email = contactForm.querySelector("input[name='email']");
        const message = contactForm.querySelector("textarea[name='message']");
  
        // Form validation
        if (!name.value || !email.value || !message.value) {
          alert("Please fill in all fields.");
          return;
        }
  
        // Show loader while the request is processing
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'block';
  
        // Prepare data to be sent in the API request
        const formData = new FormData(contactForm);
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        };
  
        const emailText = `
          Name: ${data.name}\n
          Email: ${data.email}\n
          Message: ${data.message}
        `;
  
        // Send the data to your backend API
        fetch('https://email-sender-ca1h.onrender.com/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: emailText }),
        })
        .then(response => response.json())
        .then(() => {
          alert('Thank you for contacting us! We will get back to you soon.');
          contactForm.reset();
        })
        .catch(() => {
          alert('Something went wrong. Please try again later.');
        })
        .finally(() => {
          // Hide loader once the request is completed or failed
          if (loader) loader.style.display = 'none';
        });
      });
    }
  
    // === Show Toast Message ===
    function showToast(message) {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #007bff;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
      `;
      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 3000);
    }
  
  });
  
