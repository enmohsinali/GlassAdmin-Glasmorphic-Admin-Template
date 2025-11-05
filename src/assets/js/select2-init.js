/**
 * Select2 Module - Enhanced Dropdowns
 * Handles Select2 initialization with glassmorphic styling
 */

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';

/**
 * Default Select2 configuration for GlassAdmin
 */
export const select2DefaultConfig = {
  theme: 'glass',
  width: '100%',
  minimumResultsForSearch: 5,
  dropdownAutoWidth: true,
};

/**
 * Initialize Select2 on element(s)
 */
export function initSelect2(selector, customConfig = {}) {
  const config = {
    ...select2DefaultConfig,
    ...customConfig,
  };

  $(selector).select2(config);

  // Apply glassmorphic styling
  applyGlassmorphicStyling();

  return $(selector);
}

/**
 * Initialize Select2 with search
 */
export function initSelect2WithSearch(selector, customConfig = {}) {
  const config = {
    ...select2DefaultConfig,
    minimumResultsForSearch: 0, // Always show search
    ...customConfig,
  };

  return initSelect2(selector, config);
}

/**
 * Initialize Select2 with AJAX
 */
export function initSelect2WithAjax(selector, ajaxConfig, customConfig = {}) {
  const config = {
    ...select2DefaultConfig,
    ajax: {
      delay: 250,
      processResults: function(data) {
        return {
          results: data,
        };
      },
      ...ajaxConfig,
    },
    ...customConfig,
  };

  return initSelect2(selector, config);
}

/**
 * Initialize Select2 with tags (multi-select with custom values)
 */
export function initSelect2WithTags(selector, customConfig = {}) {
  const config = {
    ...select2DefaultConfig,
    tags: true,
    tokenSeparators: [',', ' '],
    ...customConfig,
  };

  return initSelect2(selector, config);
}

/**
 * Apply glassmorphic styling to Select2 dropdowns
 */
function applyGlassmorphicStyling() {
  // Apply styling when dropdown opens
  $(document).on('select2:open', () => {
    setTimeout(() => {
      const $dropdown = $('.select2-dropdown');
      const $search = $('.select2-search__field');
      const $results = $('.select2-results');

      // Add glassmorphic classes
      $dropdown.addClass('glass-panel border border-glass-dark-border');
      $search.addClass('input search-input');
      $results.addClass('scrollbar-thin');

      // Style result items
      $('.select2-results__option').each(function() {
        $(this).addClass('menu-item');
      });
    }, 0);
  });
}

/**
 * Get selected values
 */
export function getSelect2Value(selector) {
  return $(selector).val();
}

/**
 * Set selected values
 */
export function setSelect2Value(selector, value) {
  $(selector).val(value).trigger('change');
}

/**
 * Clear selection
 */
export function clearSelect2(selector) {
  $(selector).val(null).trigger('change');
}

/**
 * Destroy Select2 instance
 */
export function destroySelect2(selector) {
  if ($(selector).hasClass('select2-hidden-accessible')) {
    $(selector).select2('destroy');
  }
}

/**
 * Sample data for testing
 */
export const sampleSelectData = [
  { id: 1, text: 'Option 1' },
  { id: 2, text: 'Option 2' },
  { id: 3, text: 'Option 3' },
  { id: 4, text: 'Option 4' },
  { id: 5, text: 'Option 5' },
];

// Export jQuery for Select2
export { $ };
