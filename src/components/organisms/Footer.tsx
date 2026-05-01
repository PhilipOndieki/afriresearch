import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { footerLinks } from '@/config/nav';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8 md:pt-24">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo variant="light" className="mb-6" />
            <p className="font-sans text-body-md text-background/70 max-w-sm mb-6">
              Multidisciplinary firm delivering architecture, engineering, research, training, and
              project supervision across East Africa.
            </p>
            <address className="font-sans text-body-sm text-background/60 not-italic space-y-1">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-background transition-colors duration-300"
                >
                  {siteConfig.contact.phone}
                </a>
                {' / '}
                <a
                  href={`tel:${siteConfig.contact.mobile}`}
                  className="hover:text-background transition-colors duration-300"
                >
                  {siteConfig.contact.mobile}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-background transition-colors duration-300"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="font-sans text-label-sm uppercase tracking-widest text-background/40 mb-5">
              Services
            </p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-body-sm text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-label-sm uppercase tracking-widest text-background/40 mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-body-sm text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip — copyright only */}
        <div className="border-t border-background/10 pt-8">
          <p className="font-sans text-body-sm text-background/40">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
