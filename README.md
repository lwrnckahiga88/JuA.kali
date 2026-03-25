# juA.kali Innovation Platform PWA

Advanced Medical AI Platform with Progressive Web App capabilities, featuring BRATS-AFRICA tumor segmentation, UNet++ deep learning, Gemini Vision API integration, and agentic pipeline orchestration.

## Features

### Core Capabilities
- **Medical Image Analysis**: Advanced tumor segmentation with BRATS-AFRICA dataset and UNet++ architecture
- **Multi-Modal AI**: Gemini Vision API for comprehensive image understanding
- **Agentic Pipeline**: 8-stage orchestration with multi-agent collaboration
- **Treatment Optimization**: DQN reinforcement learning for personalized recommendations
- **Clinical Decision Support**: Evidence-based treatment planning
- **Healthcare Interoperability**: FHIR R4 compliant reporting

### PWA Features
- **Offline Functionality**: Service workers enable offline access
- **Install to Home Screen**: Native app-like experience on mobile
- **Local Data Storage**: IndexedDB for persistent offline data
- **Background Sync**: Automatic sync when connection restored
- **Push Notifications**: Real-time alerts and updates
- **Fast Loading**: Optimized caching and performance

### Pages & Modules (45+)
- Medical AI: NurseAI, Medical Imaging, Genomica, K-EMCI
- Prediction Models: QuorumDeep, Clinical Validation
- Pandemic Intelligence: SEIRD models, forecasting
- AI Workflows: LangFlow, ChemWorkbench, Microservices
- Research & Data: Medical databases, analytics tools
- Learning: Tech skills, AI courses
- Financial: Kahiga Card, Health Bonds, Emergency Pool
- And many more...

## Technology Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **State Management**: React Context + Local Storage + IndexedDB
- **PWA**: Service Workers, Web App Manifest
- **Build**: Vite + esbuild
- **Server**: Express.js
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

## Project Structure

```
juakali-pwa/
├── client/
│   ├── public/              # Static assets
│   │   ├── manifest.json   # PWA manifest
│   │   ├── sw.js           # Service worker
│   │   ├── offline.html    # Offline fallback
│   │   └── *.html          # All 45+ HTML pages
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utilities
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/
│   └── index.ts            # Express server
├── public/                 # All HTML pages from repo
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Navigation

### Main Tabs
- **Home**: Dashboard with quick access to key features
- **All Pages**: Dropdown menu with 45+ pages organized by category

### Categories
- **Medical AI**: Image analysis, nursing support, genomics
- **Prediction & Analysis**: QuorumDeep, clinical validation
- **Pandemic Intelligence**: Disease forecasting and monitoring
- **AI Workflows**: LangFlow, ChemWorkbench, microservices
- **Research & Data**: Medical databases, analytics
- **Learning**: Tech skills, AI courses
- **Financial Services**: Kahiga Card, health bonds, emergency pool
- **Information**: About, contact, team

## Credit System

Each feature has a credit cost:
- **Image Analysis**: 10 credits
- **Text Processing**: 5 credits
- **Prediction Models**: 15 credits
- **Genomica**: 20 credits
- **Consultation**: 20 credits
- **Free Features**: 0 credits

Starting credits: 100 (Free tier)

## PWA Installation

### On Desktop
1. Click the install button in the browser
2. Or use browser menu → "Install app"

### On Mobile
1. Open in Chrome/Edge
2. Tap menu → "Install app" or "Add to Home Screen"
3. App will be installed with offline access

## Offline Features

When offline, you can:
- View cached pages and data
- Access local storage
- Review previous analyses
- Read saved documents
- Automatic sync when back online

## API Integration

The platform integrates with:
- **Gemini Vision API**: Multi-modal image analysis
- **ONNX Runtime**: Local ML model execution
- **Transformers.js**: Local NLP processing
- **Paystack/Stripe**: Payment processing

## Development

### Add New Page

1. Add page to `pageMapping.ts`:
```typescript
'new-page': {
  id: 'new-page',
  name: 'New Page',
  title: 'Page Title',
  description: 'Description',
  htmlFile: 'new-page.html',
  category: 'category-name',
  icon: '🎯',
  creditCost: 10
}
```

2. Place HTML file in `public/` directory
3. Page automatically appears in navigation

### Customize Styling

Edit `client/src/index.css` to modify:
- Color scheme
- Typography
- Spacing
- Animations

## Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Offline Support**: Full functionality
- **Cache Strategy**: Network-first for APIs, cache-first for assets

## Security

- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: Enforced in production
- **CORS**: Properly configured
- **Input Validation**: All user inputs validated
- **Data Encryption**: Sensitive data encrypted at rest

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests:
- GitHub Issues: [project-repo]/issues
- Email: support@juakali.ai
- Documentation: https://docs.juakali.ai

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (iOS/Android)
- [ ] API marketplace
- [ ] Custom model training
- [ ] Enterprise SSO
- [ ] Advanced reporting

---

**juA.kali Innovation Platform** - Advancing Healthcare with AI
