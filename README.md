# BookMyHall

BookMyHall is a MERN-stack web application for booking halls for various events. It provides a seamless experience for users to browse, post, and book venues, with features for both event organizers and venue owners.

## Features

- **User Authentication:** Sign up, log in, and manage your bookings securely.
- **Browse Halls:** View a list of available halls with details, images, and categories (wedding, conference, party, etc.).
- **Book a Hall:** Check availability and book halls for your desired date and time.
- **Post a Hall:** Venue owners can post new halls with descriptions, images, and pricing.
- **My Bookings:** Users can view and manage their current and past bookings.
- **My Postings:** Venue owners can manage their posted halls.
- **Contact Us:** Easy access to contact information and support.
- **Responsive Design:** Works well on desktop and mobile devices.

## Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** Node.js, Express
- **Database:** Firebase (Firestore)
- **Authentication:** Firebase Auth

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hall-booking.git
cd bookmyhall
```

### 2. Install Dependencies

Install dependencies for both client and server:

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Set Up Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Authentication and Firestore Database.
- Download your Firebase config and place it in:
  - `client/src/firebase.js` (for frontend config)
  - `server/firebase-adminsdk.json.json` (for backend admin SDK)
- Update the config files as needed.

### 4. Run the Application

#### Start the Backend
```bash
cd server
npm start
```

#### Start the Frontend
Open a new terminal:
```bash
cd client
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)
- The backend will run on [http://localhost:5000](http://localhost:5000) (or as configured)

## Folder Structure

```
bookmyhall/
  client/    # React frontend
  server/    # Node.js backend
  README.md  # Project documentation
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 