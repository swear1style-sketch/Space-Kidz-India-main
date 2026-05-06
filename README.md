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

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.local .env.local
```

2. Fill in your actual values for:
   - `DATABASE_URL`: Your PostgreSQL/Neon database URL
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `SUPABASE_BLOG_BUCKET`: Your Supabase storage bucket name
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `ADMIN_PASSWORD`: Password for admin dashboard access

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

## 📁 Project Structure

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
