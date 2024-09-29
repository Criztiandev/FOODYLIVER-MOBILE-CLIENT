# FoodyLiver

FoodyLiver is a mobile application designed to simplify food delivery from local stores straight to your home. This app replicates the core functionality of popular food delivery services like Foodpanda, allowing users to browse menus, order food, and track their deliveries in real-time.

## Features

- User registration and authentication
- Browse local restaurants and their menus
- Search functionality for restaurants and dishes
- Place food orders with customization options
- Real-time order tracking
- In-app payment integration
- User ratings and reviews for restaurants and dishes
- Order history and reordering
- Push notifications for order updates

## Tech Stack

- **Frontend:**
  - React Native for cross-platform mobile development
  - Redux for state management
  - React Navigation for routing and navigation

- **Backend:**
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose as ODM
  - JSON Web Tokens (JWT) for authentication

- **Real-time Updates:**
  - Socket.io for real-time order tracking

- **Payment Integration:**
  - Stripe API for secure payment processing

- **Maps and Location:**
  - Google Maps API for restaurant location and delivery tracking

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB
- React Native development environment set up (including Android Studio or Xcode)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/foodyliver.git
   cd foodyliver
   ```

2. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```

3. Install dependencies for the mobile app:
   ```
   cd ../mobile
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add necessary environment variables (e.g., MongoDB URI, JWT secret, Stripe API key)

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Run the mobile app:
   ```
   cd ../mobile
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## API Documentation

For detailed API documentation, please refer to the [API_DOCS.md](API_DOCS.md) file.

## Contributing

We welcome contributions to FoodyLiver! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Testing

To run the test suite:

1. For backend tests:
   ```
   cd backend
   npm test
   ```

2. For mobile app tests:
   ```
   cd mobile
   npm test
   ```

## Deployment

For instructions on how to deploy this application to app stores and set up the backend in a production environment, please see our [Deployment Guide](DEPLOYMENT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Foodpanda and other food delivery services for inspiration
- All open-source libraries and APIs used in this project

---

Enjoy delivering happiness with FoodyLiver!
