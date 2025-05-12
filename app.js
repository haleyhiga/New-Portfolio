document.addEventListener("DOMContentLoaded", function () {
    
    const text = "Hi, I'm Haley"; // text section
    const speed = 100; // typing speed
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
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

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    speed: 1000, 
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.mouse-trail');
    const dot = document.createElement('div');
    dot.classList.add('trail-dot');
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    trail.appendChild(dot);
  
    setTimeout(() => {
      dot.remove();
    }, 600); 
  });