# BookMyHall - Complete Setup Guide

BookMyHall is a MERN-stack web application for booking halls for various events. It provides a seamless experience for users to browse, post, and book venues, with features for both event organizers and venue owners.

## Features

- **User Authentication:** Sign up, log in, and manage your bookings securely using Firebase Auth
- **Browse Halls:** View a list of available halls with details, images, and categories (wedding, conference, party, etc.)
- **Book a Hall:** Check availability and book halls for your desired date and time
- **Post a Hall:** Venue owners can post new halls with descriptions, images, and pricing
- **My Bookings:** Users can view and manage their current and past bookings
- **My Postings:** Venue owners can manage their posted halls
- **Contact Us:** Easy access to contact information and support
- **Responsive Design:** Works well on desktop and mobile devices
- **Image Upload:** Cloudinary integration for storing hall images

## Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** Firebase Auth
- **Image Storage:** Cloudinary
- **Deployment:** Railway (Backend), Vercel (Frontend)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git
- MongoDB Atlas account (free tier available)
- Firebase account
- Cloudinary account

## Complete Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Book-my-hall.git
cd book-my-hall
```

### 2. Install Dependencies

Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `hall-booking-client` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" authentication
3. Click "Save"

#### Step 3: Create Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (for development)
3. Select a location close to your users
4. Click "Done"

#### Step 4: Get Firebase Web Config
1. Go to Project Settings (gear icon) → "General"
2. Scroll down to "Your apps" section
3. Click "Add app" → "Web" (</>)
4. Register app with name: "BookMyHall Web"
5. Copy the firebaseConfig object

#### Step 5: Update Frontend Firebase Config
Replace the config in `client/src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

#### Step 6: Get Firebase Admin SDK
1. Go to Project Settings → "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Rename it to `firebase-adminsdk.json` and place it in the `server/` folder

### 4. MongoDB Setup

#### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

#### Step 2: Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider and region
4. Click "Create"

#### Step 3: Set Up Database Access
1. Go to "Database Access" → "Add New Database User"
2. Username: `bookmyhall-user`
3. Password: Generate a secure password
4. Role: "Read and write to any database"
5. Click "Add User"

#### Step 4: Set Up Network Access
1. Go to "Network Access" → "Add IP Address"
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

#### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `bookmyhall`

### 5. Cloudinary Setup

#### Step 1: Create Cloudinary Account
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

#### Step 2: Get Cloudinary Credentials
1. Go to Dashboard
2. Copy your Cloud Name, API Key, and API Secret
3. Note: You'll only need the Cloud Name for unsigned uploads

#### Step 3: Create Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set preset name: `unsigned_preset`
5. Set signing mode: "Unsigned"
6. Click "Save"

### 6. Environment Configuration

#### Step 1: Create Server Environment File
Create `server/.env` file:

```env
# Firebase Admin SDK Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com

# MongoDB Connection String
MONGO_URL=mongodb+srv://bookmyhall-user:your-password@cluster0.xxxxx.mongodb.net/bookmyhall?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server Port
PORT=5000
```

#### Step 2: Update Cloudinary Configuration
Update the Cloudinary URLs in your frontend files:

**In `client/src/pages/PostHall.jsx`:**
```javascript
// Replace these values
formData.append("upload_preset", "unsigned_preset"); // Your preset name
"https://api.cloudinary.com/v1_1/your-cloud-name/image/upload" // Your cloud name
```

**In `client/src/pages/MyPostings.jsx`:**
```javascript
// Replace these values
formData.append("upload_preset", "unsigned_preset"); // Your preset name
"https://api.cloudinary.com/v1_1/your-cloud-name/image/upload" // Your cloud name
```

### 7. Update Firebase Admin SDK Configuration

#### Step 1: Update Server Firebase Config
Update `server/middleware/firebaseAuth.js`:

```javascript
const admin = require('firebase-admin');

// Use environment variables instead of JSON file
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
```

### 8. Run the Application

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

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

### 9. Testing the Setup

1. **Test Authentication:**
   - Go to [http://localhost:3000](http://localhost:3000)
   - Try signing up with a new account
   - Verify you can log in

2. **Test Image Upload:**
   - Log in as an owner
   - Go to "Post a Hall"
   - Try uploading an image
   - Verify the image appears in Cloudinary dashboard

3. **Test Database:**
   - Create a hall posting
   - Verify it appears in MongoDB Atlas dashboard

## Deployment

### Backend Deployment (Railway)

1. **Create Railway Account:**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Deploy Backend:**
   - Connect your GitHub repository
   - Select the `server` folder
   - Add environment variables from your `.env` file
   - Deploy

3. **Get Backend URL:**
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment (Vercel)

1. **Create Vercel Account:**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Deploy Frontend:**
   - Import your GitHub repository
   - Set root directory to `client`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`
   - Deploy

3. **Update API URL:**
   - Update `client/src/config.js` with your Railway backend URL

## Troubleshooting

### Common Issues

1. **Firebase Authentication Error:**
   - Verify Firebase config in `client/src/firebase.js`
   - Check if Authentication is enabled in Firebase Console

2. **MongoDB Connection Error:**
   - Verify connection string in `.env`
   - Check if IP address is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Cloudinary Upload Error:**
   - Verify cloud name in upload URL
   - Check if upload preset is set to "unsigned"
   - Ensure preset name matches exactly

4. **CORS Error:**
   - Verify backend URL in frontend config
   - Check if CORS is properly configured in server

### Environment Variables Checklist

Make sure all these are set in your `.env` file:

- [ ] `FIREBASE_PROJECT_ID`
- [ ] `FIREBASE_PRIVATE_KEY`
- [ ] `FIREBASE_CLIENT_EMAIL`
- [ ] `MONGO_URL`
- [ ] `JWT_SECRET`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `PORT`

## Security Notes

1. **Never commit sensitive files:**
   - `.env` files
   - Firebase service account JSON files
   - API keys

2. **Use environment variables:**
   - Store all sensitive data in environment variables
   - Use different values for development and production

3. **Regular security updates:**
   - Keep dependencies updated
   - Monitor for security vulnerabilities

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check browser console and server logs for errors
4. Ensure all services (Firebase, MongoDB, Cloudinary) are properly configured

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE) 