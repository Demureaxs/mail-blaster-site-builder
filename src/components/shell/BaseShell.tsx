import Link from 'next/link';
import { LeadConfig } from '@/lib/types';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { ArrowRight, Award, Phone, Siren } from 'lucide-react';

interface BaseShellProps {
  children: React.ReactNode;
  lead?: LeadConfig | null;
  industry?: string;
  slug?: string;
  ctaLink?: string;
}

export function BaseShell({ lead, industry, slug, ctaLink }: BaseShellProps) {
  return (
    <div className='flex min-h-screen bg-gray-100 flex-col'>
      {/* ── Scrolling Promo Banner ─────────────────────────────────── */}
      <div className='bg-(--dark-bg) text-white py-2.5 overflow-hidden'>
        <div className='flex animate-marquee whitespace-nowrap'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex items-center gap-8 mx-4'>
              <span className='text-sm'>
                24/7 Emergency Locksmith —{' '}
                <Link href={`tel:${lead?.phone || ''}`} className='text-(--brand-orange) font-semibold hover:underline'>
                  Call Now!
                </Link>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm'>
                Free Security Assessment —{' '}
                <Link href={`/${industry}/${slug}`} className='text-(--brand-orange) font-semibold hover:underline'>
                  Book Today!
                </Link>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm'>
                Lock Replacement from <span className='text-(--brand-orange) font-semibold'>£49!</span>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
              <span className='text-sm'>
                New Customer Discount — <span className='text-(--brand-orange) font-semibold'>20% Off</span>
              </span>
              <span className='text-(--brand-orange)'>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Header / Navigation ────────────────────────────────────── */}

      <main className='space-y-16'>
        <div className='relative rounded-lg overflow-hidden m-4 h-screen'>
          {/* ── Header: Absolute to sit over the mask ─────────────────────── */}
          <header className='absolute top-0 left-0 w-full z-50 py-6'>
            <div className='container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6'>
              <div className='flex-1 flex items-center justify-between gap-4 pr-8'>
                {/* Logo */}
                <Link href={industry && slug ? `/${industry}/${slug}` : '/'} className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-lg bg-(--brand-orange) flex items-center justify-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-5 h-5'>
                      <path d='M12 2C9.24 2 7 4.24 7 7v4H5v10h14V11h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v4H9V7c0-1.66 1.34-3 3-3zm-5 9h10v6H7v-6z' />
                    </svg>
                  </div>
                  <span className='font-bold tracking-tight text-white lg:text-2xl text-nowrap'>{lead?.businessName || 'Your Business'}</span>
                </Link>

                {/* Navigation */}
                <nav className='hidden md:flex items-center gap-8 text-sm font-medium'>
                  {industry && slug ? (
                    <>
                      <Link
                        href={`/${industry}/${slug}`}
                        className='text-white hover:text-(--brand-orange) transition-colors duration-500 ease-in-out'
                      >
                        Home
                      </Link>
                      <Link
                        href={`/${industry}/${slug}/services`}
                        className='text-white hover:text-(--brand-orange) transition-colors duration-500 ease-in-out'
                      >
                        Services
                      </Link>
                      <Link
                        href={`/${industry}/${slug}/blog`}
                        className='text-white hover:text-(--brand-orange) transition-colors duration-500 ease-in-out'
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
                  <button className='cursor-pointer group inline-flex items-center gap-2 bg-white border hover:text-white hover:bg-(--brand-orange) border-black hover:border-gray-200 rounded-full pl-4 pr-1 py-1 text-sm font-semibold text-gray-900 transition-all duration-500 ease-in-out shadow-sm'>
                    CONTACT US
                    <span className='w-7 h-7 rounded-full bg-(--brand-orange) group-hover:bg-black flex items-center justify-center transition-all duration-500 ease-in-out'>
                      <Phone className=' h-4 group-hover:rotate-12 transition-all duration-500 ease-in-out' />
                      {/* <ArrowRight className='-rotate-45 h-4 group-hover:rotate-0 group-hover:text-white transition-all duration-500 ease-in-out' /> */}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </header>

          {/* ── Background Image ────────────────────────────────────────── */}
          <Image
            src={'https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'}
            alt='Locksmith Image'
            fill
            priority // Critical for LCP/Performance scores
            className='object-cover'
          />

          {/* ── Overlay Mask (z-10) ─────────────────────────────────────── */}
          <div className='absolute inset-0 bg-black/70 z-10' />

          {/* ── Hero Text (z-30) ────────────────────────────────────────── */}
          {/* We make this container absolute and full-sized */}
          <div className='absolute inset-0 z-30'>
            {/* This inner div uses the EXACT same constraints as your header */}
            <div className='container mx-auto max-w-7xl h-full flex flex-col justify-center px-4 md:px-6'>
              <div className='max-w-2xl'>
                {' '}
                {/* Limits text width so it doesn't span the whole screen */}
                <h1 className='text-white text-4xl md:text-7xl font-semibold tracking-tight'>
                  Expert Locksmith Services <br />
                  <span className='text-(--brand-orange)'>
                    {lead?.businessName
                      .split(' ')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ') || 'in Soho'}
                  </span>
                </h1>
                {/* Optional: Add a secondary CTA button here for better UX */}
                <div className='mt-10'>
                  <Link href={`tel:${lead?.phone || ''}`}>
                    <button className='cursor-pointer group inline-flex items-center gap-2 bg-white border text-gray-900 hover:text-gray-900 hover:bg-(--brand-orange) border-black hover:border-gray-200 rounded-full pl-4 pr-1 py-1 text-sm font-semibold transition-all duration-500 ease-in-out shadow-sm'>
                      CALL NOW: {lead?.phone || '07000 000000'}
                      <span className='w-7 h-7 rounded-full bg-(--brand-orange) group-hover:bg-black flex items-center justify-center transition-all duration-500 ease-in-out'>
                        <Phone className='h-4 group-hover:rotate-12 group-hover:text-white transition-all duration-500 ease-in-out' />
                        {/* <ArrowRight className='-rotate-45 h-4 group-hover:rotate-0 group-hover:text-white transition-all duration-500 ease-in-out' /> */}
                      </span>
                    </button>
                  </Link>
                </div>
                <p className='mt-12 text-gray-200 text-lg md:text-xl lg:w-1/2 border-l px-6 py-2'>
                  Professional, reliable, and fast emergency locksmith solutions. Locked out? We&apos;ve got you covered 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who We are */}
        {/* Who We Are Section */}
        <section className='max-w-7xl px-4 md:px-6 mx-auto my-20 lg:my-40'>
          <div className='flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch'>
            {/* Image Container with subtle accent */}
            <div className='flex-1 relative group'>
              <div className='absolute -inset-4 bg-(--brand-orange)/10 rounded-2xl -z-10 group-hover:bg-(--brand-orange)/20 transition-colors duration-700' />
              <Image
                src={'https://www.banham.co.uk/media/wysiwyg/lock-repair-body.png'}
                alt={`${lead?.businessName || 'Locksmith'} - Professional Lock Repair`}
                height={600}
                width={600}
                className='w-full h-full rounded-2xl shadow-2xl object-cover'
              />
              {/* Floating Trust Badge */}
              <div className='absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block'>
                <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>Rapid Response</p>
                <p className='text-(--brand-orange) font-black text-xl'>30 MINS</p>
              </div>
            </div>

            {/* Content Container */}
            <div className='flex-1 flex flex-col bg-white p-6 rounded-lg border-2 border-gray-200 group hover:border-(--brand-orange)/50 justify-center transition-all duration-500 ease-in-out'>
              <div className='space-y-6'>
                <div className='flex items-center gap-3'>
                  <span className='h-0.5 w-8 bg-(--brand-orange)'></span>
                  <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>Local Security Experts</span>
                </div>

                <h2 className='text-4xl lg:text-5xl  text-gray-900 leading-tight'>
                  Emergency Locksmith & <br />
                  <span className='text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600'>Security Solutions</span>
                </h2>

                <div className='space-y-4 text-gray-600 leading-relaxed'>
                  <p>
                    At <span className='font-bold text-gray-900 capitalize'>{lead?.businessName || 'Abel Locksmiths'}</span>, we understand that
                    security emergencies don&apos;t wait for business hours.
                  </p>
                  <p>
                    With years of specialized experience in <span className='text-gray-900 font-medium'>non-destructive entry</span> and high-security
                    lock installations, we provide homeowners and businesses with peace of mind when they need it most.
                  </p>
                </div>

                {/* Feature List (Adds professional weight) */}
                <ul className='grid grid-cols-2 gap-4 py-4'>
                  {['24/7 Emergency Call-out', 'Non-Destructive Entry', 'CRB/DBS Checked', 'Insurance Approved'].map((feature) => (
                    <li key={feature} className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
                      <div className='w-1.5 h-1.5 rounded-full bg-(--brand-orange)' />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className='pt-4'>
                  <Link href={`tel:${lead?.phone || ''}`}>
                    <button className='cursor-pointer group inline-flex items-center gap-4 bg-(--brand-orange) hover:bg-black text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold transition-all duration-300 shadow-xl'>
                      REQUEST EMERGENCY ASSISTANCE
                      <span className='w-10 h-10 rounded-full bg-white group-hover:bg-(--brand-orange) flex items-center justify-center transition-all duration-300'>
                        <Phone className='h-5 w-5 text-gray-900 group-hover:text-white group-hover:rotate-12 transition-all duration-300' />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Simple Booking process */}
        <div className='bg-white lg:py-32'>
          <div className='max-w-7xl mx-auto space-y-8 flex gap-16'>
            <div className='space-y-8'>
              <div className='w-2/3 space-y-8'>
                <h2 className='text-5xl'>Our Simple Booking Process</h2>
                <p>Scheduling a service with Climafix is simple and fast. Follow these easy steps to get the expert.</p>
              </div>
              <Image
                src='https://www.banham.co.uk/media/catalog/category/locksmith_scams_header.jpg'
                alt='Booking Process'
                width={1000}
                height={1000}
                className='rounded-lg shadow-lg border-gray-200 border-2'
              />
            </div>
            <div className='space-y-8 self-center'>
              <div className='bg-gray-100 space-y-4 rounded-lg p-6 border-gray-200 hover:border-(--brand-orange) transition-all duration-500 ease-in-out border-2 shadow-lg'>
                <Siren className='text-(--brand-orange)' />
                <h3 className='text-3xl font-semibold'>24/7 Emergency Support</h3>
                <p>HVAC problems don’t business hours. That’s why our emergency team is available 24/7 to respond.</p>
              </div>
              <div className='bg-gray-100 space-y-4 rounded-lg p-6 border-gray-200 hover:border-(--brand-orange) transition-all duration-500 ease-in-out border-2 shadow-lg'>
                <Award className='text-(--brand-orange)' />
                <h3 className='text-3xl font-semibold'>24/7 Emergency Support</h3>
                <p>HVAC problems don’t business hours. That’s why our emergency team is available 24/7 to respond.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <section className='lg:pb-32'>
          <div className='max-w-7xl mx-auto'>
            <h1 className='text-4xl'>Discover Our Locksmith Services</h1>
            
          </div>
        </section>
      </main>
      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className='bg-(--dark-bg) text-white rounded-lg mx-4 mb-4'>
        {/* Top CTA */}
        <div className='container mx-auto max-w-7xl px-4 md:px-6 py-16'>
          <div className='grid md:grid-cols-2 gap-12 items-start'>
            {/* Left - Experts blurb */}
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 rounded-xl bg-(--brand-orange) flex items-center justify-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='w-5 h-5'>
                    <path d='M12 2C9.24 2 7 4.24 7 7v4H5v10h14V11h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v4H9V7c0-1.66 1.34-3 3-3zm-5 9h10v6H7v-6z' />
                  </svg>
                </div>
                <h4 className='text-lg font-bold'>Certified Locksmith Experts</h4>
              </div>
              <p className='text-gray-400 text-sm leading-relaxed max-w-md'>
                At {lead?.businessName || 'our company'}, we take pride in having a team of highly trained locksmith professionals dedicated to your
                security and peace of mind.
              </p>
            </div>
            {/* Right - Let's Talk */}
            <div>
              <h4 className='text-lg font-bold mb-3'>Let&apos;s Talk Security Solutions</h4>
              <p className='text-gray-400 text-sm leading-relaxed mb-6 max-w-md'>
                Whether you need emergency lockout help, a quote for new locks, or a full security assessment, our friendly team is ready to help.
              </p>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='inline-flex items-center gap-2 bg-(--brand-orange) text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-[#e55529] transition-colors'>
                  Get Started Now
                  <span className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2.5}
                      stroke='currentColor'
                      className='w-3 h-3'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25' />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800'>
          <div className='container mx-auto max-w-7xl px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
            {/* Nav links */}
            <nav className='flex items-center gap-6 text-sm'>
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
            <p className='text-sm text-gray-500'>
              © {new Date().getFullYear()} {lead?.businessName || 'Demo Business'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
