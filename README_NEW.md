# Doctor Portfolio Website

A premium, modern personal portfolio platform for healthcare professionals built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- ✨ **Full-Screen Hero Section** with animated 3D medical elements using Three.js
- 🎨 **Glassmorphism Design** with premium aesthetic and smooth animations
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ♿ **WCAG AA Accessibility** - Keyboard navigation, screen reader support, color contrast compliance
- 🚀 **High Performance** - 60 FPS animations, <3s load time, Lighthouse score ≥90
- 🎭 **Smooth Animations** - Scroll-based animations with Framer Motion
- 📋 **Multi-Step Booking Form** - Appointment scheduling with validation
- 💬 **Testimonials Carousel** - Auto-advancing carousel with manual controls
- 📊 **Timeline Component** - Experience and certifications timeline
- 🧪 **Comprehensive Testing** - Unit, integration, and accessibility tests

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, React Spring, Three.js
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript types
├── data/               # Sample data
├── test/               # Test setup
├── App.tsx             # Main component
└── index.css           # Global styles
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## Design System

### Colors
- White: `#FFFFFF`
- Soft Blue: `#E8F4F8`
- Teal Primary: `#00D4FF`
- Teal Dark: `#0099CC`
- Neon Green: `#00FF88`
- Dark Gray: `#1A1A1A`

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Accessibility

- ✅ WCAG 2.1 Level AA compliant
- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Color contrast ratios (4.5:1)
- ✅ Focus indicators
- ✅ Reduced motion support

## Performance

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Lighthouse Score: ≥ 90
- Animation Performance: 60 FPS

## Customization

Edit `src/data/sampleData.ts` to update:
- Doctor profile information
- About cards
- Experience and credentials
- Specializations
- Testimonials
- Contact information

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## License

MIT License

---

**Built with ❤️ for healthcare professionals**
