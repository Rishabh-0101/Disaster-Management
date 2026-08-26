// Demo / placeholder data shown for illustration purposes only.
// Replace with live data from your services layer (Supabase) once connected.

export const HOME_STATS = {
  problemsReported: 4821,
  resolved: 1904,
  institutionsEngaged: 69,
};

export const IMPACT_STATS = {
  peopleBenefited: 12500,
  villagesCovered: 8,
  institutions: 69,
  costSavedLabel: 'Rs. 45.00 L',
  studentsInvolved: 3120,
  patentsFiled: 7,
  startupsCreated: 11,
};

export const LIVE_FEED = [
  {
    id: 'JH-2026-000482',
    title: 'Road caved in near Hatia bridge after rain',
    location: 'Ranchi, Jharkhand',
    status: 'in_progress' as const,
  },
  {
    id: 'JH-2026-000511',
    title: 'No safe drinking water in Simdega tribal hamlet',
    location: 'Simdega, Jharkhand',
    status: 'assigned' as const,
  },
  {
    id: 'JH-2026-000398',
    title: 'Overflowing drains near Deoghar bus stand',
    location: 'Deoghar, Jharkhand',
    status: 'resolved' as const,
  },
];

export const CHALLENGES = [
  {
    id: 'c1',
    title: 'Flood',
    description: 'Flood',
    location: 'Sonbhadra, Uttar Pradesh',
    date: '21 Aug 2026',
    affected: 4,
    priority: 'High' as const,
    status: 'submitted' as const,
    tags: ['Roads'],
    matchScore: 92,
  },
  {
    id: 'c2',
    title: 'Drinking water contamination in village',
    description:
      'The hand pump in our village gives contaminated water. Many people including children are falling sick with diarrhea and stomach infections.',
    location: 'Patna, Bihar',
    date: '22 Aug 2026',
    affected: 4500,
    priority: 'Critical' as const,
    status: 'routed' as const,
    tags: ['Water Management'],
    matchScore: 34,
  },
  {
    id: 'c3',
    title: 'Government school lacks functional science lab',
    description: 'Students are unable to perform practicals for their board exams.',
    location: 'Gumla, Jharkhand',
    date: '18 Aug 2026',
    affected: 210,
    priority: 'Medium' as const,
    status: 'solution_proposed' as const,
    tags: ['Education'],
    matchScore: 78,
  },
];

export const IMPACT_STORIES = [
  {
    id: 's1',
    title: 'Flood Early Warning System Saves Lives',
    location: 'Jharkhand',
    date: '15 Jun 2026',
    summary:
      'IoT-based flood monitoring sensors installed along the river. System provides 48-hour advance warning to 8 villages, enabling evacuation and preventing school closures during monsoon.',
    people: 12500,
    villages: 8,
    costSaved: 'Rs. 45.00 L',
  },
  {
    id: 's2',
    title: 'Mobile Health Clinic Reaches 15 Villages',
    location: 'Jharkhand',
    date: '20 May 2026',
    summary:
      'Mobile clinic equipped with IoT diagnostics and telemedicine connects 15 remote villages to specialist doctors. Serves 500+ patients per week.',
    people: 15000,
    villages: 15,
    costSaved: 'Rs. 80.00 L',
  },
  {
    id: 's3',
    title: 'Solar Micro-Grid Powers Village',
    location: 'Latehar, Jharkhand',
    date: '10 Apr 2026',
    summary:
      'Solar micro-grid with battery storage provides 24/7 electricity to 3 villages. Students can study in the evening and small businesses operate without interruption.',
    people: 8000,
    villages: 3,
    costSaved: 'Rs. 26.00 L',
  },
  {
    id: 's4',
    title: 'Smart Waste Collection System',
    location: 'Ranchi, Jharkhand',
    date: '02 Mar 2026',
    summary:
      'IoT sensors in waste bins alert collection trucks when bins are full. Collection frequency improved from bi-weekly to daily. Health hazards reduced significantly.',
    people: 8000,
    villages: 0,
    costSaved: 'Rs. 24.00 L',
  },
];

export const UNIVERSITIES = [
  {
    id: 'u1',
    name: 'Birla Institute of Technology, Mesra',
    location: 'Ranchi, Jharkhand',
    departments: ['Civil Engineering', 'Computer Science', 'Electrical Engineering', 'Environmental Engineering', 'Mechanical Engineering'],
    expertise: ['GIS', 'Hydrology', 'AI', 'Disaster Management', 'Structural Engineering', 'Renewable Energy'],
    labs: ['GIS Lab', 'Hydrology Lab', 'IoT Lab', 'Structural Testing Lab'],
    email: 'research@bitmesra.ac.in',
  },
  {
    id: 'u2',
    name: 'Indian Institute of Technology (ISM) Dhanbad',
    location: 'Dhanbad, Jharkhand',
    departments: ['Civil Engineering', 'Mining Engineering', 'Computer Science', 'Environmental Engineering', 'Electrical Engineering'],
    expertise: ['Mining Safety', 'AI', 'Remote Sensing', 'Water Resources'],
    labs: ['Mining Simulation Lab', 'Remote Sensing Lab'],
    email: 'research@iitism.ac.in',
  },
];

