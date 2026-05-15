import type { Service } from '@/types/service';
import { images } from '@/config/images';

export const services: Service[] = [
{
    id: 1,
    slug: 'human-resource-management',
    name: 'Human Resource Management',
    headline: 'People strategy that drives organisational performance.',
    description: 'We support organisations across East Africa with HR consulting, workforce planning, job evaluation, staff training, and institutional capacity assessments...',
    heroImage: images.services.hrmanagement, // swap image later
    sortOrder: 1,
  },
  {
    id: 2,
    slug: 'research-consultancy',
    name: 'Research and Consultancy',
    headline: 'Evidence-based decisions for complex challenges.',
    description: '...',
    heroImage: images.services.research,
    sortOrder: 2,
  },
  {
    id: 3,
    slug: 'architectural-design',
    name: 'Architectural Design',
    headline: 'Buildings that endure and inspire.',
    description: '...',
    heroImage: images.services.architecture,
    sortOrder: 3,
  },
  {
    id: 4,
    slug: 'training-capacity-building',
    name: 'Training and Capacity Building',
    headline: 'Skills that transfer and multiply.',
    description:
      'Our training programmes build technical and leadership capacity across the construction and development sectors. We run short courses, workshops, and professional development programmes for engineers, architects, project managers, and government officials.',
    heroImage: images.services.training,
    sortOrder: 4,
  },
  {
    id: 5,
    slug: 'project-supervision',
    name: 'Project Supervision',
    headline: 'Quality enforced at every stage.',
    description:
      'We provide independent project supervision and contract administration services. Our site teams monitor quality, track programme, manage costs, and resolve site issues before they escalate. Clients engage us when they need an expert pair of eyes on their construction investment.',
    heroImage: images.services.supervision,
    sortOrder: 5,
  },
];

export function getServiceById(id: number): Service | undefined {
  return services.find((s) => s.id === id);
}