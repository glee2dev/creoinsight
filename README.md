# CreoInsight

A modern portfolio and blog platform built with Next.js, featuring a sleek design with glassmorphism effects and dynamic content.

## 🚀 Live Demo

Visit [CreoInsight](https://creoinsight.pages.dev)

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Theme:** next-themes for dark/light mode
- **Icons:** Heroicons
- **Animations:** Framer Motion
- **Deployment:** Vercel

## ✨ Features

- Responsive design with glassmorphism effects
- Dark/Light mode support
- Blog platform with markdown support
- Project showcase
- Smooth page transitions and animations
- SEO optimized

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/glee2dev/creoinsight.git

# Navigate to the project directory
cd creoinsight

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Create a production build
npm run build

# Preview the production build
npm run start
```

## 📁 Project Structure

```
creoinsight/
├── app/                   # Next.js app directory
│   ├── blog/             # Blog pages
│   ├── projects/         # Project pages
│   └── about/            # About page
├── components/           # Reusable components
├── data/                # Content data
└── public/              # Static assets
```

## 🔄 Making Updates

### Content Updates
1. Blog Posts: Add/edit files in `data/blog.ts`
2. Projects: Update `data/projects.ts`
3. About: Modify `app/about/page.tsx`

### Style Updates
- Global styles: `app/globals.css`
- Component styles: Respective component files using Tailwind CSS

## 📝 License

MIT License - feel free to use this project for your own portfolio!
