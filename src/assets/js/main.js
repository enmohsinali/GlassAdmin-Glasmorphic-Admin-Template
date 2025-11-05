/**
 * GlassAdmin - Main JavaScript Module
 * Handles core functionality, theme switching, and UI interactions
 */

import $ from 'jquery';

// Make jQuery available globally for plugins
window.$ = window.jQuery = $;

/**
 * Theme Manager
 * Handles light/dark/glass mode switching with smooth transitions
 */
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  bindEvents() {
    $('.theme-toggle, .dark-light').on('click', (e) => {
      e.preventDefault();
      this.toggleTheme();
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme) {
    const $body = $('body');

    if (theme === 'light') {
      $body.addClass('light-mode').removeClass('dark-mode');
      this.updateLightModeStyles();
    } else {
      $body.addClass('dark-mode').removeClass('light-mode');
      this.updateDarkModeStyles();
    }

    // Trigger custom event for other components
    $(document).trigger('themeChanged', [theme]);
  }

  updateLightModeStyles() {
    // Update theme toggle icon
    $('.theme-toggle svg, .dark-light svg').each(function() {
      $(this).removeClass('fill-[#ffce45] stroke-[#ffce45]');
      $(this).addClass('fill-transparent stroke-[#3c3a3a]');
    });
  }

  updateDarkModeStyles() {
    // Update theme toggle icon
    $('.theme-toggle svg, .dark-light svg').each(function() {
      $(this).removeClass('fill-transparent stroke-[#3c3a3a]');
      $(this).addClass('fill-[#ffce45] stroke-[#ffce45]');
    });
  }
}

/**
 * Navigation Manager
 * Handles active states and navigation interactions
 */
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindMenuLinks();
    this.bindSearchBar();
    this.bindMobileMenu();
  }

  bindMenuLinks() {
    // Sidebar menu links
    $('.menu-item, .menu-link').on('click', function(e) {
      if (!$(this).attr('href') || $(this).attr('href') === '#') {
        e.preventDefault();
      }

      // Remove active class from siblings
      $(this).siblings().removeClass('active is-active');

      // Add active class to clicked item
      $(this).addClass('active is-active');
    });

    // Header menu links
    $('.nav-link, .main-header-link').on('click', function(e) {
      if (!$(this).attr('href') || $(this).attr('href') === '#') {
        e.preventDefault();
      }

      $('.nav-link, .main-header-link').removeClass('active is-active');
      $(this).addClass('active is-active');
    });
  }

  bindSearchBar() {
    $('.search-bar input, .search-input')
      .on('focus', function() {
        $('.header').addClass('search-active');
        $('.search-bar').addClass('expanded');
      })
      .on('blur', function() {
        if (!$(this).val()) {
          $('.header').removeClass('search-active');
          $('.search-bar').removeClass('expanded');
        }
      });
  }

  bindMobileMenu() {
    $('.mobile-menu-toggle').on('click', function() {
      $('.left-side, .sidebar').toggleClass('mobile-open');
      $('body').toggleClass('menu-open');
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.left-side, .sidebar, .mobile-menu-toggle').length) {
        $('.left-side, .sidebar').removeClass('mobile-open');
        $('body').removeClass('menu-open');
      }
    });
  }
}

/**
 * Modal Manager
 * Handles modal/popup interactions
 */
class ModalManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindModalTriggers();
    this.bindModalClose();
  }

  bindModalTriggers() {
    $('[data-modal]').on('click', function(e) {
      e.preventDefault();
      const modalId = $(this).data('modal');
      ModalManager.open(modalId);
    });
  }

  bindModalClose() {
    $('.modal-close, .close, [data-modal-close]').on('click', function(e) {
      e.preventDefault();
      ModalManager.closeAll();
    });

    $('.modal-overlay, .overlay-app').on('click', function(e) {
      if (e.target === this) {
        ModalManager.closeAll();
      }
    });

    // Close on ESC key
    $(document).on('keydown', function(e) {
      if (e.key === 'Escape') {
        ModalManager.closeAll();
      }
    });
  }

  static open(modalId) {
    const $modal = $(`#${modalId}, .${modalId}`);
    const $overlay = $('.modal-overlay, .overlay-app');

    $overlay.removeClass('invisible opacity-0').addClass('visible opacity-100');
    $modal.removeClass('invisible opacity-0').addClass('visible opacity-100');
    $('body').addClass('overflow-hidden');
  }

  static closeAll() {
    $('.modal-overlay, .overlay-app, .modal, .pop-up')
      .removeClass('visible opacity-100')
      .addClass('invisible opacity-0');
    $('body').removeClass('overflow-hidden');
  }
}

/**
 * Dropdown Manager
 * Handles dropdown menus
 */
class DropdownManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindDropdownTriggers();
    this.closeOnOutsideClick();
  }

  bindDropdownTriggers() {
    $('[data-dropdown-toggle]').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const dropdownId = $(this).data('dropdown-toggle');
      const $dropdown = $(`#${dropdownId}`);

      // Close other dropdowns
      $('.dropdown-menu').not($dropdown).removeClass('show');

      // Toggle current dropdown
      $dropdown.toggleClass('show');
    });
  }

  closeOnOutsideClick() {
    $(document).on('click', function(e) {
      if (!$(e.target).closest('[data-dropdown-toggle], .dropdown-menu').length) {
        $('.dropdown-menu').removeClass('show');
      }
    });
  }
}

/**
 * Tooltip Manager
 * Handles tooltip display
 */
class TooltipManager {
  constructor() {
    this.init();
  }

  init() {
    $('[data-tooltip]').each(function() {
      const tooltip = $(this).data('tooltip');
      const position = $(this).data('tooltip-position') || 'top';

      $(this).attr('title', tooltip);
      $(this).addClass('has-tooltip');
    });
  }
}

/**
 * Notification Manager
 * Handles toast notifications (using Notyf when available)
 */
class NotificationManager {
  static success(message, duration = 3000) {
    if (window.notyf) {
      window.notyf.success(message);
    } else {
      console.log('✓ Success:', message);
    }
  }

  static error(message, duration = 3000) {
    if (window.notyf) {
      window.notyf.error(message);
    } else {
      console.error('✗ Error:', message);
    }
  }

  static info(message, duration = 3000) {
    if (window.notyf) {
      window.notyf.open({
        type: 'info',
        message: message,
        duration: duration,
      });
    } else {
      console.info('ℹ Info:', message);
    }
  }
}

/**
 * Form Validation Helper
 */
class FormValidator {
  static validate(formSelector) {
    const $form = $(formSelector);
    let isValid = true;

    $form.find('[required]').each(function() {
      const $field = $(this);
      const value = $field.val().trim();

      if (!value) {
        FormValidator.showError($field, 'This field is required');
        isValid = false;
      } else {
        FormValidator.clearError($field);
      }
    });

    return isValid;
  }

  static showError($field, message) {
    $field.addClass('border-danger');

    let $error = $field.siblings('.error-message');
    if (!$error.length) {
      $error = $('<span class="error-message text-danger text-xs mt-1"></span>');
      $field.after($error);
    }
    $error.text(message);
  }

  static clearError($field) {
    $field.removeClass('border-danger');
    $field.siblings('.error-message').remove();
  }
}

/**
 * Utility Functions
 */
const Utils = {
  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Format currency
   */
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  /**
   * Format date
   */
  formatDate(date, format = 'short') {
    const options = format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  },

  /**
   * Copy to clipboard
   */
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        NotificationManager.success('Copied to clipboard!');
      });
    } else {
      // Fallback for older browsers
      const $temp = $('<textarea>');
      $('body').append($temp);
      $temp.val(text).select();
      document.execCommand('copy');
      $temp.remove();
      NotificationManager.success('Copied to clipboard!');
    }
  },
};

/**
 * Initialize App
 */
class GlassAdmin {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM ready
    $(document).ready(() => {
      console.log('🚀 GlassAdmin Template Initialized');

      // Initialize all managers
      this.themeManager = new ThemeManager();
      this.navigationManager = new NavigationManager();
      this.modalManager = new ModalManager();
      this.dropdownManager = new DropdownManager();
      this.tooltipManager = new TooltipManager();

      // Initialize update popup from existing HTML
      this.initUpdatePopup();

      // Smooth scroll for anchor links
      this.initSmoothScroll();

      // Add animation on scroll
      this.initScrollAnimations();

      // Log environment info
      this.logInfo();
    });
  }

  initUpdatePopup() {
    // Open popup on update button click
    $('.status-button:not(.open)').on('click', function(e) {
      e.preventDefault();
      $('.overlay-app').removeClass('invisible opacity-0').addClass('visible opacity-100');
      $('.pop-up').removeClass('invisible opacity-0').addClass('visible opacity-100');
    });
  }

  initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
      const href = $(this).attr('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = $(href);
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 80
          }, 500);
        }
      }
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    $('.animate-on-scroll').each(function() {
      observer.observe(this);
    });
  }

  logInfo() {
    console.log('%c GlassAdmin v1.0 ', 'background: linear-gradient(135deg, #cf4af3, #e73bd7); color: white; font-size: 14px; padding: 5px 10px; border-radius: 5px;');
    console.log('Theme:', this.themeManager.currentTheme);
    console.log('jQuery:', $.fn.jquery);
  }
}

// Initialize the app
const app = new GlassAdmin();

// Export for use in other modules
export {
  ThemeManager,
  NavigationManager,
  ModalManager,
  DropdownManager,
  NotificationManager,
  FormValidator,
  Utils,
  app as default
};
