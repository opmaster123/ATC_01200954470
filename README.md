# ATC_01200954470 - MERN Stack Application

## Setup Instructions

### 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/opmaster123/ATC_01200954470.git
cd ATC_01200954470
```

### 2. Backend Setup
The backend is an Express.js server that connects to MongoDB and serves the frontend.

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```bash
touch .env
```
Add the following:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=8080
```
- Replace `your_mongodb_atlas_connection_string` with your own MongoDB Atlas URI:
  - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  - Create a free M0 cluster.
  - Go to **Database Access** and create a user (save the username and password).
  - Go to **Network Access** and add an entry to allow connections from `0.0.0.0/0` (for local testing and Render deployment).
  - Click **Connect** > **Drivers** and copy the connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`).
  - Update the `<user>`, `<password>`, and `<dbname>` in the string with your details.
- **Note**: Do not commit the `.env` file to GitHub; it is ignored by `.gitignore`.
- Generate a Secret Key and Replace `your_secret_key` with your key:

#### Run the Backend
Start the Express server:
```bash
node server.js
```
- The backend should run on `http://localhost:8080`.

### 3. Frontend Setup
The frontend is a React application that needs to be built and served by the backend.

#### Navigate to Frontend Directory
```bash
cd ../frontend
```

#### Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

#### Run the Frontend (Development Mode)
To run the frontend in development mode (with hot reloading):
```bash
npm start
```
- This opens the app at `http://localhost:3000`.
- **Note**: In development, the frontend runs separately from the backend. Ensure the backend is running on `http://localhost:8080` and configure API calls in the frontend to point to this URL (e.g., `fetch('http://localhost:8080/api')`).

#### Build the Frontend (Production Mode)
To create a production build (served by the backend):
```bash
npm run build
```
- This generates a `build/` folder in `frontend/`, which the backend serves at `http://localhost:8080`.

### 4. Run the Full Application
- Ensure the backend is running (`node backend/server.js`).
- The backend serves the `frontend/build/` folder, so after building the frontend, visit:
  ```
  http://localhost:8080
  ```
- Test API routes (e.g., `http://localhost:8080/api`) if defined in `backend/routes/`.

 ### 5. How To Run Both
 - If you want to run both the Frontend and the Backend concurrently at the same time, you can go to the root of the project after executing:
```bash
npm install
```
- and run
```bash
npm run dev
```
Since Run Scripts are defined in the `package.json` for the Backend and Frontend, seperately or Both

## Troubleshooting
- **Backend Fails to Start**:
  - Check if `MONGODB_URI` is correct in `backend/.env`.
  - Ensure MongoDB Atlas allows connections (`0.0.0.0/0` in Network Access).
  - Verify all dependencies are installed (`npm install` in `backend/`).
- **Frontend Not Loading**:
  - Ensure `npm run build` was run in `frontend/`.
  - Check `backend/server.js` serves `../frontend/build` correctly.
- **CORS Issues in Development**:
  - If the frontend (port 3000) can’t reach the backend (port 8080), add CORS to `backend/server.js`:
    ```javascript
    const cors = require('cors');
    app.use(cors({ origin: 'http://localhost:3000' }));
    ```
    Install CORS: `npm install cors` in `backend/`.

