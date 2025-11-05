/**
 * Notifications Module - Notyf Integration
 * Handles toast notifications with glassmorphic styling
 */

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Initialize Notyf with custom glassmorphic configuration
 */
const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
  dismissible: true,
  ripple: true,
  types: [
    {
      type: 'success',
      background: '#3bf083',
      icon: {
        className: 'fas fa-check-circle',
        tagName: 'i',
        color: 'white',
      },
    },
    {
      type: 'error',
      background: '#ff5c5c',
      icon: {
        className: 'fas fa-times-circle',
        tagName: 'i',
        color: 'white',
      },
    },
    {
      type: 'warning',
      background: '#ffce45',
      icon: {
        className: 'fas fa-exclamation-triangle',
        tagName: 'i',
        color: '#333',
      },
    },
    {
      type: 'info',
      background: '#396df0',
      icon: {
        className: 'fas fa-info-circle',
        tagName: 'i',
        color: 'white',
      },
    },
  ],
});

// Make notyf available globally
window.notyf = notyf;

/**
 * Notification Manager with predefined methods
 */
export const Notify = {
  /**
   * Show success notification
   */
  success(message, duration = 3000) {
    notyf.open({
      type: 'success',
      message: message,
      duration: duration,
    });
  },

  /**
   * Show error notification
   */
  error(message, duration = 4000) {
    notyf.open({
      type: 'error',
      message: message,
      duration: duration,
    });
  },

  /**
   * Show warning notification
   */
  warning(message, duration = 3500) {
    notyf.open({
      type: 'warning',
      message: message,
      duration: duration,
    });
  },

  /**
   * Show info notification
   */
  info(message, duration = 3000) {
    notyf.open({
      type: 'info',
      message: message,
      duration: duration,
    });
  },

  /**
   * Show custom notification
   */
  custom(type, message, duration = 3000) {
    notyf.open({
      type: type,
      message: message,
      duration: duration,
    });
  },

  /**
   * Dismiss all notifications
   */
  dismissAll() {
    notyf.dismissAll();
  },
};

/**
 * Common notification messages
 */
export const NotifyMessages = {
  // Success messages
  saveSuccess: 'Changes saved successfully!',
  deleteSuccess: 'Item deleted successfully!',
  createSuccess: 'Item created successfully!',
  updateSuccess: 'Item updated successfully!',
  uploadSuccess: 'File uploaded successfully!',
  copySuccess: 'Copied to clipboard!',

  // Error messages
  saveError: 'Failed to save changes. Please try again.',
  deleteError: 'Failed to delete item. Please try again.',
  createError: 'Failed to create item. Please try again.',
  updateError: 'Failed to update item. Please try again.',
  uploadError: 'Failed to upload file. Please try again.',
  networkError: 'Network error. Please check your connection.',
  validationError: 'Please fill in all required fields correctly.',

  // Warning messages
  unsavedChanges: 'You have unsaved changes!',
  confirmDelete: 'Are you sure you want to delete this item?',
  limitReached: 'You have reached the limit.',

  // Info messages
  processing: 'Processing your request...',
  loading: 'Loading...',
  noResults: 'No results found.',
};

/**
 * Show notification with auto-dismiss after action
 */
export function notifyWithAction(message, action, actionText = 'Undo', duration = 5000) {
  const notification = notyf.open({
    type: 'success',
    message: `${message} <button class="notyf-action">${actionText}</button>`,
    duration: duration,
  });

  // Handle action button click
  setTimeout(() => {
    const actionBtn = document.querySelector('.notyf-action');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        action();
        notyf.dismiss(notification);
      });
    }
  }, 100);
}

/**
 * Show loading notification
 */
export function showLoading(message = 'Loading...') {
  return notyf.open({
    type: 'info',
    message: `<div class="spinner"></div> ${message}`,
    duration: 0,
    dismissible: false,
  });
}

/**
 * Hide loading notification
 */
export function hideLoading(notification) {
  notyf.dismiss(notification);
}

export default Notify;
