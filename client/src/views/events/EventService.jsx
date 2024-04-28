// EventService.js
const EventService = {
    bookedEvents: [],
    bookEvent: function(event) {
      this.bookedEvents.push(event);
    },
    cancelEvent: function(index) {
      this.bookedEvents.splice(index, 1);
    }
  };
  
  export default EventService;
  