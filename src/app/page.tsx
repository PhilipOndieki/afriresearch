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
                    src={images.about.building}
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              label="What we do"
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

        {/* Full bleed divider image */}
        <ParallaxImage className="h-[50vh] md:h-[65vh]" speed={0.2}>
          <Image
            src={images.africa.nairobiSkyline}
            alt="Nairobi skyline"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
        </ParallaxImage>

        {/* Featured projects */}
        <section className="section-pad-tight container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              label="Selected work"
              title="Projects we are proud of."
              className="mb-0"
            />
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
        <section className="section-pad-tight bg-surface">
          <div className="container-site">
            <FadeUp>
              <p className="label-text mb-8 text-center">Who we work with</p>
            </FadeUp>
            <div className="flex flex-wrap justify-center gap-4">
              {clientTypes.map((type, i) => (
                <FadeUp key={type} delay={i * 0.05}>
                  <span className="font-sans text-body-md text-foreground border border-border px-6 py-3">
                    {type}
                  </span>
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

        {/* Contact strip with map */}
        <section className="section-pad container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeading
                label="Get in touch"
                title="Tell us about your project."
                subtitle="We respond to every enquiry within two business days."
              />
              <EnquiryForm className="mt-10" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="aspect-square md:aspect-[4/3] w-full overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8177!2d36.8166!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10cf61c40c5b%3A0x1e1a9a2b2c3d4e5f!2sHughes+Building%2C+Kenyatta+Avenue%2C+Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale"
                  title="Insight AfriResearch office location"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="label-text mb-1">Address</p>
                  <p className="font-sans text-body-md text-foreground">
                    {siteConfig.contact.address}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="label-text mb-1">Phone</p>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-sans text-body-md text-foreground hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="label-text mb-1">Mobile</p>
                    <a
                      href={`tel:${siteConfig.contact.mobile}`}
                      className="font-sans text-body-md text-foreground hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.mobile}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="label-text mb-1">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-sans text-body-md text-foreground hover:text-accent transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
