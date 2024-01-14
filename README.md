# CBW App - Assignment Part 2

A Next.js application with database integration, Docker support, and comprehensive testing.

## Features

- **Database Integration**: Toggle between Prisma and Sequelize ORMs
- **CRUD Operations**: Save and retrieve git commands from database
- **Docker Support**: Full containerization with docker-compose
- **Testing**: Automated tests with Playwright
- **Cloud Ready**: Prepared for AWS deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Generate Prisma client:
```bash
npm run db:generate
```

4. Start development server:
```bash
npm run dev
```

## Docker

Run with Docker Compose:
```bash
docker-compose up --build
```

## Testing

Run tests:
```bash
npm test
```

## Database

The application supports both Prisma and Sequelize with MySQL backend. Toggle between them on the `/prisma` page.

## API Endpoints

- `POST /api/git-command` - Execute git commands
- `POST /api/save-command` - Save commands to database
- `GET /api/commands` - Retrieve saved commands