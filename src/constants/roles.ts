export type UserRole = 'citizen' | 'university' | 'industry' | 'government' | 'admin';

export const ROLES: { id: UserRole; label: string; description: string }[] = [
  { id: 'citizen', label: 'Citizen', description: 'Report problems in your community' },
  { id: 'university', label: 'University', description: 'Accept challenges and build solutions' },
  { id: 'industry', label: 'Industry Partner', description: 'Support solutions with resources & expertise' },
  { id: 'government', label: 'Government', description: 'Oversee, fund and enable implementation' },
];

export default ROLES;
