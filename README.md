# Ridge Web Components Library 🚧

> **⚠️ MVP STATUS**: This is an early-stage MVP (Minimum Viable Product) setup of the Ridge web components library. The current implementation includes basic functionality and serves as a foundation for future development. Full functionality and comprehensive component library coming soon!

A modern web component library built with [Lit](https://lit.dev/) and TypeScript, designed to provide reusable, accessible UI components for modern web applications.

## 🚀 Current MVP Features

### ✅ What's Working Now
- **Button Component**: Fully functional button component with multiple variants and states
- **Input Component**: Text, password, and email inputs with validation and icons
- **Dropdown Component**: Select dropdown with multi-select, search, and customization options
- **TypeScript Support**: Full type safety and IntelliSense support
- **Storybook Integration**: Interactive component documentation and testing
- **Build System**: Vite-powered build with UMD and ES module outputs
- **Development Environment**: Hot reload and development server
- **Documentation Site**: Next.js-powered documentation with search functionality

### 🎯 Button Component Features
- **5 Variants**: Primary, Secondary, Outline, Ghost, Danger
- **3 Sizes**: Small, Medium, Large
- **Interactive States**: Hover, active, disabled, loading
- **Accessibility**: ARIA attributes and keyboard navigation
- **Link Support**: Can render as anchor tags with href
- **Custom Events**: Dispatches `button-click` events
- **Visual Effects**: Ripple animation and loading spinner

## 📦 Installation & Usage

### Installation
```bash
npm install ridge-ui
```

### Basic Usage
```html
<!-- Import the component -->
<script type="module">
  import 'ridge-ui';
</script>

<!-- Use in your HTML -->
<rdg-button variant="primary" size="medium">
  Click me!
</rdg-button>
```

### TypeScript Usage
```typescript
import { RdgButton } from 'ridge-ui';
import type { ButtonVariant, ButtonSize } from 'ridge-ui';

// Create programmatically
const button = document.createElement('rdg-button') as RdgButton;
button.variant = 'primary';
button.size = 'large';
button.textContent = 'Dynamic Button';
```

## 🛠 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/billymcdowell/ridge-ui.git
cd ridge-ui

# Install dependencies
npm install

# Start library development
npm run lib:build

# Launch Storybook for component development
npm run storybook:dev
```

### Available Scripts
- `npm run lib:build` - Build library for production
- `npm run lib:preview` - Preview production build
- `npm run storybook:dev` - Launch Storybook development server
- `npm run storybook:build` - Build Storybook for deployment
- `npm run docs:dev` - Start documentation development server
- `npm run docs:build` - Build documentation site
- `npm run docs:preview` - Preview documentation site

## 🎨 Component Examples

### Button Variants
```html
<rdg-button variant="primary">Primary</rdg-button>
<rdg-button variant="secondary">Secondary</rdg-button>
<rdg-button variant="outline">Outline</rdg-button>
<rdg-button variant="ghost">Ghost</rdg-button>
<rdg-button variant="danger">Danger</rdg-button>
```

### Button States
```html
<rdg-button disabled>Disabled</rdg-button>
<rdg-button loading>Loading...</rdg-button>
<rdg-button href="https://example.com">Link Button</rdg-button>
```

### Input Components
```html
<!-- Basic text input -->
<rdg-input 
  label="Full Name" 
  placeholder="Enter your name" 
  variant="outlined"
  size="medium">
</rdg-input>

<!-- Password input with validation -->
<rdg-input 
  type="password" 
  label="Password" 
  required
  error-message="Password is required">
</rdg-input>

<!-- Email input with icons -->
<rdg-input 
  type="email" 
  label="Email" 
  leading-icon="📧"
  variant="filled">
</rdg-input>
```

### Dropdown Components
```html
<!-- Basic dropdown -->
<rdg-dropdown 
  placeholder="Select an option..."
  variant="primary"
  size="medium">
</rdg-dropdown>

<!-- Multi-select dropdown with search -->
<rdg-dropdown 
  placeholder="Choose multiple..."
  multiselect
  searchable
  clearable
  variant="outlined">
</rdg-dropdown>

<!-- Dropdown with custom styling -->
<rdg-dropdown 
  variant="outline"
  size="large"
  search-placeholder="Type to filter...">
</rdg-dropdown>
```

## 🚧 Roadmap & Coming Features

### 🔄 Phase 1 (Current MVP)
- [x] Button component with variants and states
- [x] TypeScript definitions
- [x] Storybook documentation
- [x] Basic build system

### 📋 Phase 2 (Current Progress)
- [x] Input components (text, email, password, etc.)
- [x] Select/Dropdown component with multi-select and search
- [ ] Form validation utilities
- [ ] Checkbox and Radio components
- [ ] Comprehensive testing suite

### 🎯 Phase 3 (Future Releases)
- [ ] Layout components (Grid, Flex, Container)
- [ ] Navigation components (Navbar, Breadcrumbs, Pagination)
- [ ] Feedback components (Alert, Toast, Modal)
- [ ] Data display components (Table, Card, Badge)
- [ ] Advanced components (Datepicker, Autocomplete, Charts)

### 🎨 Design System Features
- [ ] CSS custom properties for theming
- [ ] Dark/light mode support
- [ ] Design tokens integration
- [ ] Responsive design utilities
- [ ] Animation system

### 🔧 Developer Experience
- [ ] CLI for component generation
- [ ] Figma design kit integration
- [ ] Comprehensive documentation site
- [ ] Migration guides
- [ ] Performance optimization

## 🏗 Architecture

### Current Structure
```
ridge-ui/
├── src/
│   ├── components/
│   │   ├── button/           # Button component
│   │   ├── input/            # Input component
│   │   └── dropdown/         # Dropdown component
│   └── index.ts              # Main entry point
├── docs/                     # Next.js documentation site
├── dist/                     # Built library files
├── .storybook/               # Storybook configuration
└── package.json              # Package configuration
```

### Technology Stack
- **Framework**: [Lit](https://lit.dev/) - Lightweight web components
- **Language**: TypeScript for type safety
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and building
- **Documentation**: [Storybook](https://storybook.js.org/) for component stories
- **Styling**: CSS-in-JS with Lit's `css` template

## 🤝 Contributing

This project is in active development! We welcome contributions, feedback, and suggestions.

### Current Contribution Areas
- Bug fixes and improvements to existing components
- Accessibility enhancements
- Documentation improvements
- Test coverage expansion
- New component proposals (for future phases)

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Storybook
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: https://github.com/billymcdowell/ridge-ui
- **Issues**: https://github.com/billymcdowell/ridge-ui/issues
- **Storybook**: [Interactive Component Documentation](https://billymcdowell.github.io/ridge-ui/storybook)
- **NPM Package**: [Coming soon - published package]

---

**Note**: Ridge is currently in MVP development phase. APIs may change between versions until we reach v1.0. We recommend using this library for experimentation and feedback rather than production applications at this time.

*Built with ❤️ using modern web standards*
