# Portfolio Website

A modern, responsive portfolio inspired by [danielvaszka.com](https://www.danielvaszka.com/), built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** – build tool
- **Tailwind CSS** – styling
- **Framer Motion** – animations
- **React Intersection Observer** – scroll-triggered effects
- **GSAP** – available for advanced scroll/parallax
- **Lucide React** – icons

## Getting Started

1. **Install dependencies** (requires Node.js and npm):

   ```bash
   npm install
   ```

2. **Run the dev server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:

   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/     # Hero, About, Services, Portfolio, Contact, Footer, Navigation
├── components/ui/  # Button, Card, AnimatedSection
├── hooks/          # useScrollProgress, useMediaQuery
├── utils/          # animations
├── styles/         # globals.css
├── App.tsx
└── main.tsx
```

## Customization

- **Name & copy**: Update "Your Name" and bio in `Hero.tsx` and `About.tsx`.
- **Projects**: Edit the `projects` array in `Portfolio.tsx` (titles, images, links).
- **Services**: Edit the `services` array in `Services.tsx`.
- **Contact**: Change email in `Contact.tsx` and social links in `Footer.tsx`.
- **Colors**: Adjust `tailwind.config.js` and `src/styles/globals.css` (CSS variables).

## Responsive Breakpoints

- Mobile: default
- Tablet: 768px (`md`)
- Desktop: 1024px (`lg`)
- Large: 1280px (`xl`)

## Accessibility & Performance

- Respects `prefers-reduced-motion`.
- Touch-friendly targets (min 44×44px).
- Semantic HTML and ARIA where needed.
- Lazy-loaded images in the portfolio section.
