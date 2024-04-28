
const updateRequest = {
  action: "add", // or "remove" or "update"
  eventData: {
    title: "Updated Event Title",
    date: new Date("2024-05-01"),
    location: "Updated Event Location",
    // Add other fields as needed
  },
  highlight: { name: "New Highlight", description: "Description of New Highlight" },
  highlightIdToRemove: "662cd3ce0da9f8e4ede7425d", // Only required for "remove" action
  highlightIdToUpdate: "662cd3ce0da9f8e4ede7425d" // Only required for "update" action
};

let updateOperation;

switch (updateRequest.action) {
  case "add":
    updateOperation = {
      $addToSet: { highlights: updateRequest.highlight },
      $set: updateRequest.eventData
    };
    break;
  case "remove":
    updateOperation = {
      $pull: { highlights: { _id: updateRequest.highlightIdToRemove } },
      $set: updateRequest.eventData
    };
    break;
  case "update":
    updateOperation = {
      $set: {
        "highlights.$[elem].name": updateRequest.highlight.name,
        "highlights.$[elem].description": updateRequest.highlight.description
      },
      $set: updateRequest.eventData // Update event data
    };
    break;
  default:
    // Handle invalid action
}

EventModel.findByIdAndUpdate(eventId, updateOperation, { new: true });
