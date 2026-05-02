import Image from 'next/image';
import { PageShell } from '@/components/templates/PageShell';
import { TeamCard } from '@/components/molecules/TeamCard';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ScrollColourScene } from '@/components/animations/ScrollColourScene';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/config/images';
import { siteConfig } from '@/config/site';
import { tokens } from '@/config/tokens';
import { team } from '@/config/team';

export const metadata = buildMetadata({
  title: 'About',
  description: 'Insight AfriResearch Ltd — who we are, our story, values, team, and credentials.',
  canonical: '/about',
});

const values = [
  {
    title: 'Rigour',
    body: 'Every project earns our full technical attention. We do not cut corners on analysis, detail, or documentation.',
  },
  {
    title: 'Integrity',
    body: 'We advise clients on what they need, not what maximises our fees. Honest counsel is the foundation of long-term relationships.',
  },
  {
    title: 'Local knowledge',
    body: 'We understand Kenyan building codes, procurement systems, contractor realities, and cultural context. Global standards, local execution.',
  },
  {
    title: 'Collaboration',
    body: 'We work alongside clients, contractors, and communities rather than above them. Good buildings are always a shared achievement.',
  },
];

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4th Floor, Hughes Building, Kenyatta Avenue',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
};

const activeTeam = team.filter((m) => m.isActive);

export default function AboutPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Header */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={images.about.nairobi}
          alt="Nairobi — Insight AfriResearch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">Who we are</p>
            <h1 className="font-serif text-display-xl text-background">About</h1>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeading label="Our story" title="Built in Nairobi. Serving East Africa." />
            <div className="space-y-5 mt-8 font-sans text-body-lg text-muted max-w-prose">
              <FadeUp delay={0.2}>
                <p>
                  Insight AfriResearch was founded by a group of Kenyan professionals who saw a gap
                  in the market for a firm that could combine rigorous architectural design with
                  deep research capability and genuine commitment to knowledge transfer.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p>
                  We work from our offices on Kenyatta Avenue in Nairobi, with active project
                  experience across Kenya and East Africa. Our clients span county governments,
                  national ministries, international NGOs, and private developers who want a firm
                  that brings technical depth without the overheads of a large practice.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <p>
                  Our multidisciplinary model means you engage one firm for architecture,
                  engineering, research, training, and supervision. This integration eliminates
                  coordination gaps between disciplines and keeps accountability clear.
                </p>
              </FadeUp>
            </div>
          </div>
          <ScrollReveal from="right">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={images.about.teamPhoto}
                alt="Insight AfriResearch team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Full bleed */}
      <ParallaxImage className="h-[45vh]" speed={0.15}>
        <Image
          src={images.about.office}
          alt="Office and collaboration"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </ParallaxImage>

      {/* Values */}
      <section className="section-pad-tight container-site">
        <SectionHeading
          label="What drives us"
          title="Four values. No exceptions."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
          {values.map((value, i) => (
            <FadeUp key={value.title} delay={i * 0.1}>
              <div className="border-t border-border pt-6">
                <h3 className="font-serif text-display-sm text-foreground mb-3">{value.title}</h3>
                <p className="font-sans text-body-md text-muted">{value.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Team — dark colour scene */}
      <ScrollColourScene bgColor={tokens.colors.foreground} fgColor={tokens.colors.background}>
        <section className="section-pad bg-foreground">
          <div className="container-site">
            <SectionHeading
              label="The team"
              title="Professionals you can call by name."
              className="mb-12 [&_h2]:text-background [&_.label-text]:text-background/50"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {activeTeam.map((member, i) => (
                <FadeUp key={member.id} delay={i * 0.1}>
                  <TeamCard member={member} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      </ScrollColourScene>
    </PageShell>
  );
}
