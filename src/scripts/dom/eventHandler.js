('use strict');

const EventHandler = {
  addEvent(element, eventType, handler, captering = false) {
    element.addEventListener(eventType, handler, captering);
  },
};

export default EventHandler;
