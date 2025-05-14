const { createApp, ref, computed, watch, nextTick, onMounted } = Vue;

document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect
  const text = "Hi, I'm Haley";
  const speed = 100;
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typewriter").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  // Navigation active link
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

  // Fade-in animations
  document.querySelector(".header-section").classList.add("visible");

  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  faders.forEach(fader => observer.observe(fader));

  // Mouse trail effect
  document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.mouse-trail');
    const dot = document.createElement('div');
    dot.classList.add('trail-dot');
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    trail.appendChild(dot);
    setTimeout(() => { dot.remove(); }, 600);
  });
});

// Vue application
const app = createApp({
  setup() {
    const tab = ref('education');
    const selectedCategory = ref('All');
    const swiperInstance = ref(null);

    const aboutData = {
      education: {
        image: 'haley.png',
        text: "Hi! I'm Haley, thanks for checking out my portfolio!"
      },
      personal: {
        image: 'haley_hobby.jpeg',
        text: "I was born and raised on Oahu, Hawaii.  Outside of tech, I love surfing, snowboarding, fishing, hiking, and the beach.  During my free time, you could also catch me at the pickleball courts playing with friends and family.  I also enjoy spending time with my dog, Kai.  My favorite food to eat would have to be either sushi or pizza."
      }
    };

    const skills = ['Python', 'Javascript', 'C++', 'SQL', 'Data Science'];
    const hobbies = ['Surfing', 'Snowboarding', 'Fishing', 'Hiking', 'Beach'];

    // Project data
    const allProjects = ref([

      {
        title: " 3D Chess Animations",
        image: "chess.png",
        description: "3D chess animation using WebGL. Features textures, transformations, and animates chess pieces using matrix transformations and interpolation.",
        link: "https://github.com/haleyhiga/Chess-Animations",
        category: "WebGL"
      },
      {
        title: "AI Doghouse Pathfinder",
        image: "ai-pathfinder.png",
        description: "Utilizes A* Search Algorithm and Python Gymnasium",
        link: "https://github.com/haleyhiga/AI-Doghouse-Pathfinder",
        category: "AI / ML"
      },
      {
        title: "Interactive Rat Maze",
        image: "mazerat.png",
        description: "A WebGL-powered maze simulation where a virtual rat navigates procedurally generated mazes using interactive 3D graphics and custom shaders.",
        link: "https://github.com/haleyhiga/Maze-Rat",
        category: "WebGL"
      },
      {
        title: "Bouncing Circles PWA",
        image: "bouncingcircles.png",
        description: "WebGL simulation of bouncing circles that interact with gravity, collisions, and screen boundaries. Uses real-time physics and vector math to simulate motion and elastic collisions.",
        link: "https://github.com/haleyhiga/BouncingCirclesPWA",
        category: "WebGL"
      },
      {
        title: "Mock Pet Store Database",
        image: "petstore.png",
        description: "A command-line Python application for managing a mock pet store's operations, including inventory, services, adoptions, and customer scheduling using an SQLite database.",
        link: "https://github.com/haleyhiga/Mock-Pet-Store",
        category: "Databases"
      },
      {
        title: "Shark Attack Prediction",
        image: "shark.jpg",
        description: "Classifies the likelihood of a shark attack based on age, sex, activity, species, and type using a Random Forest Classifier.",
        link: "https://github.com/haleyhiga/Shark-Attack-Prediction",
        category: "AI / ML"
      },
      {
        title: "Heart Attack Prediction",
        image: "neural-network.jpg",
        description: "TensorFlow, Keras, Health Data Analysis",
        link: "https://github.com/haleyhiga/Heart-Failure-Prediction-Neural-Network",
        category: "AI / ML"
      },

      {
        title: "Simulated Social Network",
        image: "social-network.jpg",
        description: "A Python-based social network database system using SQLite that supports user management, posting, account interactions, and moderation features via command-line scripts and helper modules.",
        link: "https://github.com/haleyhiga/Social-Network-Database",
        category: "Databases"
      },
      {
        title: "Planner",
        image: "planner.png",
        description: "A full-stack web application for managing personal homework and schedules, featuring a Python (Flask) backend with SQLite database integration and a responsive HTML/CSS/JavaScript frontend.",
        link: "https://github.com/haleyhiga/Planner-Web-App",
        category: "Databases"
      },
      {
        title: "High School Athletics Web App",
        image: "mhs.png",
        description: "A full-featured athletics web application for my old high school that includes event schedules, merchandise storefront, and admin management, built with a responsive HTML/CSS/JavaScript frontend and dynamic backend integration.",
        link: "https://github.com/haleyhiga/Mililani-High-School-Athletics-Web-App",
        category: "Databases"
      }

    ]);

    // Function to check if a project should be visible based on current category
    const isProjectVisible = (project) => {
      return selectedCategory.value === 'All' || project.category === selectedCategory.value;
    };

    // Initialize Swiper once
    const initSwiper = () => {
      console.log('Initializing swiper...');
      
      nextTick(() => {
        try {
          const swiperContainer = document.querySelector('.swiper');
          if (!swiperContainer) {
            console.error('Swiper container not found');
            return;
          }

          if (typeof Swiper === 'undefined') {
            console.error('Swiper constructor not found');
            return;
          }

          // Only initialize if not already initialized
          if (!swiperInstance.value) {
            setTimeout(() => {
              try {
                swiperInstance.value = new Swiper('.swiper', {
                  slidesPerView: 1,
                  spaceBetween: 40,
                  speed: 1000,
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  breakpoints: {
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 40
                    }
                  },
                  on: {
                    init: function () {
                      console.log('Swiper initialized successfully');
                    }
                  }
                });
              } catch (error) {
                console.error('Error creating Swiper:', error);
              }
            }, 300);
          } else {
            // If already initialized, just update
            setTimeout(() => {
              if (swiperInstance.value && swiperInstance.value.update) {
                swiperInstance.value.update();
                console.log('Swiper updated');
              }
            }, 100);
          }
        } catch (error) {
          console.error('Error in Swiper setup:', error);
        }
      });
    };

    // Switch category without destroying Swiper (didn't work when I tried destroying)
    const changeCategory = (newCategory) => {
      if (selectedCategory.value === newCategory) {
        return; // Skip if selecting the same category
      }
      
      console.log(`Changing category from ${selectedCategory.value} to ${newCategory}`);
      selectedCategory.value = newCategory;
      
      // Add a slight delay before updating the swiper
      setTimeout(() => {
        if (swiperInstance.value && swiperInstance.value.update) {
          swiperInstance.value.update();
          console.log('Swiper updated after category change');
        }
      }, 100);
    };

    // Initialize Swiper on component mount
    onMounted(() => {
      console.log('Component mounted');
      setTimeout(initSwiper, 500);
    });

    return {
      tab,
      aboutData,
      skills,
      hobbies,
      allProjects,
      selectedCategory,
      isProjectVisible, 
      changeCategory
    };
  }
});

app.mount('#app');