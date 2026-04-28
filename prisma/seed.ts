import { PrismaClient, ProjectStatus, SessionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Categories
  const categories = await Promise.all([
    prisma.projectCategory.upsert({
      where: { slug: 'residential' },
      update: {},
      create: { name: 'Residential', slug: 'residential', description: 'Housing and residential developments' },
    }),
    prisma.projectCategory.upsert({
      where: { slug: 'commercial' },
      update: {},
      create: { name: 'Commercial', slug: 'commercial', description: 'Commercial and mixed-use buildings' },
    }),
    prisma.projectCategory.upsert({
      where: { slug: 'infrastructure' },
      update: {},
      create: { name: 'Infrastructure', slug: 'infrastructure', description: 'Roads, utilities, and public infrastructure' },
    }),
    prisma.projectCategory.upsert({
      where: { slug: 'institutional' },
      update: {},
      create: { name: 'Institutional', slug: 'institutional', description: 'Government and public sector buildings' },
    }),
  ]);

  // Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'architectural-design' },
      update: {},
      create: {
        slug: 'architectural-design',
        name: 'Architectural Design',
        headline: 'Buildings that endure and inspire.',
        description: 'We deliver complete architectural design services from concept through construction documentation. Our designs balance functional efficiency, cultural context, and long-term sustainability. Every project begins with a deep study of site, climate, and the people who will inhabit the space.',
        heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85',
        sortOrder: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'engineering-services' },
      update: {},
      create: {
        slug: 'engineering-services',
        name: 'Engineering Services',
        headline: 'Structural intelligence built in from day one.',
        description: 'Our engineering team provides structural, civil, mechanical, and electrical engineering services. We work alongside architects and contractors to ensure every system performs reliably and efficiently throughout the building lifecycle.',
        heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85',
        sortOrder: 2,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'research-consultancy' },
      update: {},
      create: {
        slug: 'research-consultancy',
        name: 'Research and Consultancy',
        headline: 'Evidence-based decisions for complex challenges.',
        description: 'We conduct applied research and provide expert consultancy to governments, NGOs, and private developers. Our work spans feasibility studies, environmental assessments, policy analysis, and strategic planning for the built environment across East Africa.',
        heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85',
        sortOrder: 3,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'training-capacity-building' },
      update: {},
      create: {
        slug: 'training-capacity-building',
        name: 'Training and Capacity Building',
        headline: 'Skills that transfer and multiply.',
        description: 'Our training programmes build technical and leadership capacity across the construction and development sectors. We run short courses, workshops, and professional development programmes for engineers, architects, project managers, and government officials.',
        heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=85',
        sortOrder: 4,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'project-supervision' },
      update: {},
      create: {
        slug: 'project-supervision',
        name: 'Project Supervision',
        headline: 'Quality enforced at every stage.',
        description: 'We provide independent project supervision and contract administration services. Our site teams monitor quality, track programme, manage costs, and resolve site issues before they escalate. Clients engage us when they need an expert pair of eyes on their construction investment.',
        heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
        sortOrder: 5,
      },
    }),
  ]);

  // Projects
  const projects = [
    {
      slug: 'aljazera-residency-south-c',
      title: 'Aljazera Residency',
      subtitle: 'Contemporary residential development in the heart of Nairobi',
      description: 'A premium residential development in South C, Nairobi, comprising 24 units across four floors. The design prioritises natural ventilation, generous living spaces, and a material palette that references East African architectural heritage while meeting contemporary standards. Completed in 2023.',
      status: ProjectStatus.PUBLISHED,
      featured: true,
      year: 2023,
      location: 'South C, Nairobi',
      client: 'Aljazera Properties Ltd',
      coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=85',
      heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85',
      categoryId: categories[0].id,
      serviceId: services[0].id,
    },
    {
      slug: 'speakers-residence-mandera',
      title: "Speaker's Residence",
      subtitle: 'Official residence for the Speaker of the Mandera County Assembly',
      description: 'Designed and supervised for the Mandera County Government, this official residence balances security requirements with a dignified architectural character appropriate for the county capital. The design incorporates passive cooling strategies suited to the hot, semi-arid Mandera climate. Completed in 2024.',
      status: ProjectStatus.PUBLISHED,
      featured: true,
      year: 2024,
      location: 'Mandera Town, Mandera County',
      client: 'Mandera County Government',
      coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85',
      categoryId: categories[3].id,
      serviceId: services[0].id,
    },
    {
      slug: 'takbir-service-station-thika',
      title: 'Takbir Service Station',
      subtitle: 'Full-service fuel and automotive complex on the Thika Superhighway',
      description: 'A modern fuel and service station on the Thika Superhighway corridor. The canopy structure draws on the geometry of traditional Swahili rooflines while incorporating high-performance steel and polycarbonate materials. Includes workshop bays, a convenience store, and a small quick-service restaurant. Completed in 2025.',
      status: ProjectStatus.PUBLISHED,
      featured: true,
      year: 2025,
      location: 'Thika Road, Kiambu County',
      client: 'Takbir Investments Ltd',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
      categoryId: categories[1].id,
      serviceId: services[0].id,
    },
    {
      slug: 'takbir-service-station-mandera',
      title: 'Takbir Service Station Mandera',
      subtitle: 'Fuel and service complex serving the Mandera commercial corridor',
      description: 'A sister project to the Thika station, this facility serves the busy commercial corridor in Mandera Town. The design adapts to the local climate with deep overhangs and cross-ventilated service bays. Completed in 2025.',
      status: ProjectStatus.PUBLISHED,
      featured: false,
      year: 2025,
      location: 'Mandera Town, Mandera County',
      client: 'Takbir Investments Ltd',
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=85',
      heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=85',
      categoryId: categories[1].id,
      serviceId: services[0].id,
    },
    {
      slug: 'nairobi-urban-housing-study',
      title: 'Nairobi Urban Housing Study',
      subtitle: 'Research into affordable housing models for peri-urban Nairobi',
      description: 'A 12-month applied research engagement commissioned by a development finance institution to analyse housing demand, supply gaps, and viable delivery models across six peri-urban Nairobi corridors. Output included a policy brief, a financial model, and design typologies for incremental housing.',
      status: ProjectStatus.PUBLISHED,
      featured: false,
      year: 2023,
      location: 'Nairobi Metropolitan Area',
      client: 'Development Finance Institution (Confidential)',
      coverImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=85',
      heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85',
      categoryId: categories[0].id,
      serviceId: services[2].id,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  // Project images
  const createdProjects = await prisma.project.findMany();
  for (const project of createdProjects) {
    const existingImages = await prisma.projectImage.count({ where: { projectId: project.id } });
    if (existingImages === 0) {
      await prisma.projectImage.createMany({
        data: [
          { projectId: project.id, url: project.coverImage, alt: project.title, isCover: true, sortOrder: 0 },
          { projectId: project.id, url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85', alt: `${project.title} interior`, sortOrder: 1 },
          { projectId: project.id, url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85', alt: `${project.title} detail`, sortOrder: 2 },
        ],
      });
    }
  }

  // Team
  await Promise.all([
    prisma.teamMember.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Eng. Abdirahman Hassan',
        role: 'Principal Architect and Managing Director',
        bio: 'Abdirahman founded Insight AfriResearch with a conviction that the built environment shapes human possibility. He holds a Masters in Architecture from the University of Nairobi and has spent 15 years designing across Kenya, Ethiopia, and Somalia. He leads every major project from concept through handover.',
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85',
        sortOrder: 1,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Arch. Fatuma Wanjiku',
        role: 'Head of Design',
        bio: 'Fatuma leads the design studio with a strong editorial eye and a rigorous attention to material and craft. She studied architecture at Strathmore University and completed a fellowship at the Africa Architecture Academy in Cape Town. Her work consistently earns recognition for its integration of climate-responsive design.',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85',
        sortOrder: 2,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Eng. David Muthoni',
        role: 'Senior Structural Engineer',
        bio: 'David brings 12 years of structural engineering expertise to the firm. He specialises in reinforced concrete, steel, and hybrid structural systems for both low-rise and mid-rise buildings in seismically active zones. He is a registered engineer with the Engineers Board of Kenya.',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85',
        sortOrder: 3,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Ms. Grace Otieno',
        role: 'Research and Consultancy Lead',
        bio: 'Grace leads the firm research and policy practice. She holds a PhD in Urban Planning from Kenyatta University and has produced research for the World Bank, UN-Habitat, and Kenya National Treasury. She brings rigorous academic methodology to practical development challenges.',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85',
        sortOrder: 4,
      },
    }),
  ]);

  // Training programs
  const program1 = await prisma.trainingProgram.upsert({
    where: { slug: 'construction-project-management' },
    update: {},
    create: {
      slug: 'construction-project-management',
      title: 'Construction Project Management',
      description: 'A practical five-day programme covering project planning, procurement, site supervision, quality control, and cost management. Designed for site engineers, project coordinators, and quantity surveyors who want to sharpen their project management skills.',
      duration: '5 days',
      targetGroup: 'Site Engineers, Project Coordinators, Quantity Surveyors',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    },
  });

  const program2 = await prisma.trainingProgram.upsert({
    where: { slug: 'building-inspection-certification' },
    update: {},
    create: {
      slug: 'building-inspection-certification',
      title: 'Building Inspection and Certification',
      description: 'A three-day certification course covering building codes, inspection methodologies, documentation, and compliance reporting under Kenyan law. Targeted at county government inspectors and private building surveyors.',
      duration: '3 days',
      targetGroup: 'County Building Inspectors, Building Surveyors',
      heroImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85',
    },
  });

  await prisma.trainingSession.createMany({
    data: [
      {
        programId: program1.id,
        startDate: new Date('2025-07-07'),
        endDate: new Date('2025-07-11'),
        location: 'Nairobi, Kenya',
        venue: 'Hughes Building Conference Room, Kenyatta Avenue',
        fee: 45000,
        currency: 'KES',
        capacity: 25,
        status: SessionStatus.OPEN,
      },
      {
        programId: program2.id,
        startDate: new Date('2025-07-21'),
        endDate: new Date('2025-07-23'),
        location: 'Nairobi, Kenya',
        venue: 'Hughes Building Conference Room, Kenyatta Avenue',
        fee: 28000,
        currency: 'KES',
        capacity: 20,
        status: SessionStatus.OPEN,
      },
    ],
    skipDuplicates: true,
  });

  // Site settings
  const settings = [
    { key: 'site_tagline', value: 'Design. Research. Training.' },
    { key: 'phone_main', value: '020 800 5000' },
    { key: 'phone_mobile', value: '0721 997 800' },
    { key: 'email', value: 'insightafri@gmail.com' },
    { key: 'address', value: '4th Floor, Hughes Building, Kenyatta Avenue, Nairobi, Kenya' },
    { key: 'map_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177!2d36.8228!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6d0f9b9b9%3A0x1234!2sHughes+Building%2C+Kenyatta+Ave%2C+Nairobi!5e0!3m2!1sen!2ske!4v1234567890' },
    { key: 'registration_number', value: 'BN/2018/034521' },
    { key: 'nca_registration', value: 'NCA/2018/1456' },
    { key: 'aak_membership', value: 'AAK/M/2018/0892' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