export const INDUSTRY_PARTNERS = [
  {
    id: 'i1',
    name: 'Tata Consultancy Services',
    sector: 'IT & Software',
    capabilities: ['Software', 'Cloud', 'AI', 'IoT', 'Mentorship'],
    email: 'csr@tcs.com',
  },
  {
    id: 'i2',
    name: 'Tata Steel',
    sector: 'Manufacturing',
    capabilities: ['Hardware', 'Manufacturing', 'Funding', 'Mentorship', 'CSR Support'],
    email: 'csr@tatasteel.com',
  },
  {
    id: 'i3',
    name: 'Wipro',
    sector: 'IT & Software',
    capabilities: ['Software', 'Cloud', 'AI', 'IoT', 'Mentorship', 'Funding'],
    email: 'csr@wipro.com',
  },
];

// Additional universities and industry partners (expanded network).
export const MORE_UNIVERSITIES = [
  {
    id: 'u3',
    name: 'National Institute of Technology (NIT) Jamshedpur',
    location: 'Jamshedpur, Jharkhand',
    departments: ['Mechanical Engineering', 'Computer Science', 'Production Engineering', 'Metallurgy'],
    expertise: ['Manufacturing', 'AI', 'Materials Science', 'Robotics'],
    labs: ['Robotics Lab', 'Materials Testing Lab'],
    email: 'research@nitjsr.ac.in',
  },
  {
    id: 'u4',
    name: 'Ranchi University',
    location: 'Ranchi, Jharkhand',
    departments: ['Environmental Science', 'Social Work', 'Public Health', 'Geography'],
    expertise: ['Rural Development', 'Public Health', 'GIS'],
    labs: ['GIS & Remote Sensing Lab'],
    email: 'research@ranchiuniversity.ac.in',
  },
  {
    id: 'u5',
    name: 'Indian Institute of Technology (IIT) Delhi',
    location: 'New Delhi',
    departments: ['Civil Engineering', 'Computer Science', 'Energy Studies', 'Biomedical Engineering'],
    expertise: ['AI', 'Renewable Energy', 'Water Resources', 'Public Policy'],
    labs: ['Energy Systems Lab', 'AI Research Lab'],
    email: 'research@iitd.ac.in',
  },
  {
    id: 'u6',
    name: 'Indian Institute of Science (IISc) Bengaluru',
    location: 'Bengaluru, Karnataka',
    departments: ['Aerospace Engineering', 'Computer Science', 'Environmental Engineering'],
    expertise: ['AI', 'Climate Science', 'Robotics', 'Disaster Management'],
    labs: ['Climate Modeling Lab', 'Robotics Lab'],
    email: 'research@iisc.ac.in',
  },
  {
    id: 'u7',
    name: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    departments: ['Civil Engineering', 'Information Technology', 'Agricultural Engineering'],
    expertise: ['Water Management', 'IoT', 'Smart Agriculture'],
    labs: ['IoT Lab', 'Hydraulics Lab'],
    email: 'research@annauniv.edu',
  },
  {
    id: 'u8',
    name: 'Banaras Hindu University (BHU)',
    location: 'Varanasi, Uttar Pradesh',
    departments: ['Agricultural Science', 'Medicine', 'Environmental Science'],
    expertise: ['Public Health', 'Sustainable Agriculture', 'River Conservation'],
    labs: ['Agri-Biotech Lab', 'Environmental Chemistry Lab'],
    email: 'research@bhu.ac.in',
  },
  {
    id: 'u9',
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    departments: ['Civil Engineering', 'Power Engineering', 'Construction Engineering'],
    expertise: ['Flood Management', 'Urban Planning', 'Structural Engineering'],
    labs: ['Structural Testing Lab', 'Urban Planning Studio'],
    email: 'research@jadavpuruniversity.in',
  },
  {
    id: 'u10',
    name: 'Panjab University',
    location: 'Chandigarh',
    departments: ['Biotechnology', 'Computer Science', 'Public Administration'],
    expertise: ['Healthcare Tech', 'Governance', 'Data Science'],
    labs: ['Biotech Research Lab', 'Data Science Lab'],
    email: 'research@pu.ac.in',
  },
];

export const MORE_INDUSTRY_PARTNERS = [
  {
    id: 'i4',
    name: 'Infosys',
    sector: 'IT & Software',
    capabilities: ['Software', 'Cloud', 'AI', 'Digital Skilling', 'CSR Support'],
    email: 'csr@infosys.com',
  },
  {
    id: 'i5',
    name: 'Reliance Foundation',
    sector: 'Conglomerate / CSR',
    capabilities: ['Funding', 'Healthcare', 'Rural Development', 'CSR Support'],
    email: 'contact@reliancefoundation.org',
  },
  {
    id: 'i6',
    name: 'Larsen & Toubro (L&T)',
    sector: 'Infrastructure & Construction',
    capabilities: ['Hardware', 'Infrastructure', 'Engineering', 'Funding'],
    email: 'csr@larsentoubro.com',
  },
  {
    id: 'i7',
    name: 'Mahindra Group',
    sector: 'Manufacturing & Mobility',
    capabilities: ['Manufacturing', 'Renewable Energy', 'Mentorship', 'Funding'],
    email: 'csr@mahindra.com',
  },
];

// Combined lists used across the app (base + expanded network).
export const ALL_UNIVERSITIES = [...UNIVERSITIES, ...MORE_UNIVERSITIES];
export const ALL_INDUSTRY_PARTNERS = [...INDUSTRY_PARTNERS, ...MORE_INDUSTRY_PARTNERS];
