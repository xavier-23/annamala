/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();

    })();

})(document.documentElement);

/*---grid bg with scroll tail---*/
(function() {
  const grid = document.querySelector('.grid-background') || document.querySelector('.grid');
  if (!grid) return;

  const CELL_SIZE = 50;
  const BASE_RADIUS = 80;      // Normal hover radius
  const SCROLL_TAIL_RADIUS = 160; // Tail size when scrolling
  const SCROLL_MULTIPLIER = 6;

  let cells = [];
  let mouseX = -9999;
  let mouseY = -9999;
  let scrollBoost = 0;
  let lastScrollTop = window.scrollY || 0;
  let lastTime = Date.now();

  function cssColorToRgb(cssColor) {
    const el = document.createElement('div');
    el.style.color = cssColor;
    el.style.display = 'none';
    document.body.appendChild(el);
    const computed = getComputedStyle(el).color;
    document.body.removeChild(el);
    const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) return `${m[1]}, ${m[2]}, ${m[3]}`;
    return '201, 163, 73';
  }
  const ACCENT_RAW = getComputedStyle(document.documentElement).getPropertyValue('--color-1') || '#c9a349';
  const ACCENT_RGB = cssColorToRgb(ACCENT_RAW.trim());

  function createGrid() {
    grid.innerHTML = '';
    const cols = Math.ceil(window.innerWidth / CELL_SIZE);
    const rows = Math.ceil(window.innerHeight / CELL_SIZE);
    const frag = document.createDocumentFragment();
    for (let i = 0; i < cols * rows; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      frag.appendChild(cell);
    }
    grid.appendChild(frag);
    cells = Array.from(grid.querySelectorAll('.grid-cell'));
  }
  createGrid();
  window.addEventListener('resize', createGrid);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('scroll', () => {
    const now = Date.now();
    const dt = Math.max(1, now - lastTime);
    const scrollTop = window.scrollY || 0;
    const ds = Math.abs(scrollTop - lastScrollTop);
    const speed = ds / dt;
    const mapped = Math.min(1, speed * SCROLL_MULTIPLIER);
    scrollBoost = Math.max(scrollBoost, mapped); // boost tail size
    lastScrollTop = scrollTop;
    lastTime = now;
  });

  function updateCells() {
    if (cells.length === 0) return;

    // Gradual decay for scroll boost
    scrollBoost *= 0.9;

    // Dynamic radius based on scroll boost
    const currentRadius = BASE_RADIUS + scrollBoost * (SCROLL_TAIL_RADIUS - BASE_RADIUS);

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const rect = cell.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);

      if (dist < currentRadius) {
        const intensity = 1 - dist / currentRadius;
        const bgAlpha = Math.min(0.22, intensity * 0.18);
        cell.style.background = `rgba(${ACCENT_RGB}, ${bgAlpha})`;
        const blur = Math.max(8, intensity * 28);
        const shadowAlpha = Math.min(0.95, intensity * 0.95);
        cell.style.boxShadow = `0 0 ${blur}px rgba(${ACCENT_RGB}, ${shadowAlpha})`;
        const borderAlpha = Math.min(0.9, intensity * 0.9);
        cell.style.borderColor = `rgba(${ACCENT_RGB}, ${borderAlpha})`;
      } else {
        cell.style.background = 'transparent';
        cell.style.boxShadow = 'none';
        cell.style.borderColor = 'transparent';
      }
    }
  }

  function loop() {
    updateCells();
    requestAnimationFrame(loop);
  }
  loop();
})();



/*--------------------------------------------------------------------*/

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    const typingTime = 5000; //  5s typing
    const pauseAfterTyping = 2000; // pause before split

    setTimeout(() => {
        // Add split panels
        preloader.classList.add('split');

        // Small pause before sliding
        setTimeout(() => {
            preloader.classList.add('animate');
        }, 300);

        // Remove preloader after panels slide away
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2500);

    }, typingTime + pauseAfterTyping);
});


document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("scroll-visible");

                // Special case: Expertise title underline
                if (entry.target.id === "expertise") {
                    const title = entry.target.querySelector(".expertise-title");
                    if (title) title.classList.add("underline");
                }

                obs.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".scroll-hidden").forEach(section => {
        observer.observe(section);
    });
});


/*-----------------------------------------glow follow----------------------------------------*/
let lastScrollTop = 0;
let lastTime = Date.now();
let scrollGlow = 0;



// Mouse hover glow
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    grid.style.setProperty('--mouse-x', `${x}px`);
    grid.style.setProperty('--mouse-y', `${y}px`);
});

// Scroll speed glow
window.addEventListener('scroll', () => {
    const now = Date.now();
    const deltaTime = now - lastTime;
    const scrollTop = window.scrollY;
    const deltaScroll = Math.abs(scrollTop - lastScrollTop);

    // Calculate scroll speed (px/ms)
    const speed = deltaScroll / deltaTime;

    // Map speed to glow strength (cap at 1)
    scrollGlow = Math.min(speed * 5, 1); // adjust multiplier to taste

    // Apply to CSS variable
    grid.style.setProperty('--scroll-glow', scrollGlow);

    lastScrollTop = scrollTop;
    lastTime = now;
});
