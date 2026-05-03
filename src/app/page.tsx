import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { HeroSlideshow } from '@/components/organisms/HeroSlideshow';
import { EnquiryForm } from '@/components/organisms/EnquiryForm';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ScrollColourScene } from '@/components/animations/ScrollColourScene';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/config/images';
import { siteConfig } from '@/config/site';
import { tokens } from '@/config/tokens';
import { getFeaturedProjects } from '@/config/projects';
import { services } from '@/config/services';

export const metadata = buildMetadata();

const clientTypes = [
  'Government Ministries',
  'County Governments',
  'NGOs and Development Partners',
  'Real Estate Developers',
  'Hospitality Groups',
  'Diaspora Investors',
];

const stats = [
  { value: '25+', label: 'Projects completed' },
  { value: '12', label: 'Counties served' },
  { value: '7', label: 'Years in practice' },
  { value: '4', label: 'Countries' },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <HeroSlideshow />

        {/* Who we are — editorial split */}
        <section className="section-pad container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="Who we are"
                title="A firm built for the complexity of African development."
                subtitle="We combine architectural rigour, engineering depth, and applied research to deliver buildings, infrastructure, and knowledge that last."
              />
              <FadeUp delay={0.3}>
                <div className="flex gap-4 mt-8">
                  <Link href="/about" className="btn-primary">
                    Our Story
                  </Link>
                  <Link href="/services" className="btn-outline">
                    Our Services
                  </Link>
                </div>
              </FadeUp>
            </div>
            <ScrollReveal from="right">
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/images/nairobibuilding.webp"
                    alt="Architectural design by Insight AfriResearch"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent p-6 hidden md:block">
                  <p className="font-serif text-display-sm text-background leading-tight">
                    Nairobi
                    <br />
                    Kenya
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-foreground py-14">
          <div className="container-site">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.1}>
                  <div className="text-center md:text-left">
                    <p className="font-serif text-display-lg text-accent leading-none">
                      {stat.value}
                    </p>
                    <p className="font-sans text-label-sm uppercase tracking-widest text-background/60 mt-2">
                      {stat.label}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Services preview */}
        <section className="section-pad container-site">
          <div className="flex flex-col items-center gap-6 mb-12">
            <SectionHeading
              label="What we do"
              align="center"
              title="Five disciplines. One firm."
              className="mb-0"
            />
            <FadeUp>
              <Link href="/services" className="btn-text shrink-0">
                All Services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <FadeUp key={service.slug} delay={i * 0.1}>
                <Link href={`/services#${service.slug}`} className="group block">
                  <div className="relative aspect-landscape overflow-hidden mb-4">
                    <Image
                      src={service.heroImage}
                      alt={service.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-800 ease-expo-out group-hover:scale-105"
                    />
                  </div>
                  <p className="label-text mb-2">0{service.sortOrder}</p>
                  <h3 className="font-serif text-display-sm text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="font-sans text-body-md text-muted mt-1">{service.headline}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section className="pt-0 pb-12 md:pb-20  container-site">
          <div className="flex flex-col items-center gap-6 mb-12">
            <FadeUp>
              <p className="label-text mb-10 text-center">Selected work</p>
            </FadeUp>
            <FadeUp>
              <Link href="/projects" className="btn-text shrink-0">
                All Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} images={project.images?.map((img) => img.url)} />
              </FadeUp>
            ))}
          </div>
        </section>

        {/* Client types */}
        <section className="section-pad-tight bg-surface overflow-hidden">
          <div className="container-site">
            <FadeUp>
              <p className="label-text mb-10 text-center">Who we work with</p>
            </FadeUp>
            <div className="flex items-center gap-0 divide-x divide-border">
              {clientTypes.map((type, i) => (
                <FadeUp key={type} delay={i * 0.06}>
                  <div className="flex flex-col items-center px-8 py-4 group cursor-default">
                    <span className="font-serif text-display-sm text-foreground group-hover:text-accent transition-colors duration-300 text-center">
                      {type}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
        {/* Training callout — dark colour scene */}
        <ScrollColourScene bgColor={tokens.colors.foreground} fgColor={tokens.colors.background}>
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <ParallaxImage className="absolute inset-0" speed={0.1}>
              <Image
                src={images.training.hero}
                alt="Training and capacity building"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/75" />
            </ParallaxImage>
            <div className="relative z-10 container-site text-center py-20">
              <FadeUp>
                <p className="font-sans text-label-md uppercase tracking-widest text-background/60 mb-4">
                  Training and Capacity Building
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-serif text-display-lg text-background mb-6 text-balance">
                  Build skills that stay in the sector.
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-sans text-body-lg text-background/70 max-w-xl mx-auto mb-8">
                  Short courses, workshops, and professional development programmes for engineers,
                  architects, and project managers.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Link
                  href="/training"
                  className="btn-primary bg-background text-foreground hover:bg-accent hover:text-background"
                >
                  View Programmes
                </Link>
              </FadeUp>
            </div>
          </section>
        </ScrollColourScene>
      </main>
      <Footer />
    </>
  );
}
