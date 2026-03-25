/**
 * Page Mapping Configuration
 * Maps all navigation buttons and pages from the original index.html
 */

export interface PageConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  htmlFile?: string;
  category: string;
  icon: string;
  creditCost: number;
  externalUrl?: string;
  isExternal?: boolean;
}

export const PAGE_MAPPING: Record<string, PageConfig> = {
  // Core Pages
  'home': {
    id: 'home',
    name: 'Home',
    title: 'Home Dashboard',
    description: 'Main dashboard and quick access',
    category: 'core',
    icon: '🏠',
    creditCost: 0
  },

  // Medical AI Pages
  'medical-imaging': {
    id: 'medical-imaging',
    name: 'Medical Imaging AI',
    title: 'Medical Image Analysis',
    description: 'Advanced tumor segmentation with BRATS-AFRICA',
    htmlFile: 'index.html',
    category: 'medical-ai',
    icon: '🖼️',
    creditCost: 10
  },

  'nurse-ai': {
    id: 'nurse-ai',
    name: 'NurseAI',
    title: 'Nursing Support System',
    description: 'AI-powered nursing assistance and care coordination',
    htmlFile: 'NurseAI.html',
    category: 'medical-ai',
    icon: '👩‍⚕️',
    creditCost: 5
  },

  'medical-text-ai': {
    id: 'medical-text-ai',
    name: 'Medical Text AI',
    title: 'Medical Text Processing',
    description: 'Extract clinical insights from medical reports',
    category: 'medical-ai',
    icon: '📝',
    creditCost: 5
  },

  // Prediction & Analysis
  'quorum-deep': {
    id: 'quorum-deep',
    name: 'QuorumDeep',
    title: 'Prediction Models',
    description: 'Advanced prediction models for treatment optimization',
    htmlFile: 'QuorumDeep.html',
    category: 'prediction',
    icon: '🎯',
    creditCost: 15
  },

  'genomica': {
    id: 'genomica',
    name: 'Genomica',
    title: 'Genomics Analysis',
    description: 'Genomic data analysis and interpretation',
    htmlFile: 'Genomica.html',
    category: 'prediction',
    icon: '🧬',
    creditCost: 20
  },

  'k-emci': {
    id: 'k-emci',
    name: 'K-EMCI',
    title: 'Clinical Validation',
    description: 'Clinical validation and evidence integration',
    htmlFile: 'K-EMCI.html',
    category: 'prediction',
    icon: '✓',
    creditCost: 10
  },

  // Pandemic Intelligence
  'pandemic-intelligence': {
    id: 'pandemic-intelligence',
    name: 'Pandemic Intelligence',
    title: 'Pandemic Forecasting',
    description: 'Disease outbreak prediction and monitoring',
    htmlFile: 'pandemic intelligence.html',
    category: 'pandemic',
    icon: '📊',
    creditCost: 15
  },

  'pandemic-seird': {
    id: 'pandemic-seird',
    name: 'Pandemic SEIRD',
    title: 'SEIRD Model',
    description: 'Susceptible-Exposed-Infected-Recovered-Deceased model',
    htmlFile: 'pandemicseird1.html',
    category: 'pandemic',
    icon: '📈',
    creditCost: 10
  },

  'clinical-validation': {
    id: 'clinical-validation',
    name: 'Clinical Validation',
    title: 'Clinical Validation Workflow',
    description: 'Validate clinical findings and recommendations',
    htmlFile: 'clinValidAi.html',
    category: 'clinical',
    icon: '🔬',
    creditCost: 10
  },

  // AI Workflow Tools
  'chemworkbench': {
    id: 'chemworkbench',
    name: 'ChemWorkbench',
    title: 'Chemical Analysis',
    description: 'Chemical compound analysis and simulation',
    htmlFile: 'Chemworkbench.html',
    category: 'workflow',
    icon: '⚗️',
    creditCost: 15
  },

  'langflow': {
    id: 'langflow',
    name: 'LangFlow',
    title: 'AI Workflow Builder',
    description: 'Visual AI workflow and pipeline builder',
    htmlFile: 'langflowbuildersaas.html',
    category: 'workflow',
    icon: '🔗',
    creditCost: 5
  },

  'ai-langflow-microservice': {
    id: 'ai-langflow-microservice',
    name: 'AI LangFlow Microservice',
    title: 'AI Microservice',
    description: 'Streaming AI microservice architecture',
    htmlFile: 'Ailangflowmicroservice(streaming).html',
    category: 'workflow',
    icon: '🌐',
    creditCost: 10
  },

  // Data & Research
  'medical-research-databases': {
    id: 'medical-research-databases',
    name: 'Medical Research Databases',
    title: 'Research Data Access',
    description: 'Access medical research databases and datasets',
    category: 'research',
    icon: '📚',
    creditCost: 5
  },

  'data-analysis-tools': {
    id: 'data-analysis-tools',
    name: 'Data Analysis Tools',
    title: 'Advanced Analytics',
    description: 'Statistical and data analysis tools',
    category: 'research',
    icon: '📊',
    creditCost: 5
  },

  // Learning & Skills
  'tech-skills': {
    id: 'tech-skills',
    name: 'Tech Skills',
    title: 'Technology Training',
    description: 'Technical skills development and courses',
    htmlFile: 'techskills.html',
    category: 'learning',
    icon: '💻',
    creditCost: 0
  },

  'ai-courses': {
    id: 'ai-courses',
    name: 'AI Courses',
    title: 'AI Learning Paths',
    description: 'Curated AI and machine learning courses',
    category: 'learning',
    icon: '🎓',
    creditCost: 0
  },

  // Financial & Investment
  'kahiga-card': {
    id: 'kahiga-card',
    name: 'Kahiga Card',
    title: 'Kahiga Card Services',
    description: 'Digital health payment card',
    category: 'financial',
    icon: '💳',
    creditCost: 0
  },

  'health-bonds': {
    id: 'health-bonds',
    name: 'Health Bonds',
    title: 'Health Investment Bonds',
    description: 'Invest in healthcare initiatives',
    category: 'financial',
    icon: '📈',
    creditCost: 0
  },

  'emergency-pool': {
    id: 'emergency-pool',
    name: 'Emergency Pool',
    title: 'Emergency Care Fund',
    description: 'Emergency medical care funding pool',
    category: 'financial',
    icon: '🆘',
    creditCost: 0
  },

  // Additional Pages
  'about': {
    id: 'about',
    name: 'About',
    title: 'About juA.kali',
    description: 'Platform information and team',
    htmlFile: 'about.html',
    category: 'info',
    icon: 'ℹ️',
    creditCost: 0
  },

  'contact': {
    id: 'contact',
    name: 'Contact',
    title: 'Contact Us',
    description: 'Get in touch with our team',
    htmlFile: 'contact.html',
    category: 'info',
    icon: '📧',
    creditCost: 0
  },

  'consultation': {
    id: 'consultation',
    name: 'Consultation',
    title: 'Medical Consultation',
    description: 'Schedule medical consultations',
    htmlFile: 'contact.html',
    category: 'services',
    icon: '👨‍⚕️',
    creditCost: 20
  },

  // Additional AI Microservices
  'unified-ai-microservice': {
    id: 'unified-ai-microservice',
    name: 'Unified AI Microservice',
    title: 'Unified AI Platform',
    description: 'Integrated AI microservice platform',
    htmlFile: 'unifiedAImicroservicelang.html',
    category: 'workflow',
    icon: '🤖',
    creditCost: 10
  },

  'netstream': {
    id: 'netstream',
    name: 'NetStream',
    title: 'Network Streaming',
    description: 'Real-time data streaming and processing',
    htmlFile: 'netstreamfullstream.html',
    category: 'workflow',
    icon: '📡',
    creditCost: 5
  },

  'youtube-cdn': {
    id: 'youtube-cdn',
    name: 'YouTube CDN',
    title: 'Video Content Delivery',
    description: 'Video streaming and content delivery',
    htmlFile: 'youtubecdnlivepeer.html',
    category: 'media',
    icon: '🎥',
    creditCost: 0
  },

  'bput1-biosim': {
    id: 'bput1-biosim',
    name: 'BpuT1 BioSim',
    title: 'Biological Simulation',
    description: 'Biological process simulation',
    htmlFile: 'BpuT1-bioPUsim.html',
    category: 'simulation',
    icon: '🧪',
    creditCost: 15
  }
};

