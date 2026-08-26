export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'healthcare', label: 'Healthcare', icon: 'HeartPulse' },
  { id: 'agriculture', label: 'Agriculture', icon: 'Wheat' },
  { id: 'water', label: 'Water Management', icon: 'Droplets' },
  { id: 'sanitation', label: 'Sanitation', icon: 'Trash2' },
  { id: 'environment', label: 'Environment', icon: 'Leaf' },
  { id: 'climate', label: 'Climate', icon: 'CloudRain' },
  { id: 'flood', label: 'Flood', icon: 'Waves' },
  { id: 'drought', label: 'Drought', icon: 'Sun' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'Building2' },
  { id: 'roads', label: 'Roads & Transport', icon: 'Bus' },
  { id: 'energy', label: 'Energy & Power', icon: 'Zap' },
  { id: 'safety', label: 'Public Safety', icon: 'ShieldAlert' },
  { id: 'women_safety', label: "Women's Safety", icon: 'ShieldCheck' },
  { id: 'child_welfare', label: 'Child Welfare', icon: 'Baby' },
  { id: 'employment', label: 'Employment & Skills', icon: 'Briefcase' },
  { id: 'housing', label: 'Housing', icon: 'Home' },
  { id: 'digital', label: 'Digital Connectivity', icon: 'Wifi' },
  { id: 'disaster', label: 'Disaster Management', icon: 'AlertTriangle' },
  { id: 'wildlife', label: 'Wildlife & Forests', icon: 'Trees' },
  { id: 'pollution', label: 'Pollution Control', icon: 'Factory' },
  { id: 'elderly', label: 'Elderly Care', icon: 'Users' },
  { id: 'disability', label: 'Accessibility', icon: 'Accessibility' },
  { id: 'governance', label: 'Governance & Corruption', icon: 'Landmark' },
];

export default CATEGORIES;
