# i-pangram project

## Technologies Used

- React (Frontend)
- Node.js, Express (Backend)
- MongoDB (Database)
- Axios (HTTP requests)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Raahuldas/i-pangram-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd frontend
   ```

   in another terminal

   ```bash
   cd backend
   ```

3. Install the dependencies for both the backend and frontend:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```bash
   DB_NAME=i-pangram
   ACCESS_TOKEN_SECRET=your-jwt-secret
   MONGO_URI=your-mongodb-uri
   PORT=8000
   CORS_ORIGIN=*
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. The app's frontend should now be running on `http://localhost:5173`.

7. The app's backend should now be running on `http://localhost:8000`.