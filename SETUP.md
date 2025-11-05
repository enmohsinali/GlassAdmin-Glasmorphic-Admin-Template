# GlassAdmin - Setup & Running Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

### 1. Check if Node.js is installed
```bash
node --version
npm --version
```

If not installed, install Node.js:
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Navigate to project directory
```bash
cd GlassAdmin-Glasmorphic-Admin-Template
```

### 3. Install dependencies
```bash
npm install
# or if you prefer yarn
# yarn install
```

### 4. Run development server
```bash
npm run dev
# or
# yarn dev
```

The development server will start at `http://localhost:3000`

### 5. Open in browser
```bash
# Automatically opens in default browser
# Or manually visit: http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
GlassAdmin-Glasmorphic-Admin-Template/
├── index.html                 # Main landing page
├── package.json              # Dependencies & scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css     # Main styles
│   │   └── js/
│   │       ├── main.js      # Core JavaScript
│   │       ├── charts.js    # Chart configurations
│   │       └── ...
│   ├── components/
│   │   ├── ui/              # UI components (cards, buttons, forms, modals)
│   │   └── layout/          # Layout components (navigation)
│   ├── layouts/             # Page layouts
│   │   ├── base.html
│   │   └── sidebar-layout.html
│   └── pages/
│       ├── dashboard/       # Dashboard pages
│       │   ├── analytics.html
│       │   ├── ecommerce.html
│       │   └── crm.html
│       ├── auth/           # Authentication pages (coming soon)
│       ├── user/           # User management (coming soon)
│       └── product/        # Product management (coming soon)
└── public/                 # Static assets
```

## Viewing Different Pages

Once the server is running:

- **Landing Page**: http://localhost:3000/
- **Analytics Dashboard**: http://localhost:3000/src/pages/dashboard/analytics.html
- **E-commerce Dashboard**: http://localhost:3000/src/pages/dashboard/ecommerce.html
- **CRM Dashboard**: http://localhost:3000/src/pages/dashboard/crm.html
- **Sidebar Layout**: http://localhost:3000/src/layouts/sidebar-layout.html

## Features to Test

### 1. Theme Switching
- Click the moon/sun icon (bottom right) to toggle dark/light mode

### 2. Responsive Design
- Resize browser window to test mobile/tablet/desktop layouts
- Use browser DevTools (F12) to test different screen sizes

### 3. Interactive Components
- Navigation sidebar (click menu items)
- Charts (hover for tooltips)
- Stat cards with animations
- Modal popups (check components)

### 4. UI Components Library
Navigate to `/src/components/ui/` to see individual component examples:
- Cards: `/src/components/ui/cards.html`
- Buttons: `/src/components/ui/buttons.html`
- Forms: `/src/components/ui/forms.html`
- Modals: `/src/components/ui/modals.html`

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs sudo kill -9

# Or change port in vite.config.js
# server: { port: 3001 }
```

### Dependencies installation fails
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Module not found errors
```bash
# Ensure all dependencies are installed
npm install

# Check if specific module is missing
npm install [module-name]
```

## Building for Production

```bash
# Create production build
npm run build

# Output will be in /dist folder
# Preview production build
npm run preview
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6 support

## Development Tips

1. **Hot Module Replacement (HMR)**: Changes to CSS/JS will reload automatically
2. **Browser DevTools**: Press F12 to inspect elements and debug
3. **Console Logs**: Check browser console for any errors
4. **Network Tab**: Monitor API calls and resource loading

## Next Steps

- Explore the dashboard pages
- Test theme switching
- Check responsive behavior
- Review UI components
- Customize colors in `tailwind.config.js`

## Need Help?

- Check browser console for errors (F12)
- Verify all dependencies installed: `npm list`
- Ensure Node.js version: `node --version` (should be v16+)
- Clear browser cache if styles don't load

## Documentation

For detailed documentation on customization and component usage, refer to:
- Tailwind CSS: https://tailwindcss.com/docs
- Vite: https://vitejs.dev/guide/
- ApexCharts: https://apexcharts.com/docs/

---

**Current Status**: Phase 1 & Core Dashboards (Phase 2) Complete ✅
**Coming Soon**: Authentication pages, User management, Product pages, and more!
