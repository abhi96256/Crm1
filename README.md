# CRM System

A comprehensive Customer Relationship Management system built with React frontend and Node.js backend.

## Features

- **User Management**: Admin and employee roles with different permissions
- **Lead Management**: Track and manage potential customers
- **Pipeline Management**: Visual sales pipeline with drag-and-drop functionality
- **Task Management**: Assign and track tasks for team members
- **Invoice Management**: Create and manage invoices
- **Activity Logging**: Track all system activities
- **WhatsApp Integration**: WhatsApp bot for lead management
- **LinkedIn Integration**: Sync LinkedIn leads

## Tech Stack

### Frontend
- React.js
- Vite
- CSS3
- Context API for state management

### Backend
- Node.js
- Express.js
- MySQL database
- JWT authentication
- Middleware for role-based access control

### Additional Tools
- WhatsApp Web.js bot
- LinkedIn API integration

## Project Structure

```
├── src/                    # React frontend source code
│   ├── Components/        # React components
│   ├── context/          # React context providers
│   └── services/         # API service functions
├── backend/               # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Express middleware
│   └── services/         # Business logic services
├── wwebjs-bot/           # WhatsApp bot implementation
└── public/               # Static assets
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Crm
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:
   - Copy `backend/env_example.txt` to `backend/.env`
   - Configure database connection and other settings

5. Set up the database:
```bash
cd backend
node setup_db.js
```

6. Start the backend server:
```bash
npm start
```

7. In a new terminal, start the frontend:
```bash
cd ..
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory with:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=crm_database
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Database Setup

The system includes several SQL scripts for database setup:
- `setup.sql` - Main database structure
- `setup_admin_tables.sql` - Admin-specific tables
- `setup_groups_table.sql` - Group management tables
- `setup_tasks_table.sql` - Task management tables
- `setup_invoices.sql` - Invoice management tables

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/users` - User management
- `/api/leads` - Lead management
- `/api/pipeline` - Pipeline management
- `/api/tasks` - Task management
- `/api/invoices` - Invoice management
- `/api/admin` - Admin-specific routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
