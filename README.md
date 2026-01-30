# 📚 AI E-Book Creator

A modern, full-stack web application for creating e-books with AI-powered content generation. Built with React, Node.js, Express, and MongoDB.

![AI E-Book Creator](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful glassmorphic design with smooth animations
- 🤖 **AI Content Generation** - Generate chapters using Google Gemini AI
- 📝 **Rich Text Editor** - Intuitive chapter editing interface
- 📚 **Book Management** - Create, edit, and organize multiple books
- 📄 **Export Options** - Download books as PDF or DOCX
- 🔐 **Authentication** - Secure user authentication with JWT
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark Theme** - Eye-friendly dark mode interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Google Gemini AI** - Content generation
- **PDFKit & DOCX** - Document export

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-ebook-creator
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your configuration
```

**Backend .env Configuration:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-ebook
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:5173
```

**Start Backend:**
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env if needed
```

**Frontend .env Configuration:**
```env
VITE_API_URL=http://localhost:5000
```

**Start Frontend:**
```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Frontend (Vercel)
- Backend (Render/Railway)
- Database (MongoDB Atlas)

## 🎯 Usage

1. **Sign Up** - Create a new account
2. **Create Book** - Click "Create New Book" and fill in details
3. **Add Chapters** - Use the editor to add and organize chapters
4. **Generate Content** - Use AI to generate chapter content
5. **Export** - Download your book as PDF or DOCX

## 📁 Project Structure

```
ai-ebook-creator/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── utils/          # Utility functions
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/
│   ├── config/             # Database configuration
│   ├── controller/         # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middlewares
│   └── index.js            # Entry point
└── README.md
```

## 🔑 Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL

### Backend
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini API key
- `OPENROUTER_API_KEY` - (Optional) OpenRouter API key
- `CORS_ORIGIN` - Allowed CORS origin

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- Tailwind CSS for the design system
- React community for amazing tools

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

Made with ❤️ by Your Name
