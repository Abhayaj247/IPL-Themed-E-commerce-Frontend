# IPL Themed E-commerce Platform - Frontend

A React-based e-commerce platform themed around IPL teams, allowing team representatives to manage their merchandise.

## Live Demo
- Frontend: [https://ipl-themed-e-commerce.vercel.app](https://ipl-themed-e-commerce.vercel.app)
- Backend API: [https://ipl-themed-e-commerce-backend.onrender.com/api](https://ipl-themed-e-commerce-backend.onrender.com/api)

## Features
- User authentication with team assignment
- Team-specific dashboards
- Product management (Add, View)
- Team-themed UI with dynamic styling
- Responsive design using Tailwind CSS

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- React Router for navigation

## Getting Started

### Prerequisites
- Node.js (>= 14.0.0)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Abhayaj247/IPL-Themed-E-commerce-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Environment Variables
- `VITE_API_URL`: Backend API URL (defaults to local development URL)

## Project Structure
```
src/
├── components/      # React components
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Team Assignment Logic
Users are automatically assigned to IPL teams upon registration. The assignment is handled by the backend service, which implements the following logic:
1. Random team assignment from available IPL teams
2. Equal distribution of users across teams
3. Team assignment is permanent and stored with user data

## Deployment
The frontend is deployed on Vercel with automatic deployments from the main branch.

## Repository Links
- Frontend: [\[GitHub Repository URL\]](https://github.com/Abhayaj247/IPL-Themed-E-commerce-Frontend)
- Backend: [\[GitHub Repository URL\]](https://github.com/Abhayaj247/IPL-Themed-E-commerce-Backend)
