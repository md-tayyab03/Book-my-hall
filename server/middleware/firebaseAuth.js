const admin = require('firebase-admin');

// Check if Firebase credentials are available
const hasFirebaseCredentials = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY;

if (hasFirebaseCredentials) {
  // Use environment variables for Firebase credentials
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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
}

async function firebaseAuth(req, res, next) {
  // If Firebase is not configured, skip authentication for now
  if (!hasFirebaseCredentials) {
    console.log('Firebase not configured, skipping authentication');
    req.user = { uid: 'temp-user' }; // Temporary user for development
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = firebaseAuth;