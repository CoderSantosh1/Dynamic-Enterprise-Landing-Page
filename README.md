# Dynamic Enterprise Landing Page — Eminenture

A comprehensive MERN stack solution for creating dynamic, content-managed enterprise landing pages. Featuring a modern Next.js frontend with Tailwind CSS styling, a Node.js/Express backend API, and MongoDB persistence. Includes a real-time admin panel for managing landing page content.

**Role Level**: Mid-Level MERN Stack Developer (3+ Years Experience)

---

## 📋 Project Overview

### Objective
Design an alternative homepage for Eminenture.com with a unique look and feel, drawing structural and visual inspiration from **cvent.com** and **infosys.com**. The core requirement is a Node.js backend that manages dynamic text/content for a Next.js landing page in real time.

### Key Features
- ✅ **Dynamic Content Management** — Backend API controls all landing page text and metrics
- ✅ **Real-Time Admin Panel** — Simple UI to edit hero title, subtitle, CTA, and stats
- ✅ **Instant Content Sync** — Changes reflect immediately on homepage
- ✅ **Modern Design** — Tailwind CSS with Midnight Blue background (#0f172a) and Emerald green accents (#10b981)
- ✅ **Fully Responsive** — Mobile-first design with Tailwind breakpoints (md:, lg:)
- ✅ **Fallback Support** — In-memory fallback when MongoDB is unavailable
- ✅ **Production Ready** — CORS enabled, error handling, and proper logging

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router) — React framework with server-side rendering
- **TypeScript** — Type-safe development
- **Tailwind CSS 4** — Utility-first CSS framework
- **React 19** — Latest React features

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Lightweight web framework
- **Mongoose** — MongoDB object modeling
- **CORS** — Cross-origin resource sharing

### Database
- **MongoDB** — NoSQL document database
- **Collection**: `landingPageContent` with document ID `landing-page`

---

## 📁 Project Structure

```
Dynamic-Enterprise-Landing-page/
├── backend/
│   ├── server.js                 # Express server with API endpoints
│   ├── package.json
│   └── .env.example             # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout with Geist fonts
│   │   │   ├── page.tsx          # Home page (landing page)
│   │   │   ├── admin/
│   │   │   │   └── page.tsx      # Admin content editor
│   │   │   └── globals.css       # Global Tailwind styles
│   │   └── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts        # Tailwind configuration
│   ├── postcss.config.mjs        # PostCSS with Tailwind
│   ├── tsconfig.json
│   └── .env.example              # Environment variables template
│
├── package.json                  # Root scripts for running both services
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB 4.4+ running locally or a connection string
- Git

### Installation & Setup

#### 1. Clone & Install Dependencies
```bash
# Clone the repository (or navigate to the project)
cd Dynamic-Enterprise-Landing-page

# Install root, backend, and frontend dependencies
npm install

# Navigate to backend and install
cd backend
npm install

# Navigate to frontend and install
cd ../frontend
npm install

# Return to root
cd ..
```

#### 2. Configure Environment Variables

**Backend** — Create `backend/.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/eminenture
PORT=5000
```

**Frontend** — Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### 3. Start MongoDB
```bash
# macOS with Homebrew
brew services start mongodb-community

# Windows with MongoDB installed
net start MongoDB

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or connect to a remote MongoDB instance by setting MONGODB_URI
```

#### 4. Run Both Services

**Option A: From root (concurrent)**
```bash
npm run dev
```
This starts both backend (port 5000) and frontend (port 3000) concurrently.

**Option B: Separate terminals**

Terminal 1 — Backend:
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
# Frontend running at http://localhost:3000
```

#### 5. Access the Application
- **Landing Page**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### `GET /api/content`
Fetch current landing page content from the database.

**Response** (200 OK):
```json
{
  "_id": "landing-page",
  "heroTitle": "Build smarter systems for modern growth.",
  "subtitle": "We help enterprise teams align strategy, operations, and digital transformation to unlock measurable performance.",
  "ctaText": "Book a strategy call",
  "stats": [
    { "label": "Global clients", "value": "120+" },
    { "label": "Average ROI uplift", "value": "32%" },
    { "label": "Transformation programs", "value": "260" },
    { "label": "Market response", "value": "4.9/5" }
  ],
  "updatedAt": "2026-08-17T12:34:56.000Z"
}
```

#### `PUT /api/content`
Update landing page content. All fields are optional; unspecified fields retain existing values.

**Request Body**:
```json
{
  "heroTitle": "New headline",
  "subtitle": "New subtitle",
  "ctaText": "Updated CTA",
  "stats": [
    { "label": "New Metric", "value": "999" }
  ]
}
```

**Response** (200 OK):
```json
{
  "_id": "landing-page",
  "heroTitle": "New headline",
  "subtitle": "New subtitle",
  "ctaText": "Updated CTA",
  "stats": [{ "label": "New Metric", "value": "999" }],
  "updatedAt": "2026-08-17T12:35:00.000Z"
}
```

#### `GET /`
Health check endpoint.

**Response** (200 OK):
```json
{ "message": "Eminenture backend is running." }
```

---

## 🎨 Design & Components

### Color Palette
- **Background**: Midnight Blue (`#0f172a`, `bg-slate-950`)
- **Accent**: Emerald Green (`#10b981`, `bg-emerald-500`)
- **Text**: Slate 50 (`#f8fafc`, `text-slate-50`)
- **Border**: White with 10% opacity (`border-white/10`)

### Key Sections

#### 1. Navbar (Sticky)
- Eminenture logo with icon
- Navigation links: Solutions, Industries, Insights, About
- Admin link (hidden on mobile)
- CTA button: "Talk to an expert"

#### 2. Hero Section
- Dynamic headline (from backend)
- Dynamic subtitle (from backend)
- Two CTA buttons: Primary ("Book a strategy call") and Secondary ("Explore solutions")
- Visual dashboard graphic on desktop

#### 3. Stats/Metrics Section
- 4 dynamically populated metric cards
- Grid layout: 2 columns on mobile, 4 on desktop
- Real-time updates from backend

#### 4. Solutions Section
- 3 service cards (Digital Operations, Business Strategy, AI Enablement)
- Static content with elegant typography

#### 5. About Section
- Two-column layout on desktop
- Company mission and values

#### 6. Footer
- Company branding
- Navigation links
- CTA for contact

#### 7. Admin Panel (`/admin`)
- Form to edit hero title, subtitle, and CTA text
- Dynamic stats editor (add/remove/edit metrics)
- Real-time validation
- Success/error messaging
- "Back to Home" button
- Sticky action bar with Save and Reset buttons

---

## 🏗️ Architecture

### Frontend Architecture
```
Layout (Root)
├── Home Page (Async Server Component)
│   ├── Navbar
│   ├── Hero Section (with dynamic content)
│   ├── Stats Section (with dynamic metrics)
│   ├── Solutions Section
│   ├── About Section
│   └── Footer
└── Admin Page (Client Component)
    ├── Header
    └── Content Form
```

### Backend Architecture
```
Express App
├── CORS Middleware
├── JSON Body Parser
├── MongoDB Connection (with fallback)
├── Routes
│   ├── GET / (health check)
│   ├── GET /api/content
│   └── PUT /api/content
└── Fallback: In-Memory Store
```

### Data Flow
```
Admin Form (Frontend)
    ↓
PUT /api/content (API)
    ↓
MongoDB Update
    ↓
Response with updated content
    ↓
Display success message
    ↓
Home Page fetches via GET /api/content (no-store)
    ↓
Page revalidates with new content
```

---

## 🔄 Real-Time Content Sync

1. **User edits content** in `/admin` form
2. **Clicks "Save Changes"** → Form sends `PUT /api/content` request
3. **Backend updates MongoDB** (or in-memory fallback)
4. **Success message displays** in admin panel
5. **User navigates to home** or refreshes
6. **Next.js fetches latest content** via `GET /api/content` with `cache: 'no-store'`
7. **Page renders** with updated content immediately

---

## 📦 Root Package Scripts

Add to root `package.json` (if needed):

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev -w backend\" \"npm run dev -w frontend\"",
    "build": "npm run build -w backend && npm run build -w frontend",
    "server": "npm run dev -w backend",
    "client": "npm run dev -w frontend"
  }
}
```

Install concurrently if using monorepo approach:
```bash
npm install --save-dev concurrently
```

---

## 🛡️ Error Handling

### Backend
- **MongoDB unavailable**: Falls back to in-memory content storage
- **Invalid payload**: Normalizes missing fields with defaults
- **Connection errors**: Logged to console, non-blocking

### Frontend
- **API failure**: Returns fallback content
- **Network timeout**: Graceful degradation with default data
- **Admin form errors**: Clear error messages with retry option

---

## 📝 Environment Variables

### Backend (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/eminenture` | MongoDB connection string |
| `PORT` | `5000` | Backend server port |

### Frontend (`.env.local`)
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend API base URL (must be `NEXT_PUBLIC_` for browser access) |

---

## 🧪 Testing the API with cURL

```bash
# Get current content
curl http://localhost:5000/api/content

# Update content
curl -X PUT http://localhost:5000/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "heroTitle": "Updated Title",
    "subtitle": "Updated subtitle text",
    "ctaText": "Click here",
    "stats": [
      {"label": "Metric 1", "value": "100"}
    ]
  }'
```

---

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
1. Push repository to GitHub
2. Connect GitHub repo to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable to production backend URL
4. Deploy automatically on push

### Backend (Render/Railway/AWS)
1. Deploy Node.js server to platform of choice
2. Set `MONGODB_URI` to production MongoDB connection string
3. Set `PORT` if required
4. Update frontend `NEXT_PUBLIC_API_URL` to production backend URL

### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eminenture
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB
brew services start mongodb-community  # macOS
net start MongoDB                       # Windows
docker run -d -p 27017:27017 mongo    # Docker
```

### "API_URL is not defined" (Frontend)
Ensure `NEXT_PUBLIC_API_URL` is set in `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Admin form not saving
1. Check backend is running on port 5000
2. Verify `NEXT_PUBLIC_API_URL` in frontend env
3. Check browser console for network errors
4. Verify CORS is enabled in backend (it is by default)

### Changes not reflecting on homepage
1. Frontend fetches with `cache: 'no-store'` (no caching)
2. Try hard-refreshing (Ctrl+Shift+R / Cmd+Shift+R)
3. Check that PUT request succeeded (check admin form success message)
4. Verify backend is using correct MongoDB

---

## 📚 Learning Resources

- **Next.js App Router**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/docs
- **MERN Stack**: https://www.mongodb.com/mern-stack

---

## 📄 License

This project is provided as-is for the Eminenture assignment.

---

## 👤 Author

Built as a Mid-Level MERN Stack Developer assignment.

---

## ✅ Submission Checklist

- ✅ Backend: Express server with CORS, MongoDB, and API endpoints
- ✅ Frontend: Next.js with Tailwind CSS and dynamic content fetching
- ✅ Admin Panel: Real-time content editor with form submission
- ✅ Responsive Design: Mobile-first with Tailwind breakpoints
- ✅ Documentation: Comprehensive README with setup instructions
- ✅ GitHub Ready: Clear instructions to run locally

**To get started**: Follow the **Quick Start** section above!

If MongoDB is not available, the server automatically falls back to in-memory content so the app still runs.