// Group pages by category
export const CATEGORIES = {
  'core': 'Core',
  'medical-ai': 'Medical AI',
  'prediction': 'Prediction & Analysis',
  'pandemic': 'Pandemic Intelligence',
  'clinical': 'Clinical Tools',
  'workflow': 'AI Workflows',
  'research': 'Research & Data',
  'learning': 'Learning & Skills',
  'financial': 'Financial Services',
  'services': 'Medical Services',
  'simulation': 'Simulation',
  'media': 'Media',
  'info': 'Information'
};

// Quick access buttons mapping
export const QUICK_ACCESS_BUTTONS: Record<string, string> = {
  'Analyze Medical Images': 'medical-imaging',
  'Process Medical Text': 'medical-text-ai',
  'Run Prediction Models': 'quorum-deep',
  'NurseAI': 'nurse-ai',
  'Genomica': 'genomica',
  'ChemWorkbench': 'chemworkbench',
  'Pandemic Intelligence': 'pandemic-intelligence',
  'Clinical Validation': 'clinical-validation',
  'Medical Research': 'medical-research-databases',
  'Tech Skills': 'tech-skills',
  'Kahiga Card': 'kahiga-card',
  'Health Bonds': 'health-bonds',
  'Emergency Pool': 'emergency-pool'
};

// Get page config by ID
export function getPageConfig(pageId: string): PageConfig | undefined {
  return PAGE_MAPPING[pageId];
}

// Get pages by category
export function getPagesByCategory(category: string): PageConfig[] {
  return Object.values(PAGE_MAPPING).filter(page => page.category === category);
}

// Get all pages
export function getAllPages(): PageConfig[] {
  return Object.values(PAGE_MAPPING);
}

// Get HTML file path for a page
export function getPageHtmlPath(pageId: string): string {
  const config = getPageConfig(pageId);
  if (!config) return '';
  return config.htmlFile ? `/public/${config.htmlFile}` : '';
}
