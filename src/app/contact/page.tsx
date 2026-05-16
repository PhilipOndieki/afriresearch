import Image from 'next/image';
import { PageShell } from '@/components/templates/PageShell';
import { EnquiryForm } from '@/components/organisms/EnquiryForm';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { images } from '@/config/images';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with Insight AfriResearch Ltd. Office on Kenyatta Avenue, Nairobi.',
  canonical: '/contact',
});

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4th Floor, Hughes Building, Kenyatta Avenue',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
};

export default function ContactPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Header */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
        <Image
          src={images.contact.contactbgbanner}
          alt="Contact — Insight AfriResearch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">We are listening</p>
            <h1 className="font-serif text-display-xl text-background">Contact</h1>
          </FadeUp>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Form */}
          <div>
            <SectionHeading
              label="Enquiry"
              title="Tell us about your project."
              subtitle="All enquiries receive a response within two business days."
              className="mb-10"
            />
            <EnquiryForm />
          </div>

          {/* Details */}
          <div className="space-y-10">
            {/* Map */}
            <FadeUp>
              <div className="aspect-[4/3] w-full overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8155874782424!2d36.81802917411528!3d-1.2845848356224776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11008d8247bb%3A0xa8fddc8e08f0cac8!2sHughes%20Building!5e0!3m2!1sen!2ske!4v1778905306281!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-600"
                  title="Muindi Mbingu Street"
                />
              </div>
            </FadeUp>

            {/* Contact details */}
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="label-text mb-2">Address</p>
                  <address className="font-sans text-body-md text-foreground not-italic">
                    4th Floor, Hughes Building
                    <br />
                    Muindi Mbingu Street
                    <br />
                    Nairobi, Kenya
                  </address>
                </div>
                <div className="space-y-4">
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
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="border-t border-border pt-6">
                <p className="label-text mb-2">Office hours</p>
                <p className="font-sans text-body-md text-foreground">
                  Monday to Friday, 8:00 am to 5:00 pm
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
