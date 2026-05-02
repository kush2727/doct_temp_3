# Quick Start Guide

Get the Doctor Portfolio Website up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation (2 minutes)

```bash
# Navigate to project directory
cd doctor-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173` and you're done! 🎉

## What You Get

A fully functional, production-ready doctor portfolio website with:

- ✨ Animated 3D hero section
- 📱 Fully responsive design
- 🎭 Smooth scroll animations
- 📋 Multi-step appointment booking form
- 💬 Testimonials carousel
- ♿ WCAG AA accessibility
- 🚀 High performance (60 FPS)

## Customization (5 minutes)

### 1. Update Doctor Profile

Edit `src/data/sampleData.ts`:

```typescript
export const sampleDoctorProfile: DoctorProfile = {
  name: 'Your Name',
  specialization: 'Your Specialty',
  profileImage: 'your-image-url',
  // ... update other fields
}
```

### 2. Change Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  'teal-primary': '#00D4FF',  // Change this
  'soft-blue': '#E8F4F8',     // And this
  // ... other colors
}
```

### 3. Update Navigation

Edit `src/data/sampleData.ts`:

```typescript
export const navigationSections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  // ... add or remove sections
]
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The optimized build will be in the `dist/` directory.

## Deployment (Choose One)

### Option 1: Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git push
```

See `DEPLOYMENT.md` for more options.

## Testing

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Check test coverage
npm run test:coverage
```

## Linting

```bash
# Check code quality
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks
├── utils/              # Utilities
├── types/              # TypeScript types
├── data/               # Sample data
└── App.tsx             # Main component
```

## Key Files to Edit

1. **Doctor Profile**: `src/data/sampleData.ts`
2. **Colors**: `tailwind.config.js`
3. **Animations**: `src/utils/animations.ts`
4. **Components**: `src/components/`

## Common Tasks

### Add a New Section

1. Create component in `src/components/`
2. Import in `src/App.tsx`
3. Add to navigation in `src/data/sampleData.ts`

### Change Fonts

Edit `tailwind.config.js`:

```javascript
fontFamily: {
  primary: ['Your Font', 'sans-serif'],
}
```

### Modify Animation Speed

Edit `src/utils/animations.ts`:

```typescript
transition: { duration: 0.6 } // Change duration
```

### Add New Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'your-color': '#HEXCODE',
}
```

## Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Styles Not Applying
```bash
# Rebuild Tailwind CSS
npm run build
```

## Performance Tips

1. **Optimize Images**: Use WebP format with JPEG fallback
2. **Lazy Load**: Images below fold load on scroll
3. **Code Split**: Separate bundles for large libraries
4. **Monitor**: Use Lighthouse to check performance

## Accessibility

The site is WCAG 2.1 Level AA compliant:
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast verified
- ✅ Focus indicators

Test with:
```bash
# Run accessibility tests
npm run test -- accessibility
```

## Next Steps

1. ✅ Customize doctor profile
2. ✅ Update colors and fonts
3. ✅ Add real images
4. ✅ Test on mobile
5. ✅ Deploy to production

## Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Three.js**: https://threejs.org

## Support

- Check `README_NEW.md` for detailed documentation
- See `DEPLOYMENT.md` for deployment help
- Review `PROJECT_SUMMARY.md` for complete overview

## Tips & Tricks

### Hot Module Replacement (HMR)
Changes are automatically reflected in the browser during development.

### TypeScript
Full TypeScript support with strict mode enabled.

### Responsive Design
Test responsive design with browser DevTools (F12 → Toggle device toolbar).

### Dark Mode
Tailwind CSS supports dark mode - add `dark:` prefix to classes.

---

**You're all set! Happy coding! 🚀**

For more help, see the full documentation in `README_NEW.md`
