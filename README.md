# Ellen Engineer - Portfolio Website

Portfolio website för Ellen Carlsson - Software Engineer

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Hosting:** TBD (GitHub Pages, Vercel, Heroku, etc.)

## Project Structure

```
ellenengineer/
├── client/              # React frontend
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page components
│   │   ├── styles/     # CSS files
│   │   └── utils/      # Utility functions
│   └── package.json
├── server/             # Node.js + Express backend
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── package.json
└── package.json       # Root package.json for scripts
```

## Installation

1. Klona repot:
```bash
git clone https://github.com/ellencarlsson/ellenengineer.git
cd ellenengineer
```

2. Installera alla dependencies:
```bash
npm run install-all
```

3. Sätt upp environment variables:
```bash
cd server
cp .env.example .env
# Redigera .env med dina egna värden
```

4. Starta MongoDB lokalt (eller använd MongoDB Atlas)

## Development

Starta både frontend och backend samtidigt:
```bash
npm run dev
```

Eller starta dem separat:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

- Frontend körs på: http://localhost:3000
- Backend API körs på: http://localhost:5000

## Scripts

- `npm run dev` - Starta både client och server
- `npm run client` - Starta endast frontend
- `npm run server` - Starta endast backend
- `npm run install-all` - Installera alla dependencies
- `npm run build` - Bygg production-version av frontend

## Features (Planerade)

- [ ] Hero/Landing page med introduktion
- [ ] Portfolio/Projekt-sektion
- [ ] Om mig-sektion
- [ ] Kontakt-formulär
- [ ] Responsiv design
- [ ] Dark mode

## License

MIT
