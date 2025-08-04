# Monorepo Template

A modern full-stack monorepo template with Go backend and React frontend.

## 🏗️ Architecture

```
gorge/
├── backend/          # Go API server with Chi router
│   ├── main.go
│   ├── go.mod
│   ├── go.sum
│   ├── .air.toml     # Hot reload configuration
│   └── .env          # Backend environment variables
├── frontend/         # React + TypeScript SPA
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── types/
│   ├── public/
│   ├── .env          # Frontend environment variables
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package.json
│   ├── .eslintrc.js
│   └── .prettierrc
├── .gitignore
└── README.md
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library with TypeScript
- **Vite** - Build tool and dev server
- **TailwindCSS v4** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible UI components
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **ESLint & Prettier** - Code linting and formatting
- **pnpm** - Package manager

### Backend
- **Go** - Programming language
- **Chi** - Lightweight HTTP router
- **Air** - Hot reload for development
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Configuration management

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Go** (v1.21 or higher)
- **Air** (for hot reloading) - `go install github.com/air-verse/air@latest`

## 🛠️ Installation

1. **Clone or download this template**
   ```bash
   # If cloning from a repository
   git clone <your-repo-url>
   cd gorge
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   go mod tidy
   ```

## 🏃‍♂️ Development

### Quick Start (Both Services)

```bash
# Option 1: Run both services with one command
cd frontend
pnpm run dev

# Option 2: Run services separately in different terminals
# Terminal 1 - Backend (with hot reload)
cd backend
air

# Terminal 2 - Frontend
cd frontend
pnpm dev:frontend
```

## 📝 Available Scripts

### Frontend Scripts
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Run TypeScript type checking |

### Backend Scripts
| Command | Description |
|---------|-------------|
| `go run main.go` | Start server |
| `air` | Start with hot reload |
| `go build` | Build binary |
| `go test ./...` | Run tests |
| `go mod tidy` | Clean up dependencies |

## 🎨 UI Components

This template includes Shadcn/ui components. To add new components:

```bash
cd frontend

# Add individual components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table

# View all available components
pnpm dlx shadcn@latest add
```

## 🚀 Production Build

### Frontend
```bash
cd frontend
pnpm build
# Output: frontend/dist/
```

### Backend
```bash
cd backend
go build -o bin/server main.go
# Output: backend/bin/server
```

## ✨ Features Included

### Frontend Features
- ✅ Modern React 18 with TypeScript
- ✅ Vite for lightning-fast development
- ✅ TailwindCSS v4 for styling
- ✅ Shadcn/ui for beautiful components
- ✅ TanStack Router for type-safe routing
- ✅ TanStack Query for data fetching
- ✅ React Hook Form with Zod validation
- ✅ Lucide React icons
- ✅ ESLint and Prettier configured
- ✅ Path aliases (@/ imports)
- ✅ Hot module replacement

### Backend Features
- ✅ Go with Chi HTTP router
- ✅ CORS configured for frontend
- ✅ Environment variable support
- ✅ Hot reload with Air
- ✅ JSON API responses
- ✅ Example CRUD endpoints
- ✅ Error handling and validation
- ✅ Health check endpoint

### Development Experience
- ✅ Type safety throughout the stack
- ✅ Hot reload on both frontend and backend
- ✅ Comprehensive linting and formatting
- ✅ Example API integration
- ✅ Modern development tools
- ✅ Production-ready build setup

## 🔍 Code Quality Tools

- **TypeScript** - Type safety
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Code formatting
- **Zod** - Runtime type validation
- **Go modules** - Dependency management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Learn More

### Frontend Technologies
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)

### Backend Technologies
- [Go Documentation](https://golang.org/doc/)
- [Chi Router](https://github.com/go-chi/chi)
- [Air Hot Reload](https://github.com/cosmtrek/air)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🚀**
