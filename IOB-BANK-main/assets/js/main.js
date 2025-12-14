
(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Adding fade-in and fade-out effects using CSS transitions
  document.addEventListener('DOMContentLoaded', function () {
    const nav_bar = document.querySelector('header');
    nav_bar.style.transition = 'opacity 0.5s ease-in-out'; // Adjust timing as needed
  });

  /**
   * Mobile nav toggle
   */
 

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function (swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

$(window).scroll(function(){
  var sticky = $('.header'),
      scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});


// By default, set the first box as active
$('.iconbox').first().addClass('active');

// Add event listener for hover (mouseenter)
$('.iconbox').mouseenter(function() {
  $('.iconbox').removeClass('active');
  $(this).addClass('active');
});

// No action needed on mouseleave, as the current iconbox remains active
$('.iconbox').mouseleave(function() {
  // Do nothing here, keep the current box active
});

 
    
  function toggleFooter() {
    const panel = document.getElementById('footerPanel');
    const icon = document.getElementById('toggleIcon');
    panel.classList.toggle('show');
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');
  } function toggleUsefulLinks() {
    const panel = document.getElementById('usefulLinksPanel');
    panel.classList.toggle('show');
  } 
   


   const tabButtons = document.querySelectorAll('.searchDiv .tab-btn');
    const tabContents = document.querySelectorAll('.searchDiv .tab-content-section');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active classes
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));

        // Activate clicked
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
      });
    });


 $(document).ready(function () {
  $(".form-click").on("click", function () {
    $(".searchDiv").slideDown("fast"); // Show
  });

  $(".close-search").on("click", function () {
    $(".searchDiv").slideUp("fast"); // Hide
  });
});

$('.form-click button').on('click', function () {
  $(this).prop('disabled', true);
});


$('.footerCollaps').slideUp(0); // Initially hide the footer
function toggleFooter() {
  const $footer = $('.footerCollaps');
  const $icon = $('#toggleIcon');

  $footer.slideToggle(300, function () {
    if ($footer.is(':visible')) {
      $icon.removeClass('fa-plus').addClass('fa-minus');
    } else {
      $icon.removeClass('fa-minus').addClass('fa-plus');
    }
  });
}
