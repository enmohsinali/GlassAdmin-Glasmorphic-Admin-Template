/**
 * DataTables Module - Table Enhancement
 * Handles DataTables initialization with glassmorphic styling
 */

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-responsive';

/**
 * Default DataTables configuration for GlassAdmin
 */
export const dataTablesDefaultConfig = {
  responsive: true,
  pageLength: 10,
  lengthMenu: [[5, 10, 25, 50, 100], [5, 10, 25, 50, 100]],
  language: {
    search: '_INPUT_',
    searchPlaceholder: 'Search...',
    lengthMenu: 'Show _MENU_ entries',
    info: 'Showing _START_ to _END_ of _TOTAL_ entries',
    infoEmpty: 'No entries available',
    infoFiltered: '(filtered from _TOTAL_ total entries)',
    paginate: {
      first: '«',
      last: '»',
      next: '›',
      previous: '‹',
    },
    emptyTable: 'No data available in table',
  },
  dom: '<"datatable-header"<"row"<"col-sm-6"l><"col-sm-6"f>>>t<"datatable-footer"<"row"<"col-sm-6"i><"col-sm-6"p>>>',
};

/**
 * Initialize DataTable with custom configuration
 */
export function initDataTable(selector, customConfig = {}) {
  const config = {
    ...dataTablesDefaultConfig,
    ...customConfig,
  };

  const table = $(selector).DataTable(config);

  // Apply custom styling
  applyGlassmorpicStyling(selector);

  return table;
}

/**
 * Initialize DataTable with export buttons
 */
export function initDataTableWithExport(selector, customConfig = {}) {
  const config = {
    ...dataTablesDefaultConfig,
    buttons: [
      {
        extend: 'copy',
        text: '<i class="fas fa-copy"></i> Copy',
        className: 'btn btn-sm btn-primary',
      },
      {
        extend: 'csv',
        text: '<i class="fas fa-file-csv"></i> CSV',
        className: 'btn btn-sm btn-primary',
      },
      {
        extend: 'excel',
        text: '<i class="fas fa-file-excel"></i> Excel',
        className: 'btn btn-sm btn-primary',
      },
      {
        extend: 'pdf',
        text: '<i class="fas fa-file-pdf"></i> PDF',
        className: 'btn btn-sm btn-primary',
      },
      {
        extend: 'print',
        text: '<i class="fas fa-print"></i> Print',
        className: 'btn btn-sm btn-primary',
      },
    ],
    dom: '<"datatable-header"<"row"<"col-sm-6"l><"col-sm-6"f>>>B<"clear">t<"datatable-footer"<"row"<"col-sm-6"i><"col-sm-6"p>>>',
    ...customConfig,
  };

  const table = $(selector).DataTable(config);

  // Apply custom styling
  applyGlassmorpicStyling(selector);

  return table;
}

/**
 * Apply glassmorphic styling to DataTables
 */
function applyGlassmorpicStyling(selector) {
  const $wrapper = $(selector).closest('.dataTables_wrapper');

  // Style the wrapper
  $wrapper.addClass('glass-datatable');

  // Style search input
  $wrapper.find('.dataTables_filter input').addClass('input search-input');

  // Style length select
  $wrapper.find('.dataTables_length select').addClass('input');

  // Style pagination
  $wrapper.find('.dataTables_paginate').addClass('pagination-glass');

  // Add glass effect to info text
  $wrapper.find('.dataTables_info').addClass('text-text-dark-secondary');
}

/**
 * Refresh table data
 */
export function refreshTable(tableInstance) {
  tableInstance.ajax.reload(null, false);
}

/**
 * Clear table filters
 */
export function clearTableFilters(tableInstance) {
  tableInstance.search('').columns().search('').draw();
}

/**
 * Export table data
 */
export function exportTableData(tableInstance, format = 'csv') {
  const button = tableInstance.buttons(`.buttons-${format}`);
  if (button.length) {
    button.trigger();
  }
}

// Export jQuery for DataTables
export { $ };
