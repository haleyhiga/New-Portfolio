document.addEventListener("DOMContentLoaded", function () {
    
    const text = "Hi, I'm Haley"; // The text you want to display
    const speed = 100; // Typing speed in milliseconds
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter(); // Start the typing animation
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".about-section, .projects-section, .contact-section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    function setActiveLink() {
      let index = sections.length;
  
      while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
  
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLinks[index]) {
        navLinks[index].classList.add("active");
      }
    }
  
    setActiveLink();
    window.addEventListener("scroll", setActiveLink);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('.fade-in');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
  
    faders.forEach(fader => {
      observer.observe(fader);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".header-section").classList.add("visible");
  });