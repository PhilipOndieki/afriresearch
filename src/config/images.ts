// Central registry for all Unsplash images.
// To swap to a real CDN, update the BASE and each URL here — no other files change.

const BASE = 'https://images.unsplash.com';

const q = (path: string, w = 1600, quality = 85) =>
  `${BASE}${path}?w=${w}&q=${quality}&auto=format&fit=crop`;

export const images = {
  hero: {
    marble: q('/photo-1558618666-fcd25c85cd64', 1920),
    concrete: q('/photo-1504307651254-35680f356dfd', 1920),
    wood: q('/photo-1541888946425-d81bb19240f5', 1920),
    steel: q('/photo-1487958449943-2429e8be8625', 1920),
    landing: q('/photo-1486325212027-8081e485255e', 1920),
  },
  projects: {
    projectbgbanner: '/images/projects/projectbg.webp',
    takbirThika: '/images/projects/takbirthika.webp',
    aljazeraResidency: '/images/projects/aljazeraresidency.webp',
    speakersResidence: '/images/projects/speakermandera.webp',
    takbirMandera: '/images/projects/takbirmandera.webp',
  },
  africa: {
    nairobiSkyline: q('/photo-1611348524140-53c9a25263d6'),
    constructionSite: q('/photo-1504307651254-35680f356dfd'),
    africanArchitecture: q('/photo-1569336415962-a4bd9f69cd83'),
    kenyaLandscape: q('/photo-1534432182912-63863115e106'),
  },
  team: {
    professional1: q('/photo-1560250097-0b93528c311a', 600),
    professional2: q('/photo-1573496359142-b8d87734a5a2', 600),
    professional3: q('/photo-1472099645785-5658abf4ff4e', 600),
    professional4: q('/photo-1580489944761-15a19d654956', 600),
    meeting: q('/photo-1556761175-5973dc0f32e7'),
    siteVisit: q('/photo-1504307651254-35680f356dfd'),
  },
  training: {
    workshop: q('/photo-1524178232363-1fb2b075b655'),
    classroom: q('/photo-1580582932707-520aed937b7b'),
    fieldwork: q('/photo-1503387762-592deb58ef4e'),
    hero: q('/photo-1524178232363-1fb2b075b655', 1920),
  },
  details: {
    blueprint: q('/photo-1503387762-592deb58ef4e'),
    materialClose: q('/photo-1441986300917-64674bd600d8'),
    drawingTable: q('/photo-1454165804606-c3d57bc86b40'),
    siteTools: q('/photo-1504307651254-35680f356dfd'),
  },
  services: {
    servicesbgbanner: '/images/services/servicesbg.webp',
    architecture: '/images/services/architecture.webp',
    engineering: '/images/services/engineering.webp',
    research: '/images/services/research.webp',
    training: '/images/services/training.webp',
    supervision: '/images/services/supervision.webp',
  },
  about: {
    aboutbgbanner: '/images/about/aboutbg.webp',
    office: q('/photo-1497366216548-37526070297c'),
    teamPhoto: q('/photo-1522071820081-009f0129c71c'),
    building: q('/photo-1486325212027-8081e485255e'),
  },
  contact: {
    mapBg: q('/photo-1449824913935-59a10b8d2000'),
    office: q('/photo-1497366216548-37526070297c'),
  },
} as const;

export type ImageKey = keyof typeof images;
