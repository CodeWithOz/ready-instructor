## ReadyInstructor
A simple nodejs backend for a hypothetical service that allows education providers (such as academy managers) to create events involving individual educators (such as teachers).

The key objective of this project is to demonstrate proficiency with MongoDB and highlight specific design choices intended to facilitate the hypothetical service. These design choices include:
- putting events in a separate collection from bookings, even though events are associated with specific bookings. This decision allows separation of concerns and enables the system to take advantage of mongodb query and aggregation operations when querying and updating individual bookings and events.
  - For instance, individual events can be canceled without affecting the parent booking.
- using validation constraints to add structured flexibility to the maximum number of educators per event/booking.
- identifying different types of educators and providers to allow more types to be easily added without creating a separate collection.

### Local use
You can run the app locally by:
- cloning the repo
- installing the dependencies
- creating your real `.env` file and specifying the mongodb connection string and port
- executing `pnpm start`

### Endpoints
- GET `/booking/:bookingId`: gets the booking matching the specified ID
- POST `/booking/`: creates a new booking
- GET `/event/:bookingEventId`: gets the event matching the specified ID
- POST `/event/`: creates a new event associated with the specified booking ID
- POST `/event/cancel/:bookingEventId`: marks the specified booking event as canceled