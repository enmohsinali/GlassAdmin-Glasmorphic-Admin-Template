/**
 * Calendar Module - FullCalendar Integration
 * Handles calendar initialization with glassmorphic styling
 */

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

/**
 * Default FullCalendar configuration for GlassAdmin
 */
export const calendarDefaultConfig = {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  },
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  themeSystem: 'standard',
  // Glassmorphic styling
  eventClassNames: 'glass-event',
  eventColor: '#3a6df0',
  eventTextColor: '#ffffff',
  eventBorderColor: 'rgba(113, 119, 144, 0.25)',
  height: 'auto',
  contentHeight: 'auto',
};

/**
 * Initialize Calendar
 */
export function initCalendar(elementId, customConfig = {}) {
  const calendarEl = document.getElementById(elementId);

  if (!calendarEl) {
    console.error(`Calendar element #${elementId} not found`);
    return null;
  }

  const config = {
    ...calendarDefaultConfig,
    ...customConfig,
  };

  const calendar = new Calendar(calendarEl, config);
  calendar.render();

  // Apply glassmorphic styling
  applyGlassmorphicStyling(calendarEl);

  return calendar;
}

/**
 * Apply glassmorphic styling to calendar
 */
function applyGlassmorphicStyling(calendarEl) {
  // Add custom classes to calendar elements
  setTimeout(() => {
    const toolbar = calendarEl.querySelector('.fc-toolbar');
    const header = calendarEl.querySelector('.fc-header-toolbar');

    if (toolbar) {
      toolbar.classList.add('glass-panel', 'p-4', 'mb-4');
    }

    if (header) {
      header.classList.add('glass-panel', 'p-4', 'mb-4');
    }

    // Style buttons
    const buttons = calendarEl.querySelectorAll('.fc-button');
    buttons.forEach(btn => {
      btn.classList.add('btn', 'btn-sm', 'btn-primary');
    });

    // Style event elements
    const events = calendarEl.querySelectorAll('.fc-event');
    events.forEach(event => {
      event.classList.add('glass-event');
    });
  }, 100);
}

/**
 * Sample events data
 */
export const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date().toISOString().split('T')[0] + 'T10:00:00',
    end: new Date().toISOString().split('T')[0] + 'T11:00:00',
    backgroundColor: '#3a6df0',
    borderColor: '#2563eb',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    backgroundColor: '#ff5c5c',
    borderColor: '#f03a3a',
    allDay: true,
  },
  {
    id: '3',
    title: 'Client Call',
    start: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0] + 'T14:00:00',
    end: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0] + 'T15:30:00',
    backgroundColor: '#3bf083',
    borderColor: '#2bc96a',
  },
  {
    id: '4',
    title: 'Workshop',
    start: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T09:00:00',
    end: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T17:00:00',
    backgroundColor: '#ffce45',
    borderColor: '#f8b827',
  },
];

/**
 * Add event to calendar
 */
export function addEvent(calendar, eventData) {
  if (calendar) {
    calendar.addEvent(eventData);
  }
}

/**
 * Remove event from calendar
 */
export function removeEvent(calendar, eventId) {
  if (calendar) {
    const event = calendar.getEventById(eventId);
    if (event) {
      event.remove();
    }
  }
}

/**
 * Update event in calendar
 */
export function updateEvent(calendar, eventId, updates) {
  if (calendar) {
    const event = calendar.getEventById(eventId);
    if (event) {
      event.setProp('title', updates.title || event.title);
      event.setStart(updates.start || event.start);
      event.setEnd(updates.end || event.end);
      event.setExtendedProp('backgroundColor', updates.backgroundColor || event.backgroundColor);
    }
  }
}

/**
 * Get all events from calendar
 */
export function getAllEvents(calendar) {
  if (calendar) {
    return calendar.getEvents();
  }
  return [];
}

export { Calendar };
