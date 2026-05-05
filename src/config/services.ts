import type { Service } from '@/types/service';
import { images } from '@/config/images';

export const services: Service[] = [
  {
    id: 1,
    slug: 'architectural-design',
    name: 'Architectural Design',
    headline: 'Buildings that endure and inspire.',
    description:
      'We deliver complete architectural design services from concept through construction documentation. Our designs balance functional efficiency, cultural context, and long-term sustainability. Every project begins with a deep study of site, climate, and the people who will inhabit the space.',
    heroImage: images.services.architecture,
    sortOrder: 1,
  },
  {
    id: 2,
    slug: 'engineering-services',
    name: 'Engineering Services',
    headline: 'Structural intelligence built in from day one.',
    description:
      'Our engineering team provides structural, civil, mechanical, and electrical engineering services. We work alongside architects and contractors to ensure every system performs reliably and efficiently throughout the building lifecycle.',
    heroImage: images.services.engineering,
    sortOrder: 2,
  },
  {
    id: 3,
    slug: 'research-consultancy',
    name: 'Research and Consultancy',
    headline: 'Evidence-based decisions for complex challenges.',
    description:
      'We conduct applied research and provide expert consultancy to governments, NGOs, and private developers. Our work spans feasibility studies, environmental assessments, policy analysis, and strategic planning for the built environment across East Africa.',
    heroImage: images.services.research,
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