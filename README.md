# Envision - Event Management Platform

A modern, full-stack web application built for managing and showcasing events, team members, and sponsors. Built with React, Vite, Tailwind CSS, and Express.js.

## 📋 Project Overview

Envision is a comprehensive event management platform that provides:
- **Event Management**: Browse and manage upcoming events
- **Team Showcase**: Display team members with integrated backend database
- **Sponsor Management**: Showcase sponsors and partnerships
- **Responsive Design**: Fully responsive interface with Tailwind CSS
- **Fast Development**: Vite for instant HMR and optimized builds

## 🏗️ Architecture

This is a **full-stack monorepo** with separate frontend and backend applications:

### Frontend (React + Vite)
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Routing**: React Router 7
- **Linting**: ESLint 9

### Backend (Node.js + Express)
- **Runtime**: Node.js with ES modules
- **Server**: Express 5
- **Database**: MySQL 2
- **API**: RESTful endpoints with CORS support

## 📁 Project Structure

```
envision/
├── src/                          # React frontend source
│   ├── Components/
│   │   ├── Navbar.jsx           # Main navigation
│   │   ├── KatanaNavbar.jsx      # Alternative navbar component
│   │   ├── Layout.jsx            # Layout wrapper
│   │   ├── katanaNavbar.css      # Navbar styles
│   │   └── ...
│   ├── Pages/
│   │   ├── Entrance.jsx          # Landing/entrance page
│   │   ├── Home.jsx              # Home page
│   │   ├── Events.jsx            # Events listing page
│   │   ├── Team.jsx              # Team members page
│   │   ├── Sponsors.jsx          # Sponsors page
│   │   └── About.jsx             # About page
│   ├── Styles/
│   │   ├── entrance.css
│   │   ├── home.css
│   │   ├── navbar.css
│   │   └── pages.css
│   ├── App.jsx                   # Main app component with routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
│
├── backend/                      # Express backend source
│   ├── server.js                 # Main server file
│   ├── db.js                     # Database configuration
│   ├── routes/
│   │   └── teamRoutes.js         # Team API endpoints
│   └── package.json              # Backend dependencies
│
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── eslint.config.js             # ESLint configuration
└── index.html                   # HTML entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd envision
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure Database**
   - Update `backend/db.js` with your MySQL credentials
   - Create necessary database and tables

### Development

#### Start Frontend (Development Server)
```bash
npm run dev
```
- Runs on `http://localhost:5173` (default Vite port)
- Hot Module Replacement (HMR) enabled for instant updates

#### Start Backend (API Server)
```bash
cd backend
npm start
```
- Runs on `http://localhost:5000`
- CORS enabled for frontend communication

#### Run Linter
```bash
npm run lint
```

### Build for Production

#### Frontend
```bash
npm run build
```
- Optimized production build in `dist/` directory

#### Preview Production Build
```bash
npm run preview
```

## 📡 API Endpoints

### Team API
- **Base URL**: `http://localhost:5000/api/team`

Current routes available in `backend/routes/teamRoutes.js`:
- Team member operations and data management

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom CSS**: Modular component-specific styles in `src/Styles/`
- **Responsive**: Mobile-first responsive design approach

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Entrance | `/` | Landing/entrance page |
| Home | `/home` | Main home page |
| Events | `/events` | Events listing and management |
| Team | `/team` | Team members showcase with database integration |
| Sponsors | `/sponsors` | Sponsors and partnerships |
| About | `/about` | About page |

## 🔧 Dependencies

### Frontend
- `react`: ^19.2.0 - UI library
- `react-dom`: ^19.2.0 - React DOM rendering
- `react-router-dom`: ^7.12.0 - Client-side routing
- `tailwindcss`: ^3.4.19 - CSS framework
- `vite`: ^7.2.4 - Build tool
- `eslint`: ^9.39.1 - Code linting

### Backend
- `express`: ^5.2.1 - Web framework
- `cors`: ^2.8.5 - Cross-origin resource sharing
- `mysql2`: ^3.16.1 - MySQL database driver

## 📦 Build & Deployment

### Frontend Build Output
The production build is created in the `dist/` directory and is ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Backend Deployment
The backend can be deployed to any Node.js hosting platform (Heroku, AWS, DigitalOcean, etc.).

## 🤝 Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Run linter: `npm run lint`
4. Test thoroughly
5. Submit a pull request

## 📝 License

ISC License

## 🔄 Development Workflow

1. **Frontend Development**: Use `npm run dev` for hot-reload development
2. **Backend Development**: Update routes in `backend/routes/` and restart server
3. **Database**: Make changes to `backend/db.js` for schema updates
4. **Testing**: Test API endpoints with frontend or tools like Postman
5. **Linting**: Run `npm run lint` before commits to maintain code quality

## 🐛 Troubleshooting

- **Port 5000 already in use**: Change the port in `backend/server.js`
- **Database connection errors**: Verify MySQL credentials in `backend/db.js`
- **CORS errors**: Ensure backend server is running and CORS is properly configured
- **Build errors**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Express.js Documentation](https://expressjs.com)
- [React Router Documentation](https://reactrouter.com)
