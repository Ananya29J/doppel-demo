# Digital Doppelgänger Platform

The Digital Doppelgänger platform creates an AI Twin for each learner by analyzing study hours, breaks, sleep cycles, and past performance. It simulates outcomes (e.g., studying 2 hours instead of 1 could boost scores by 15%) and gives personalized recommendations on schedules, focus areas, and strategies, helping students optimize efforts before real exams.

## Features

### 1. Scheduler Handler + Generator
- Add and manage your daily schedule
- Generate schedules based on tasks and priorities
- Task manager with time tracking
- Visual activity graphs

### 2. Study With Me
- Pomodoro timer (25-minute focused sessions)
- Free infinity clock for extended study sessions
- Track study time and sessions

### 3. Digital Doppelgänger (Main Feature)
- AI-powered analysis of study habits
- Simulates different study scenarios and outcomes
- Personalized recommendations for schedules, focus areas, and strategies
- Visual line graphs comparing real vs. twin performance
- Suggests different studying techniques

### 4. Previous Activity
- Store and view all previously created/generated data
- Track study hours, scores, and performance over time
- Historical data analysis

### 5. AI-Powered Chatbot (Additional Feature)
- Ask questions about study techniques
- Get personalized recommendations
- Receive links and resources based on queries
- Analyze and provide insights on study methods

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Recharts (for graphs)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API (optional, for enhanced chatbot)

## Project Structure

```
doppel-demo-main/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── Scheduler.jsx
│   │   ├── StudyWithMe.jsx
│   │   ├── Doppelganger.jsx
│   │   ├── PrevActivity.jsx
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
├── backend/                # Backend API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── server.js           # Express server
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns).

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doppelganger
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development

# Optional: For AI Chatbot (OpenAI API)
OPENAI_API_KEY=your_openai_api_key_here
```

5. Make sure MongoDB is running:
   - For local MongoDB: Start your MongoDB service
   - For MongoDB Atlas: Use your connection string in `MONGODB_URI`

6. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend API will be available at `http://localhost:5000`.

### Running Both Frontend and Backend

1. Open two terminal windows
2. In the first terminal, start the backend:
```bash
cd backend
npm run dev
```

3. In the second terminal, start the frontend:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/avatar` - Update avatar

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Schedules
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create a schedule
- `POST /api/schedules/generate` - Generate a schedule

### Study Sessions
- `GET /api/study-sessions` - Get all study sessions
- `POST /api/study-sessions` - Create a study session

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create an activity

### Digital Doppelgänger
- `GET /api/doppelganger/latest` - Get latest analysis
- `POST /api/doppelganger` - Create analysis
- `POST /api/doppelganger/simulate` - Simulate scenario

### Chat
- `GET /api/chat` - Get chat history
- `POST /api/chat/message` - Send message to AI

For detailed API documentation, see [backend/README.md](backend/README.md).

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `OPENAI_API_KEY` - OpenAI API key (optional)

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. After registering or logging in, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database

The application uses MongoDB to store:
- User accounts and avatars
- Tasks and schedules
- Study sessions
- Activity records
- AI analyses and recommendations
- Chat history

## Development

### Frontend Development
- Uses Vite for fast HMR (Hot Module Replacement)
- Tailwind CSS for styling
- React 19 with hooks

### Backend Development
- Express.js REST API
- Mongoose for MongoDB ODM
- JWT for authentication
- CORS enabled for frontend communication

## Notes

- The AI chatbot works without OpenAI API key but provides basic responses. For enhanced AI responses, add your OpenAI API key.
- All timestamps are stored in UTC. Convert to local time in the frontend.
- JWT tokens expire after 30 days.

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!