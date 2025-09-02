# TaskForge

TaskForge is a comprehensive task management application designed to help individuals and teams organize, prioritize, and collaborate on tasks efficiently. It features user authentication, task CRUD operations, sharing capabilities, and AI-driven insights for task prioritization and categorization using natural language processing.

## Features

- **User Authentication**: Secure registration and login with JWT.
- **Task Management**: Create, read, update, and delete tasks with details like title, description, due date, and category.
- **AI Prioritization**: Automatically suggests priority levels (Low, Medium, High) and categories based on task description analysis.
- **Collaboration**: Share tasks with other users for joint editing.
- **Responsive UI**: Modern, intuitive interface built with React and Tailwind CSS.
- **Backend API**: Robust Express server with MongoDB for data persistence.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, Bcrypt
- **NLP/AI**: nlp-compromise for text analysis
- **Other**: dotenv for environment variables

## Installation

1. Clone the repository:
git clone https://github.com/yourusername/TaskForge.git

2. Install dependencies:
- Backend: `cd server && npm install`
- Frontend: `cd client && npm install`
3. Set up environment variables: Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` and `JWT_SECRET`.
4. Start the backend: `cd server && npm start`
5. Start the frontend: `cd client && npm start`
6. Open http://localhost:3000 in your browser.

## Usage

- Register or login to access the dashboard.
- Create tasks and see AI suggestions in action.
- Share tasks by adding user emails.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT


