# Lifelore — Digital Life Lessons Platform

**A full-stack web platform where users create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered over time.**

---

## Live URL

> https://lifelore-frontend.vercel.app/

## GitHub Repositories

- **Client:** https://github.com/rakib4kbd/lifelore-frontend
- **Server:** https://github.com/rakib4kbd/lifelore-backend

---

## Purpose

People often learn valuable lessons but forget them over time. Lifelore helps preserve personal wisdom, encourages mindful reflection, and allows users to grow by exploring lessons from the community.

---

## Key Features

### Authentication

- Email/password registration and login via **Better Auth**
- Google OAuth login
- Password validation (uppercase, lowercase, min 6 characters)
- Role-based access: `user` and `admin`

### Lesson System

- Create life lessons with title, description, category, emotional tone, image, and access level
- Visibility: **Public** or **Private**
- Access Level: **Free** (everyone) or **Premium** (premium users + creator only)
- Free users see Premium lessons blurred with an "Upgrade to Premium" prompt
- Browse, search, filter by category / emotional tone / keyword
- Sort by newest or most saved

### Interactions

- Like lessons (real-time toggle, no refresh)
- Save to personal Favorites list
- Comment on lessons
- Report inappropriate lessons (with reason dropdown)

### Premium & Payments

- Free plan by default; upgrade via **Stripe** (one-time payment)
- Stripe webhook updates `isPremium` in MongoDB on successful payment
- Payment success and cancel pages

### Dashboard (User)

- Overview: total lessons, total favorites, recent lessons, analytics chart
- Add Lesson form
- My Lessons table: edit (modal), delete, toggle visibility/access level, view stats
- My Favorites: remove, filter, view details
- Profile: update display name or photo

### Admin Dashboard

- Platform-wide analytics: total users, total lessons, reported lessons, most active contributors, graphs
- Manage Users: promote to admin, delete accounts
- Manage Lessons: delete, mark as featured, filter by category/visibility/flags
- Reported Lessons: view report details, delete lesson or ignore reports
- Admin Profile

### Home Page

- Hero slider (3+ slides) with platform information
- Featured Life Lessons (controlled by admin)
- "Why Learning From Life Matters" static section
- Most Saved Lessons (dynamic)
- Top Contributors of the Week (dynamic)
- Framer Motion animations

### Other

- Dark / Light theme toggle
- Estimated reading time on lesson details
- Pagination on public lessons
- Fully responsive (mobile, tablet, desktop)
- Custom 404 page
- Loading spinners throughout the app
- Token-verified protected routes

---

## Pages

| Public / Auth    | Protected / Dashboard    |
| ---------------- | ------------------------ |
| Home             | Lesson Details           |
| Login / Register | Pricing / Upgrade        |
| Public Lessons   | Payment Success & Cancel |
| 404 Not Found    | Favorites                |
|                  | Dashboard (User + Admin) |
|                  | Add Lesson               |
|                  | My Lessons               |
|                  | Update Lesson (modal)    |

---

## NPM Packages Used

### Dependencies

| Package                  | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| `next` v16               | React framework (App Router)                   |
| `react` v19              | UI library                                     |
| `better-auth`            | Authentication (email/password + Google OAuth) |
| `mongodb`                | MongoDB driver for database access             |
| `stripe`                 | Stripe server-side SDK for payments            |
| `@stripe/stripe-js`      | Stripe client-side SDK                         |
| `motion` (framer-motion) | Animations and transitions                     |
| `recharts`               | Charts and data visualization                  |
| `react-hook-form`        | Form state management and validation           |
| `react-hot-toast`        | Toast notifications                            |
| `react-share`            | Social media sharing buttons                   |
| `lucide-react`           | Icon library                                   |

## Environment Variables

Create a `.env` file at the root with the following keys:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

MONGODB_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, DaisyUI v5
- **Backend:** Next.js API Routes, MongoDB
- **Auth:** Better Auth (email/password + Google)
- **Payments:** Stripe (test mode)
- **Deployment:** Vercel
