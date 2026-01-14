🎯 Project Breakdown: Premium HDPE/LDPE Bottles Website
I'll break this down into small, manageable subtasks following MVC architecture principles in React.

📋 PHASE 1: Project Setup & Architecture
Task 1.1: Project Initialization

Create React app with Vite
Install dependencies (Tailwind CSS, Framer Motion, Lucide React)
Configure Tailwind with custom theme
Set up folder structure (MVC pattern)

Task 1.2: Folder Structure (MVC)
src/
├── models/           # Data models & constants
│   ├── productData.js
│   ├── statsData.js
│   └── valuesData.js
├── views/            # Components (UI Layer)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Excellence.jsx
│   │   ├── CoreValues.jsx
│   │   ├── ProductCollection.jsx
│   │   ├── Standards.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   └── shared/
│       ├── GlassCard.jsx
│       ├── AnimatedCounter.jsx
│       └── FloatingBlur.jsx
├── controllers/      # Logic & State Management
│   ├── useTheme.js
│   ├── useAnimations.js
│   └── useForm.js
├── styles/
│   └── index.css
└── App.jsx

📋 PHASE 2: Core Infrastructure
Task 2.1: Theme System (Model + Controller)

Create theme model (colors, gradients)
Build dark mode toggle hook
Set up theme context

Task 2.2: Animation System (Controller)

Create custom Framer Motion variants
Build scroll-triggered animations hook
Set up viewport observers

Task 2.3: Data Models

Create product data structure
Create stats data (15+, 300+, etc.)
Create core values data
Create navigation links


📋 PHASE 3: Shared Components (Views)
Task 3.1: GlassCard Component

Glassmorphism effect with backdrop-blur
Hover elevation animation
Gradient border option

Task 3.2: AnimatedCounter Component

Count-up animation on scroll
Customizable duration
Plus/K suffix support

Task 3.3: FloatingBlur Component

Animated gradient blur orbs
Random movement
Multiple color variants


📋 PHASE 4: Navigation (View + Controller)
Task 4.1: Navbar - Desktop

Sticky navbar with glassmorphism
Logo and navigation links
Hover underline slide animation
Dark mode toggle button

Task 4.2: Navbar - Mobile

Hamburger menu animation
Mobile menu with glass effect
Smooth open/close transitions

Task 4.3: Navbar - Scroll Behavior

Show/hide on scroll direction
Background opacity change
Smooth transitions


📋 PHASE 5: Hero Section (View)
Task 5.1: Hero Layout

Two-column responsive layout
Gradient text for heading
Floating blur background effects

Task 5.2: Hero Stats

Animated counter integration
Gradient background cards
Hover scale effects

Task 5.3: Hero Image

Product showcase image
Hover zoom + rotation effect
Glow effect around image


📋 PHASE 6: Excellence Section (View)
Task 6.1: Image Grid

4-image masonry layout
Staggered fade-in animations
Hover scale + lift effect

Task 6.2: Content Area

Gradient headings
Feature cards with icons
Glass card styling


📋 PHASE 7: Core Values Section (View)
Task 7.1: Values Cards

4 glass cards with icons
Hover elevation effect
Gradient icon backgrounds

Task 7.2: Layout

Responsive grid (4 cols → 2 → 1)
Fade-in on scroll
Stagger animation


📋 PHASE 8: Product Collection (View)
Task 8.1: Product Cards

Image + details layout
Glass card with gradient border
Hover zoom on image

Task 8.2: Carousel/Slider

Horizontal scroll
Navigation arrows
Smooth transitions

Task 8.3: Product Details Table

Specs table with glass styling
Hover row highlight
Responsive design


📋 PHASE 9: Standards Section (View)
Task 9.1: Content Layout

Left: Text with gradient heading
Right: Product image
Feature list with icons

Task 9.2: Animations

Fade-in from sides
Floating image effect
Icon pulse animations


📋 PHASE 10: Contact Form (View + Controller)
Task 10.1: Form UI

Glass input fields
Gradient submit button
Floating labels

Task 10.2: Form Logic (Controller)

Input validation hook
Form state management
Submit handler

Task 10.3: Form Animation

Input focus effects
Error shake animation
Success message


📋 PHASE 11: Footer (View)
Task 11.1: Footer Layout

Multi-column responsive grid
Company info, Quick Links, Credentials, Resources
Social media icons with hover effects

Task 11.2: Footer Styling

Glass effect background
Gradient dividers
Icon animations


📋 PHASE 12: Polish & Optimization
Task 12.1: Responsive Design

Mobile breakpoints (sm, md, lg, xl)
Touch-friendly interactions
Optimized images

Task 12.2: Performance

Lazy loading components
Image optimization
Animation performance

Task 12.3: Final Touches

Scroll to top button
Loading states
Micro-interactions polish


🎨 PHASE 13: Premium Features
Task 13.1: Page Transitions

Framer Motion page animations
Route change effects
Smooth navigation

Task 13.2: Advanced Interactions

Parallax scrolling sections
Cursor follow effects
Interactive gradients