# Student Portfolio - Next.js App

**Student Number:** 21946017

A modern Next.js application showcasing web development skills with GitHub integration, Docker containerization, and database management.

## Features

- 🌓 **Dark/Light Theme Toggle** - Persistent theme switching with cookies
- 📱 **Responsive Design** - Mobile-friendly navigation with hamburger menu
- 🔗 **GitHub Integration** - Update README files via GitHub API
- 🐳 **Docker Ready** - Containerized deployment
- 🗄️ **Database Integration** - Prisma ORM setup
- ✅ **Testing Suite** - Comprehensive test coverage

## Tech Stack

- **Framework:** Next.js 15.5.0 with Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Database:** Prisma ORM
- **Authentication:** GitHub Personal Access Tokens
- **Deployment:** Docker containerization

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/prj1.git
cd prj1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## GitHub Integration

The app includes a GitHub integration feature that allows you to:
- Connect with your GitHub account using Personal Access Tokens
- Update README files in your repositories
- View commit history and file changes

### Setup GitHub Integration

1. Generate a Personal Access Token in GitHub Settings
2. Grant `repo` scope permissions
3. Use the token in the GitHub form within the app

## Project Structure

```
prj1/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── about/          # About page
│   ├── docker/         # Docker information
│   ├── prisma/         # Database page
│   └── tests/          # Testing page
├── components/         # React components
├── context/           # React context providers
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is for educational purposes as part of coursework.

---

**Student:** 21946017  
**Course:** Web Development  
**Year:** 2025