import Link from 'next/link';
import { LeadConfig } from '@/lib/types';
import { Phone, ArrowRight } from 'lucide-react';

interface BaseShellProps {
  children: React.ReactNode;
  lead?: LeadConfig | null;
  industry?: string;
  slug?: string;
  ctaLink?: string;
}

export function BaseShell({ children, lead, industry, slug, ctaLink }: BaseShellProps) {
  return (
    <div className='flex min-h-screen bg-gray-50 flex-col relative'>
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
      <div className='absolute top-11 left-0 w-full z-50 py-6 pointer-events-none'>
        <header className='container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6 pointer-events-auto'>
          <div className='flex-1 flex items-center justify-between gap-4 pr-8'>
            {/* Logo */}
            <Link
              href={industry && slug ? `/${industry}/${slug}` : '/'}
              className='flex items-center gap-3 p-2 pr-4 rounded-xl shadow-lg transition-all'
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
                  <Link href={`/${industry}/${slug}`} className='text-white hover:text-(--brand-orange) transition-colors drop-shadow-md'>
                    Home
                  </Link>
                  <Link href={`/${industry}/${slug}/services`} className='text-white hover:text-(--brand-orange) transition-colors drop-shadow-md'>
                    Services
                  </Link>
                  <Link href={`/${industry}/${slug}/blog`} className='text-white hover:text-(--brand-orange) transition-colors drop-shadow-md'>
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
              <button className='cursor-pointer group inline-flex items-center gap-3 bg-white border border-transparent hover:border-white rounded-full pl-5 pr-1.5 py-1.5 text-sm font-bold text-gray-900 transition-all shadow-xl'>
                CONTACT US
                <span className='w-8 h-8 rounded-full bg-(--brand-orange) group-hover:bg-black flex items-center justify-center transition-all'>
                  <Phone className='h-4 w-4 text-white group-hover:rotate-12 transition-all' />
                </span>
              </button>
            </Link>
          </div>
        </header>
      </div>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className='flex-1 flex flex-col pt-0'>{children}</main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className='bg-(--dark-bg) text-white mx-4 mb-4 rounded-3xl overflow-hidden mt-10'>
        {/* Top CTA */}
        <div className='container mx-auto max-w-7xl px-4 md:px-10 py-20'>
          <div className='grid md:grid-cols-2 gap-16 items-start'>
            {/* Left - Experts blurb */}
            <div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 rounded-xl bg-(--brand-orange) flex items-center justify-center shadow-lg shadow-(--brand-orange)/20'>
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
            </div>

            {/* Right - Let's Talk */}
            <div className='md:pl-10 md:border-l border-gray-800'>
              <h4 className='text-2xl font-bold mb-4 tracking-tight'>Let&apos;s Talk Security Solutions</h4>
              <p className='text-gray-400 text-[15px] leading-relaxed mb-8 max-w-md'>
                Whether you need emergency lockout help right now, a quote for new British Standard locks, or a full home security assessment, our
                friendly team is ready to assist.
              </p>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='group inline-flex items-center gap-4 bg-(--brand-orange) text-white rounded-full px-8 py-4 text-sm font-bold tracking-wider hover:bg-[#e55020] transition-colors shadow-lg shadow-(--brand-orange)/20'>
                  GET STARTED NOW
                  <span className='w-8 h-8 rounded-full bg-white/20 group-hover:bg-white flex items-center justify-center transition-colors'>
                    <ArrowRight className='w-4 h-4 text-white group-hover:text-(--brand-orange) -rotate-45 group-hover:rotate-0 transition-transform duration-300' />
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
                  <Link href={`/${industry}/${slug}`} className='text-gray-400 hover:text-white transition-colors'>
                    Home
                  </Link>
                  <Link href={`/${industry}/${slug}/services`} className='text-gray-400 hover:text-white transition-colors'>
                    Services
                  </Link>
                  <Link href={`/${industry}/${slug}/blog`} className='text-gray-400 hover:text-white transition-colors'>
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
    </div>
  );
}
