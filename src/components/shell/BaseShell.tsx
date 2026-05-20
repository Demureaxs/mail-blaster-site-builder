import Link from 'next/link';
import { LeadConfig } from '@/lib/types';
import { Phone, ArrowRight, MapPin, Home, Wrench, BookOpen } from 'lucide-react';

interface BaseShellProps {
  children: React.ReactNode;
  lead?: LeadConfig | null;
  industry?: string;
  slug?: string;
  ctaLink?: string;
}

export function BaseShell({ children, lead, industry, slug }: BaseShellProps) {
  return (
    <div className='flex min-h-screen bg-gray-50 flex-col relative'>
      {/* ── Purchase Demo Banner ─────────────────────────────────── */}
      <div className='bg-black text-white h-11 flex items-center justify-center px-4 relative z-100 border-b border-gray-800'>
        <div className='flex items-center gap-3 sm:gap-4 text-sm'>
          <span className='font-medium hidden md:inline'>This is a live preview of your new website.</span>
          <span className='font-bold text-(--brand-orange)'>Ready to launch?</span>
          <Link href={'https://buy.stripe.com/3cI9ATd3g18B1bE0io3Nm06'} target='_blank'>
            <button className='cursor-pointer bg-(--brand-orange) hover:bg-white text-white hover:text-black px-5 py-1 rounded-full text-xs font-bold transition-all ease-in-out duration-500 shadow-lg shadow-[#ff6333]/20'>
              Claim This Website
            </button>
          </Link>
        </div>
      </div>
      {/* ── Scrolling Promo Banner ─────────────────────────────────── */}
      <div className='bg-(--dark-bg) text-white py-2.5 overflow-hidden'>
        <div className='flex animate-marquee whitespace-nowrap'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex items-center gap-8 mx-4'>
              <span className='text-sm font-medium tracking-wide'>
                24/7 Emergency Locksmith —{' '}
                <Link href={`tel:${lead?.phone || ''}`} className='text-(--brand-orange) font-semibold hover:underline'>
                  Call Now!
                </Link>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm font-medium tracking-wide'>
                Free Security Assessment —{' '}
                <Link href={`/${industry}/${slug}`} className='text-(--brand-orange) font-semibold hover:underline'>
                  Book Today!
                </Link>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm font-medium tracking-wide'>
                Lock Replacement from <span className='text-(--brand-orange) font-bold'>£49!</span>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm font-medium tracking-wide'>
                New Customer Discount — <span className='text-(--brand-orange) font-bold'>20% Off</span>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Default Header / Navigation (Absolute top underneath the banner) */}
      <div className='absolute top-22 left-0 w-full z-50 pt-6 sm:px-6 sm:pt-10 pb-6 pointer-events-none'>
        <header className='container mx-auto max-w-7xl flex h-16 pr-6 items-center justify-between px-4 md:px-6 pointer-events-auto'>
          <div className='flex-1 flex items-center justify-between gap-4 pr-8'>
            {/* Logo */}
            <Link
              href={industry && slug ? `/${industry}/${slug}` : '/'}
              className='flex items-center gap-3 p-2 pr-4 rounded-xl shadow-lg transition-all ease-in-out duration-500'
            >
              <div className='w-9 h-9 rounded-lg bg-(--brand-orange) flex items-center justify-center shadow-md'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-5 h-5'>
                  <path d='M12 2C9.24 2 7 4.24 7 7v4H5v10h14V11h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v4H9V7c0-1.66 1.34-3 3-3zm-5 9h10v6H7v-6z' />
                </svg>
              </div>
              <span className='font-bold tracking-tight text-white lg:text-xl text-nowrap drop-shadow-md'>
                {lead?.businessName || 'Your Business'}
              </span>
            </Link>

            {/* Navigation */}
            <nav className='hidden md:flex items-center gap-8 text-sm font-bold tracking-wide'>
              {industry && slug ? (
                <>
                  <Link
                    href={`/${industry}/${slug}`}
                    className='text-white hover:text-(--brand-orange) transition-all ease-in-out duration-500 drop-shadow-md'
                  >
                    Home
                  </Link>
                  <Link
                    href={`/${industry}/${slug}/services`}
                    className='text-white hover:text-(--brand-orange) transition-all ease-in-out duration-500 drop-shadow-md'
                  >
                    Services
                  </Link>
                  <Link
                    href={`/${industry}/${slug}/blog`}
                    className='text-white hover:text-(--brand-orange) transition-all ease-in-out duration-500 drop-shadow-md'
                  >
                    Blog
                  </Link>
                </>
              ) : (
                <span className='text-gray-400'>Demo Navigation</span>
              )}
            </nav>
          </div>

          {/* CTA Button */}
          <div className='flex items-center gap-3'>
            <Link href={`tel:${lead?.phone || ''}`}>
              <button className='cursor-pointer whitespace-nowrap group inline-flex items-center gap-3 bg-white border border-transparent hover:border-white rounded-full pl-5 pr-1.5 py-1.5 text-sm font-bold text-gray-900 transition-all ease-in-out duration-500 shadow-xl'>
                CONTACT US
                <span className='w-8 h-8 rounded-full bg-(--brand-orange) group-hover:bg-black flex items-center justify-center transition-all ease-in-out duration-500'>
                  <Phone className='h-4 w-4 text-white group-hover:rotate-12 transition-all ease-in-out duration-500' />
                </span>
              </button>
            </Link>
          </div>
        </header>
      </div>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className='flex-1 flex flex-col pt-0'>{children}</main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className='bg-(--dark-bg) mb-22 md:mb-6 text-white mx-4 mb-4 rounded-3xl overflow-hidden mt-10'>
        {/* Top CTA */}
        <div className='container mx-auto max-w-7xl px-4 md:px-10 py-20'>
          <div className='grid md:grid-cols-2 gap-16 items-start'>
            {/* Left - Experts blurb */}
            <div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 rounded-xl bg-(--brand-orange) flex items-center justify-center shadow-lg shadow-[#ff6333]/20'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-6 h-6'>
                    <path d='M12 2C9.24 2 7 4.24 7 7v4H5v10h14V11h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v4H9V7c0-1.66 1.34-3 3-3zm-5 9h10v6H7v-6z' />
                  </svg>
                </div>
                <h4 className='text-2xl font-bold tracking-tight'>Certified Locksmith Experts</h4>
              </div>
              <p className='text-gray-400 text-[15px] leading-relaxed max-w-md'>
                At <span className='font-bold text-white'>{lead?.businessName || 'our company'}</span>, we take pride in having a team of highly
                trained, DBS-checked locksmith professionals dedicated to your security and peace of mind across the local area.
              </p>

              {lead?.address && (
                <div className='flex items-start gap-4 mt-10'>
                  <div className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-gray-800'>
                    <MapPin className='w-4 h-4 text-(--brand-orange)' />
                  </div>
                  <div>
                    <h5 className='text-white font-bold mb-2 tracking-wide'>Service Area</h5>
                    <div className='flex flex-col gap-0.5'>
                      {lead.address
                        .split(',')
                        .flatMap((part) => {
                          const trimmed = part.trim();
                          // Match a typical UK postcode pattern at the end of a string
                          const postcodeMatch = trimmed.match(/(.*?)\s+([A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i);
                          if (postcodeMatch) {
                            return [postcodeMatch[1].trim(), postcodeMatch[2].trim()];
                          }
                          return [trimmed];
                        })
                        .filter((part) => part.toLowerCase() !== 'inggris raya' && part.length > 0)
                        .map((line, idx) => (
                          <p key={idx} className='text-gray-400 text-sm leading-relaxed'>
                            {line}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Let's Talk */}
            <div className='md:pl-10 md:border-l border-gray-800'>
              <h4 className='text-2xl font-bold mb-4 tracking-tight'>Let&apos;s Talk Security Solutions</h4>
              <p className='text-gray-400 text-[15px] leading-relaxed mb-8 max-w-md'>
                Whether you need emergency lockout help right now, a quote for new British Standard locks, or a full home security assessment, our
                friendly team is ready to assist.
              </p>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='cursor-pointer group inline-flex items-center gap-4 bg-(--brand-orange) text-white rounded-full px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#e55020] transition-all ease-in-out duration-500 shadow-lg shadow-[#ff6333]/20'>
                  GET STARTED NOW
                  <span className='w-8 h-8 rounded-full bg-white/20 group-hover:bg-white flex items-center justify-center transition-all ease-in-out duration-500'>
                    <ArrowRight className='w-4 h-4 text-white group-hover:text-(--brand-orange) -rotate-45 group-hover:rotate-0 transition-all ease-in-out duration-500' />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800/80 bg-black/20'>
          <div className='container mx-auto max-w-7xl px-4 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6'>
            {/* Nav links */}
            <nav className='flex items-center gap-8 text-sm font-semibold tracking-wide'>
              {industry && slug && (
                <>
                  <Link href={`/${industry}/${slug}`} className='text-gray-400 hover:text-white transition-all ease-in-out duration-500'>
                    Home
                  </Link>
                  <Link href={`/${industry}/${slug}/services`} className='text-gray-400 hover:text-white transition-all ease-in-out duration-500'>
                    Services
                  </Link>
                  <Link href={`/${industry}/${slug}/blog`} className='text-gray-400 hover:text-white transition-all ease-in-out duration-500'>
                    Blog
                  </Link>
                </>
              )}
            </nav>
            <p className='text-sm text-gray-500 font-medium'>
              © {new Date().getFullYear()} {lead?.businessName || 'Demo Business'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation ───────────────────────────────── */}
      <nav className='md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[60] flex items-center justify-around pb-2 pt-2 px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]'>
        {industry && slug ? (
          <>
            <Link
              href={`/${industry}/${slug}`}
              className='flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-(--brand-orange) transition-colors'
            >
              <Home className='w-5 h-5' />
              <span className='text-[10px] font-bold tracking-wide uppercase'>Home</span>
            </Link>
            <Link
              href={`/${industry}/${slug}/services`}
              className='flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-(--brand-orange) transition-colors'
            >
              <Wrench className='w-5 h-5' />
              <span className='text-[10px] font-bold tracking-wide uppercase'>Services</span>
            </Link>
            <Link
              href={`/${industry}/${slug}/blog`}
              className='flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-(--brand-orange) transition-colors'
            >
              <BookOpen className='w-5 h-5' />
              <span className='text-[10px] font-bold tracking-wide uppercase'>Blog</span>
            </Link>
            <Link href={`tel:${lead?.phone || ''}`} className='flex flex-col items-center gap-1 p-2 text-(--brand-orange) transition-colors'>
              <Phone className='w-5 h-5' />
              <span className='text-[10px] font-bold tracking-wide uppercase'>Call</span>
            </Link>
          </>
        ) : null}
      </nav>

      {/* ── Fixed WhatsApp Button ──────────────────────────────────── */}
      <a
        href={`https://wa.me/${lead?.phone && lead?.phone.replace(/\s/g, '')}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Chat with us on WhatsApp'
        className='fixed bottom-24 md:bottom-10 right-8 sm:right-4 md:right-10 z-50 hover:scale-110 transition-transform ease-in-out duration-300 drop-shadow-xl'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' className='w-14 h-14' aria-hidden='true'>
          <circle cx='24' cy='24' r='24' fill='#25D166' />
          <path
            fill='#fff'
            d='M35.2 12.8A15.9 15.9 0 0 0 24 8C15.16 8 8 15.16 8 24c0 2.82.74 5.57 2.15 7.99L8 40l8.23-2.16A15.94 15.94 0 0 0 24 40c8.84 0 16-7.16 16-16 0-4.27-1.66-8.29-4.8-11.2zm-11.2 24.6a13.23 13.23 0 0 1-6.74-1.84l-.48-.29-4.99 1.31 1.33-4.86-.31-.5A13.22 13.22 0 0 1 10.77 24c0-7.29 5.94-13.23 13.23-13.23 3.54 0 6.86 1.38 9.36 3.88a13.16 13.16 0 0 1 3.87 9.36c0 7.3-5.94 13.39-13.23 13.39zm7.26-9.9c-.4-.2-2.35-1.16-2.71-1.29-.37-.13-.63-.2-.9.2-.26.39-1.02 1.29-1.25 1.55-.23.27-.46.3-.85.1-.4-.2-1.67-.62-3.18-1.96-1.18-1.05-1.97-2.34-2.2-2.74-.23-.4-.02-.61.17-.81.18-.18.4-.46.6-.69.2-.23.26-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5-.37.4-1.4 1.37-1.4 3.33 0 1.97 1.43 3.87 1.63 4.14.2.27 2.82 4.3 6.83 6.03.95.41 1.7.66 2.28.84.96.3 1.83.26 2.52.16.77-.12 2.35-.96 2.68-1.89.33-.92.33-1.71.23-1.88-.1-.17-.36-.27-.76-.47z'
          />
        </svg>
      </a>
    </div>
  );
}
