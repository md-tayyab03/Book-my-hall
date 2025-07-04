const config = {
  development: {
    API_URL: 'http://localhost:5000'
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL || 'https://your-backend-url.railway.app'
  }
};

const environment = process.env.NODE_ENV || 'development';
export const API_URL = config[environment].API_URL; 