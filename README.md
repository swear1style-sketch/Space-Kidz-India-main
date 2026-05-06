# Space Kidz India

The official website for Space Kidz India - Inspiring young minds in space science and technology.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

Due to some peer dependency conflicts with React 19, use the legacy peer deps flag:

```bash
npm install --legacy-peer-deps
```

Or use the provided script:

```bash
npm run install:legacy
```

### Environment Setup (Optional)

The app can be deployed to Vercel **without any environment variables** - all features will gracefully disable and show appropriate messages to users.

For full functionality, create a `.env.local` file with:

```bash
# Database (optional - forms will show "unavailable" message if missing)
DATABASE_URL="postgresql://username:password@localhost:5432/spacekidz"

# Supabase (optional - blog uploads will save locally only if missing)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_BLOG_BUCKET="blogs"

# AI (optional - Space GPT will show "unavailable" message if missing)
GEMINI_API_KEY="your-gemini-api-key"

# Admin (optional - admin dashboard will be disabled if missing)
ADMIN_PASSWORD="your-admin-password"
```

**Note:** Missing environment variables will not break the deployment - features simply become unavailable with user-friendly messages.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## � Deployment

### Vercel (Recommended)

The app is optimized for Vercel deployment and can be deployed **without any environment variables**:

1. Connect your GitHub repository to Vercel
2. Deploy - the app will build and run with basic functionality
3. Add environment variables in Vercel dashboard to enable full features

### Features Without Environment Variables

- ✅ **Static pages** - All content pages work
- ✅ **Basic navigation** - Site structure and routing work
- ⚠️ **Forms** - Show "currently unavailable" messages
- ⚠️ **Space GPT** - Shows "currently unavailable" message
- ⚠️ **Admin dashboard** - Disabled with appropriate message
- ⚠️ **Blog uploads** - Save locally only (no cloud storage)

## �📁 Project Structure

- `app/`: Next.js 13+ app directory with API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and configurations
- `public/`: Static assets
- `blogs/`: Blog content in Markdown format

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS, Radix UI
- **Database**: PostgreSQL (via Neon)
- **Storage**: Supabase
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 📝 Features

- Space education content and resources
- Event registration system
- Blog submission and management
- Contact forms with email notifications
- Admin dashboard for data management
- AI-powered Space GPT chatbot

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
