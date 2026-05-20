import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { TemplateProps } from '../types';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Phone, Siren, Award, Clock, ShieldCheck, Key, CheckCircle2, Star, Wrench, Home, Car, Shield, CheckCircle } from 'lucide-react';

export function DemoHome({ lead, industry, slug }: TemplateProps) {
  return (
    <div className='space-y-16 lg:space-y-32'>
      {/* ── 1. Hero Section ───────────────────────────────────────────── */}
      <div className='relative rounded-2xl overflow-hidden mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 md:mt-6 h-[calc(100dvh-2rem)] min-h-150 md:min-h-175'>
        {/* Background Image */}
        <Image
          src='https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'
          alt={`${lead?.businessName || 'Locksmith'} - Professional Lock Repair`}
          fill
          priority
          className='object-cover'
        />

        {/* Overlay Mask */}
        <div className='absolute inset-0 bg-black/75 z-10' />

        {/* Hero Text */}
        <div className='absolute inset-0 z-30'>
          <div className='container mx-auto max-w-7xl h-full flex flex-col justify-center px-4 md:px-6'>
            <div className='max-w-3xl mt-16 md:mt-0'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20 backdrop-blur-sm'>
                <span className='w-2 h-2 rounded-full bg-(--brand-orange) animate-pulse' />
                Local & Trusted Experts
              </div>
              <h1 className='text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]'>
                Expert Locksmith {lead?.city ? lead.city : ''} <br />
                <span className='text-(--brand-orange)'>
                  {lead.businessName &&
                    lead.businessName
                      .split(' ')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ')}
                </span>
              </h1>

              <p className='mt-6 sm:mt-8 text-gray-300 text-base sm:text-lg md:text-xl lg:w-3/4 border-l-2 border-(--brand-orange) pl-4 sm:pl-6 py-1 leading-relaxed shadow-sm'>
                Locked out? Need a security upgrade? We deliver rapid, damage-free entry and professional lock fitting across the region. Available
                24/7 for all your residential and commercial security needs.
              </p>

              <div className='mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                <Link href={`tel:${lead?.phone || '07000 000000'}`}>
                  <button className='cursor-pointer group inline-flex items-center justify-center gap-6 bg-(--brand-orange) hover:bg-white border border-transparent rounded-full pl-6 pr-2 py-2 text-base font-bold text-white hover:text-black transition-all ease-in-out duration-500 hover:shadow-xl shadow-[#ff6333]/20'>
                    CALL US NOW
                    <span className='w-10 h-10 rounded-full bg-white group-hover:bg-black flex items-center justify-center shrink-0 transition-all ease-in-out duration-500'>
                      <Phone className='h-4 w-4 text-(--brand-orange) group-hover:text-white group-hover:rotate-12 transition-all ease-in-out duration-500' />
                    </span>
                  </button>
                </Link>
                <Link href={`/${industry}/${slug}/services`} className='mt-2 sm:mt-0'>
                  <button className='cursor-pointer inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white hover:text-gray-900 hover:bg-white transition-all ease-in-out duration-500 border border-white/30 hover:border-white'>
                    View Our Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Who We Are ─────────────────────────────────────────────── */}
      <section className='max-w-7xl px-4 md:px-6 mx-auto'>
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch'>
          {/* Image Container */}
          <div className='flex-1 relative group'>
            <div className='absolute -inset-4 bg-[#ff6333]/10 rounded-3xl -z-10 group-hover:bg-[#ff6333]/20 transition-all ease-in-out duration-500' />
            <Image
              src='https://www.banham.co.uk/media/wysiwyg/lock-repair-body.png'
              alt='Professional Lock Repair and Installation'
              height={800}
              width={800}
              className='w-full h-full rounded-2xl shadow-2xl object-cover'
            />
            {/* Floating Trust Badge */}
            <div className='absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:flex flex-col items-center justify-center min-w-40'>
              <Clock className='h-8 w-8 text-(--brand-orange) mb-2' />
              <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>Rapid Response</p>
              <p className='text-(--brand-orange) font-black text-2xl'>30 MINS</p>
            </div>
          </div>

          {/* Content Container */}
          <div className='flex-1 flex flex-col bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 justify-center group hover:border-[#ff6333]/30 transition-all ease-in-out duration-500'>
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
                <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>Local Security Experts</span>
              </div>

              <h2 className='text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-bold leading-tight tracking-tight'>
                Emergency Locksmith & <br className='hidden sm:block' />
                <span className='text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500'>Security Solutions in {lead?.city}</span>
              </h2>

              <div className='space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed'>
                <p>
                  At <span className='font-bold text-gray-900 capitalize'>{lead?.businessName || 'our company'}</span>, we understand that security
                  emergencies and lockouts don&apos;t wait for business hours. We provide swift, professional responses right when you need us.
                </p>
                <p>
                  With years of specialized experience in <strong className='text-gray-900'>non-destructive entry techniques</strong>, advanced
                  high-security lock installations, and smart access control, we ensure that both residential and commercial properties remain secure
                  against modern threats.
                </p>
              </div>

              {/* Feature List */}
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-4'>
                {[
                  '24/7 Emergency Call-out',
                  'Non-Destructive Entry',
                  'CRB/DBS Checked Staff',
                  'Insurance Approved Locks',
                  'UPVC Door Specialists',
                  'No Call Out Charge',
                ].map((feature) => (
                  <li
                    key={feature}
                    className='flex items-center gap-3 text-[15px] font-semibold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100'
                  >
                    <div className='min-w-2 min-h-2 rounded-full bg-(--brand-orange) shadow-sm' />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className='pt-6'>
                <Link href={`tel:${lead?.phone || ''}`}>
                  <button className='cursor-pointer w-full sm:w-auto group inline-flex items-center justify-between sm:justify-start gap-4 bg-(--brand-orange) hover:bg-black text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold tracking-wide transition-all ease-in-out duration-500 shadow-xl shadow-[#ff6333]/20'>
                    REQUEST ASSISTANCE
                    <span className='w-10 h-10 rounded-full bg-white group-hover:bg-(--brand-orange) shrink-0 flex items-center justify-center transition-all ease-in-out duration-500'>
                      <Phone className='h-4 w-4 text-gray-900 group-hover:text-white group-hover:rotate-12 transition-all ease-in-out duration-500' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Booking Process ──────────────────────────────────────── */}
      <section className='bg-gray-50 py-16 md:py-24'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <div className='text-center mb-12 sm:mb-16'>
            <div className='flex justify-center items-center gap-3 mb-4'>
              <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
              <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>How It Works</span>
              <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight'>Our Simple 4-Step Process</h2>
            <p className='text-base sm:text-lg text-gray-500 max-w-2xl mx-auto'>
              Being locked out or needing a repair is stressful enough. We make getting the right expert to your door simple, fast, and completely
              transparent.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                num: '01',
                title: 'Call Our Hotline',
                desc: 'Reach out to us 24/7. Describe your issue and get a clear, upfront estimate instantly.',
              },
              {
                num: '02',
                title: 'Fast Dispatch',
                desc: 'A local, vetted technician is dispatched immediately, usually arriving within 30 minutes.',
              },
              {
                num: '03',
                title: 'Damage-Free Entry',
                desc: 'We use specialist non-destructive techniques to solve your problem quickly and safely.',
              },
              { num: '04', title: 'Secure & Resolved', desc: 'Your property is secured, and we ensure you are 100% satisfied before we leave.' },
            ].map((step, idx) => (
              <div
                key={idx}
                className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:border-[#ff6333]/50 hover:shadow-xl transition-all ease-in-out duration-500'
              >
                <div className='text-6xl font-black text-gray-100 group-hover:text-[#ff6333]/10 transition-all ease-in-out duration-500 absolute top-4 right-6'>
                  {step.num}
                </div>
                <div className='w-12 h-12 rounded-full bg-[#ff6333]/10 flex items-center justify-center text-(--brand-orange) font-bold mb-6 group-hover:bg-(--brand-orange) group-hover:text-white transition-all ease-in-out duration-500 relative z-10'>
                  {idx + 1}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3 relative z-10'>{step.title}</h3>
                <p className='text-gray-500 leading-relaxed relative z-10'>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Services Grid ────────────────────────────────────────── */}
      <section className='max-w-7xl mx-auto px-4 md:px-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12'>
          <div className='max-w-2xl'>
            <div className='flex items-center gap-3 mb-4'>
              <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
              <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>What We Do</span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight'>
              Discover Our Locksmith Services in {lead?.city}
            </h2>
          </div>
          <Link
            href={`/${industry}/${slug}/services`}
            className='inline-flex items-center gap-2 font-bold text-gray-900 hover:text-(--brand-orange) transition-all ease-in-out duration-500 border-b-2 border-transparent hover:border-(--brand-orange) pb-1 group/link w-max text-sm sm:text-base'
          >
            View All Services &rarr;
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {/* Main big service card */}
          <div className='md:col-span-2 bg-(--dark-bg) rounded-2xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden group'>
            <div className='absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-all ease-in-out duration-500 pointer-events-none'>
              <Key className='w-48 h-48 sm:w-64 sm:h-64 translate-x-12 translate-y-12 sm:translate-x-0 sm:translate-y-0' strokeWidth={1} />
            </div>
            <div className='relative z-10'>
              <div className='inline-flex px-3 py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-md'>
                Priority Service
              </div>
              <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>Emergency 24/7 Lockout</h3>
              <p className='text-gray-400 text-base sm:text-lg max-w-md mb-8 sm:mb-10 leading-relaxed'>
                Locked out of your home or vehicle? Our rapid-response team is on standby 24 hours a day to provide non-destructive entry and get you
                back inside safely.
              </p>
              <Link href={`tel:${lead?.phone || ''}`} className='block sm:inline-block'>
                <button className='cursor-pointer w-full sm:w-auto bg-(--brand-orange) hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full transition-all ease-in-out duration-500'>
                  Call For Emergency Help
                </button>
              </Link>
            </div>
          </div>

          {/* Regular service cards */}
          {[
            {
              id: 'lock-replacement',
              tag: 'Home Security',
              title: 'Lock Replacement & Upgrades',
              desc: 'Anti-snap cylinder locks and deadbolts installed to British Standards.',
              icon: Wrench,
            },
            {
              id: 'upvc-repairs',
              tag: 'Specialist',
              title: 'UPVC Door & Window Locks',
              desc: 'Repair and replacement of faulty multipoint UPVC locking mechanisms.',
              icon: Home,
            },
            {
              id: 'commercial-security',
              tag: 'Business',
              title: 'Commercial Access Control',
              desc: 'Master key systems, digital locks, and high-security installations.',
              icon: Award,
            },
            {
              id: 'key-cutting',
              tag: 'In-Store/Mobile',
              title: 'Mobile Key Cutting',
              desc: 'Precision key duplication on-site for mortice and cylinder keys.',
              icon: Key,
            },
            {
              id: 'auto-locksmith',
              tag: 'Vehicle',
              title: 'Auto Locksmith Services',
              desc: 'Vehicle entry, transponder key programming, and broken key extraction.',
              icon: Car,
            },
            {
              id: 'burglary-repairs',
              tag: 'Emergency',
              title: 'Burglary Repairs & Boarding',
              desc: 'Immediate post-break-in securing, boarding up, and lock replacement.',
              icon: Shield,
            },
          ].map((srv, idx) => (
            <Link
              key={idx}
              href={`/${industry}/${slug}/services/${srv.id}`}
              className='bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-(--brand-orange) hover:shadow-xl transition-all ease-in-out duration-500 group flex flex-col justify-between'
            >
              <div>
                <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-(--brand-orange) mb-6 group-hover:scale-110 transition-all ease-in-out duration-500'>
                  <srv.icon className='w-6 h-6' />
                </div>
                <div className='inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold mb-3 uppercase tracking-wider'>
                  {srv.tag}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-(--brand-orange) transition-colors'>{srv.title}</h3>
                <p className='text-gray-500 leading-relaxed'>{srv.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

       {/* ── 4. Trusted Brands Strip ────────────────────────────────── */}
      <section className='bg-(--dark-bg) py-16'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <p className='text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-8'>Approved Installers &amp; Suppliers Of</p>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-16'>
            {[
              { src: '/brand-era.png', alt: 'ERA Locks' },
              { src: '/brand-legge.png', alt: 'Legge Locks' },
              { src: '/brand-union.png', alt: 'Union Locks' },
              { src: '/brand-chubb.png', alt: 'Chubb Locks' },
              { src: '/brand-yale.png', alt: 'Yale Locks' },
            ].map((brand) => (
              <div key={brand.alt} className='opacity-100 hover:opacity-50 transition-opacity duration-300 grayscale-0 hover:grayscale'>
                <Image src={brand.src} alt={brand.alt} width={160} height={60} className='h-16 w-auto object-contain' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Benefits Grid (Why Choose Us) ────────────────────────── */}
      <section className='bg-white py-16 md:py-24'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
                <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>
                  The {lead?.businessName?.split(' ')[0] || 'Company'} Difference
                </span>
              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight'>
                Why Thousands Trust Us With Their Security
              </h2>
              <p className='text-base sm:text-lg text-gray-500 mb-10'>
                We don&apos;t just install locks; we deliver complete peace of mind. Our reputation is built on reliability, transparency, and expert
                craftsmanship.
              </p>

              <div className='grid sm:grid-cols-2 gap-x-8 gap-y-10'>
                {[
                  { title: 'Fully Vetted Staff', desc: 'All technicians undergo rigorous background checks for your safety.' },
                  { title: 'Transparent Pricing', desc: 'No hidden fees or surprise call-out charges. You agree the price first.' },
                  { title: 'Guaranteed Work', desc: '12-month guarantee on all parts and labor to give you total assurance.' },
                  { title: 'Rapid Response', desc: 'We aim to be at your door within 30-45 minutes for emergencies.' },
                ].map((benefit, i) => (
                  <div key={i}>
                    <div className='w-10 h-10 rounded-full bg-[#ff6333]/10 flex items-center justify-center text-(--brand-orange) mb-4'>
                      <CheckCircle2 className='w-5 h-5' />
                    </div>
                    <h4 className='text-lg font-bold text-gray-900 mb-2'>{benefit.title}</h4>
                    <p className='text-gray-500 text-sm leading-relaxed'>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <div className='absolute -inset-4 bg-(--dark-bg) rounded-3xl -z-10 transform rotate-3' />
              <Image
                src='https://www.banham.co.uk/media/catalog/category/locksmith_scams_header.jpg'
                alt='Trusted Locksmith'
                height={600}
                width={600}
                className='w-full rounded-2xl shadow-xl'
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials ────────────────────────────────────────── */}
      <section className='bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 text-center'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-12 md:mb-16 tracking-tight'>What Our Clients Say</h2>

          <div className='grid md:grid-cols-3 gap-6 sm:gap-8 text-left'>
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Homeowner',
                quote:
                  'I was locked out at 2 AM on a Sunday. They arrived in exactly 20 minutes, picked the lock without breaking my door, and charged exactly what was quoted on the phone. Highly recommend!',
              },
              {
                name: 'David Thompson',
                role: 'Retail Store Manager',
                quote:
                  'Upgraded our shop security with their commercial package. The team was incredibly knowledgeable, explained the British Standard ratings clearly, and did a perfectly clean installation.',
              },
              {
                name: 'Emma Watts',
                role: 'Landlord',
                quote:
                  'I use them for all my rental properties. Always reliable, very fair pricing, and they communicate directly with my tenants to arrange times. Brilliant local service.',
              },
            ].map((review, i) => (
              <div key={i} className='bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between'>
                <div>
                  <div className='flex text-[#ffb800] space-x-1 mb-4 sm:mb-6'>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className='w-5 h-5 fill-current' />
                    ))}
                  </div>
                  <p className='text-gray-600 text-lg italic mb-8'>&quot;{review.quote}&quot;</p>
                </div>
                <div>
                  <h4 className='font-bold text-gray-900 text-lg'>{review.name}</h4>
                  <p className='text-sm text-gray-400'>{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA / Contact Section ─────────────────────────────────── */}
      <section className='max-w-6xl mx-auto px-4 md:px-6 mb-8 md:mb-16'>
        <div className='bg-(--brand-orange) rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden'>
          {/* Decorative elements */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20' />
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10' />

          <div className='relative z-10 max-w-2xl mx-auto'>
            <ShieldCheck className='w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-4 sm:mb-6' />
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6'>Ready To Secure Your Property?</h2>
            <p className='text-white/90 text-lg sm:text-xl font-medium mb-8 sm:mb-10'>
              Don&apos;t leave your security to chance. Get a free, no-obligation quote or request immediate emergency assistance today.
            </p>

            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='cursor-pointer w-full sm:w-auto bg-black text-white hover:bg-gray-900 rounded-full px-8 py-4 text-lg font-bold transition-all ease-in-out duration-500 shadow-xl'>
                  Call {lead?.phone || 'Us Now'}
                </button>
              </Link>
              <button className='cursor-pointer w-full sm:w-auto bg-white text-(--brand-orange) hover:bg-gray-50 rounded-full px-8 py-4 text-lg font-bold transition-all ease-in-out duration-500 shadow-xl'>
                Request A Call Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesIndex({ lead, services, industry, slug }: TemplateProps) {
  return (
    <div className='bg-gray-50 flex-1 w-full'>
      {/* Short Hero */}
      <div className='relative rounded-2xl overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4 h-[40vh] min-h-87.5 max-h-112.5 mb-12 sm:mb-16'>
        <Image
          src='https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'
          alt='Our Services'
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/75 z-10' />
        <div className='absolute inset-0 z-30 container mx-auto max-w-7xl flex flex-col justify-end pb-8 sm:pb-12 px-4 md:px-6'>
          <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
            Comprehensive Locksmith Solutions in {lead?.city}
          </h1>
          <p className='text-gray-300 mt-4 text-base sm:text-lg md:text-xl max-w-2xl border-l-2 border-(--brand-orange) pl-4'>
            From emergency lockouts to enterprise-grade access control, our certified specialists are equipped to handle any situation with speed and
            precision.
          </p>
        </div>
      </div>

      <Container className='py-24 -mt-16'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services?.map((s) => (
            <div
              key={s.serviceSlug}
              className='bg-white border border-gray-200 p-8 rounded-2xl hover:border-(--brand-orange) hover:shadow-2xl transition-all ease-in-out duration-500 group flex flex-col justify-between'
            >
              <div>
                <div className='w-12 h-12 rounded-xl bg-[#ff6333]/10 flex items-center justify-center mb-6 group-hover:bg-(--brand-orange) transition-all ease-in-out duration-500'>
                  <ShieldCheck className='w-6 h-6 text-(--brand-orange) group-hover:text-white transition-all ease-in-out duration-500' />
                </div>
                <h2 className='text-2xl font-bold mb-4 text-gray-900 group-hover:text-(--brand-orange) transition-colors'>{s.title}</h2>
                <p className='text-gray-500 leading-relaxed mb-8'>{s.summary}</p>
              </div>
              <Link href={`/${industry}/${slug}/services/${s.serviceSlug}`}>
                <button className='w-full cursor-pointer bg-gray-50 hover:bg-black text-gray-900 hover:text-white font-bold py-3 px-6 rounded-xl transition-all ease-in-out duration-500 group-hover:shadow-lg'>
                  Explore Service
                </button>
              </Link>
            </div>
          ))}
        </div>
      </Container>

      {/* Trust Indicators Section */}
      <section className='bg-white py-24'>
        <Container>
          <div className='text-center max-w-3xl mx-auto mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Why Partner With Us?</h2>
            <p className='text-gray-500 text-lg'>
              We don&apos;t just fix locks; we provide peace of mind through certified expertise and transparent practices.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-12'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-(--brand-orange)'>
                <ShieldCheck className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Certified Professionals</h3>
              <p className='text-gray-500'>All technicians are fully vetted, insured, and certified to install British Standard hardware.</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-(--brand-orange)'>
                <Clock className='w-8 h-8' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Rapid Response</h3>
              <p className='text-gray-500'>Local vans mean we can reach most emergency calls within 30-45 minutes of dispatch.</p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 text-(--brand-orange)'>
                <svg className='w-8 h-8 fill-current' viewBox='0 0 24 24'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>Transparent Pricing</h3>
              <p className='text-gray-500'>We provide fixed quotes before starting any work. No hidden fees or surprise hourly rates.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className='bg-black py-20 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-8'>Require Custom Security Solutions?</h2>
          <p className='text-gray-400 text-lg mb-10 max-w-2xl mx-auto'>
            If you manage a commercial property or require specialized access control systems, our engineers can design a bespoke solution for your
            needs.
          </p>
          <Link href={`tel:${lead?.phone || ''}`}>
            <button className='cursor-pointer bg-(--brand-orange) hover:bg-white text-white hover:text-black font-bold text-lg px-8 py-4 rounded-full transition-all ease-in-out duration-500 shadow-xl shadow-[#ff6333]/20'>
              Contact Subject Matter Experts
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export function ServiceDetail({ service, lead, industry, slug }: TemplateProps) {
  if (!service) return <div>Service not found</div>;

  return (
    <div className='bg-gray-50 flex-1 w-full'>
      {/* Short Hero */}
      <div className='relative rounded-2xl overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4 h-[40vh] min-h-87.5 max-h-112.5 mb-12 sm:mb-16'>
        <Image
          src='https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'
          alt={service.title}
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/75 z-10' />
        <div className='absolute inset-0 z-30 container mx-auto max-w-7xl flex flex-col justify-end pb-8 sm:pb-12 px-4 md:px-6'>
          <Link
            href={`/${industry}/${slug}/services`}
            className='inline-flex items-center text-(--brand-orange) font-medium text-sm hover:text-white transition-all ease-in-out duration-500 mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full'
          >
            &larr; Back to Services
          </Link>
          <div className='max-w-3xl'>
            <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
              {service.title} in {lead?.city}
            </h1>
            <p className='text-gray-300 mt-4 text-base sm:text-lg md:text-xl border-l-2 border-(--brand-orange) pl-4'>{service.summary}</p>
          </div>
        </div>
      </div>

      <Container className='py-20 -mt-32'>
        <div className='grid lg:grid-cols-3 gap-12 lg:gap-16'>
          {/* Main Content Column */}
          <div className='lg:col-span-2'>
            {/* HTML Body */}
            <div className='prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-(--brand-orange) prose-strong:text-gray-900 prose-li:marker:text-[--brand-orange]'>
              {service.htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: service.htmlContent }} />
              ) : (
                <>
                  <p className='text-xl leading-relaxed text-gray-700 font-medium mb-8 pb-8 border-b border-gray-200'>{service.summary}</p>
                  <p>
                    Every security situation is unique, and our approach to {service.title.toLowerCase()} reflects that. We use industry-approved
                    materials and leverage years of experience to ensure the best possible outcome for your property.
                  </p>
                </>
              )}
            </div>

            <hr className='my-16 border-gray-200' />

            {/* Our Process section */}
            <div className='mb-16'>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>How We Handle {service.title}</h2>
              <div className='space-y-6'>
                {[
                  {
                    step: '01',
                    title: 'Initial Assessment',
                    desc: 'We evaluate your specific security needs or emergency situation immediately upon arriving at your property.',
                  },
                  {
                    step: '02',
                    title: 'Transparent Quotation',
                    desc: 'Before any work begins, we provide a clear, fixed-price quote outlining the labor and hardware costs. No surprises.',
                  },
                  {
                    step: '03',
                    title: 'Professional Execution',
                    desc: 'Our certified engineers complete the work using British Standard materials, ensuring long-lasting security and compliance.',
                  },
                ].map((process, i) => (
                  <div key={i} className='flex gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm'>
                    <div className='text-3xl font-black text-gray-200'>{process.step}</div>
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-2'>{process.title}</h4>
                      <p className='text-gray-500 leading-relaxed'>{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQ */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Frequently Asked Questions</h2>
              <div className='space-y-4'>
                {[
                  {
                    q: `Do you offer warranties on ${service.title.toLowerCase()}?`,
                    a: 'Yes, all of our installations and replacement parts come with a standard 12-month minimum guarantee for your complete peace of mind.',
                  },
                  {
                    q: 'How quickly can you attend my property?',
                    a: 'For emergencies, we aim to be on-site within 30 to 45 minutes of your call. Non-emergencies can usually be scheduled for the same or next day.',
                  },
                  {
                    q: 'Are your engineers fully insured?',
                    a: 'Absolutely. Every technician dispatched to your home or business carries comprehensive public liability insurance and is fully vetted.',
                  },
                ].map((faq, i) => (
                  <div key={i} className='border border-gray-200 rounded-xl p-6 bg-white'>
                    <h4 className='text-lg font-bold text-gray-900 mb-3 flex items-center justify-between'>
                      {faq.q}
                      <span className='text-(--brand-orange)'>+</span>
                    </h4>
                    <p className='text-gray-600'>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div>
            <div className='sticky top-32 mt-32 space-y-8'>
              {/* Emergency Call Box */}
              <div className='bg-black p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10' />
                <Siren className='w-12 h-12 text-(--brand-orange) mx-auto mb-4 relative z-10' />
                <h3 className='text-2xl font-bold mb-2 text-white relative z-10'>Require Assistance?</h3>
                <p className='text-gray-400 mb-6 text-sm relative z-10'>
                  Our dispatch team is standing by 24/7 to assign an engineer to your location.
                </p>
                <Link href={`tel:${lead?.phone || '07000000000'}`}>
                  <button className='w-full cursor-pointer rounded-full bg-(--brand-orange) hover:bg-white text-white hover:text-black font-bold h-14 text-lg transition-all ease-in-out duration-500 relative z-10 shadow-xl shadow-[#ff6333]/20'>
                    Call Now
                  </button>
                </Link>
              </div>

              {/* Contact Form MOCK */}
              <div className='bg-white border border-gray-200 p-8 rounded-2xl shadow-sm'>
                <h3 className='text-xl font-bold mb-6 text-gray-900'>Request a Callback</h3>
                <form className='space-y-4'>
                  <div>
                    <input
                      type='text'
                      placeholder='Full Name'
                      className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-(--brand-orange) focus:ring-2 focus:ring-[#ff6333]/20 outline-none transition-all'
                    />
                  </div>
                  <div>
                    <input
                      type='tel'
                      placeholder='Phone Number'
                      className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-(--brand-orange) focus:ring-2 focus:ring-[#ff6333]/20 outline-none transition-all'
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder='How can we help?'
                      rows={3}
                      className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-(--brand-orange) focus:ring-2 focus:ring-[#ff6333]/20 outline-none transition-all resize-none'
                    ></textarea>
                  </div>
                  <button
                    type='button'
                    className='w-full cursor-pointer rounded-xl bg-gray-900 hover:bg-black text-white font-bold h-12 transition-all ease-in-out duration-500'
                  >
                    Send Request
                  </button>
                </form>
              </div>

              {/* Service Benefits */}
              <div className='bg-gray-50 p-8 rounded-2xl border border-gray-100'>
                <h3 className='text-lg font-bold mb-4 text-gray-900'>Why Choose Us</h3>
                <ul className='space-y-3'>
                  {['No Call-Out Fee', 'Fixed Transparent Pricing', 'Vetted & Insured Staff', '12 Month Guarantee', 'Fast Local Response'].map(
                    (benefit, i) => (
                      <li key={i} className='flex items-center text-sm font-medium text-gray-600'>
                        <CheckCircle className='w-4 h-4 text-(--brand-orange) mr-3 shrink-0' />
                        {benefit}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function BlogIndex({ lead, posts, industry, slug }: TemplateProps) {
  return (
    <div className='bg-gray-50 flex-1 w-full'>
      {/* Short Hero */}
      <div className='relative rounded-2xl overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4 h-[40vh] min-h-87.5 max-h-112.5 mb-12 sm:mb-16'>
        <Image
          src='https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'
          alt='Security Advice & News'
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/75 z-10' />
        <div className='absolute inset-0 z-30 container mx-auto max-w-7xl flex flex-col justify-end pb-8 sm:pb-12 px-4 md:px-6'>
          <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>Security Advice & News in {lead?.city}</h1>
          <p className='text-gray-300 mt-4 text-base sm:text-lg md:text-xl max-w-2xl border-l-2 border-(--brand-orange) pl-4'>
            Expert tips, updates, and guides to keep your property safe.
          </p>
        </div>
      </div>

      <Container className='mb-24'>
        <div className='grid md:grid-cols-2 gap-8'>
          {posts?.map((p) => (
            <Link
              href={`/${industry}/${slug}/blog/${p.postSlug}`}
              key={p.postSlug}
              className='group bg-white rounded-2xl p-8 border border-gray-200 hover:border-(--brand-orange) transition-all ease-in-out duration-500 hover:shadow-lg'
            >
              <span className='inline-block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3'>{p.publishedAt}</span>
              <h2 className='text-2xl font-bold text-gray-900 group-hover:text-(--brand-orange) transition-all ease-in-out duration-500 mb-3'>
                {p.title}
              </h2>
              <p className='text-gray-500 leading-relaxed line-clamp-2'>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function BlogPost({ post, industry, slug }: TemplateProps) {
  if (!post) return <div>Post not found</div>;

  return (
    <div className='bg-gray-50 flex-1 w-full'>
      {/* Short Hero */}
      <div className='relative rounded-2xl overflow-hidden mx-3 sm:mx-4 mt-3 sm:mt-4 h-[40vh] min-h-87.5 max-h-112.5 mb-12 sm:mb-16'>
        <Image
          src='https://www.lockout247.co.uk/wp-content/uploads/2025/03/Reliable-Locksmith-Essex-scaled.jpeg'
          alt={post.title}
          fill
          priority
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/75 z-10' />
        <div className='absolute inset-0 z-30 container mx-auto max-w-7xl flex flex-col justify-end pb-8 sm:pb-12 px-4 md:px-6'>
          <h1 className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>{post.title}</h1>
          <span className='inline-block text-xs sm:text-sm font-bold uppercase tracking-wider text-(--brand-orange) mt-4 border-l-2 border-(--brand-orange) pl-4'>
            {post.publishedAt}
          </span>
        </div>
      </div>

      <Container className='max-w-3xl mb-24'>
        <Link
          href={`/${industry}/${slug}/blog`}
          className='text-gray-500 font-medium text-sm hover:text-(--brand-orange) transition-all ease-in-out duration-500 mb-8 block'
        >
          &larr; Back to Articles
        </Link>
        <article className='prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-(--brand-orange)'>
          {post.htmlContent ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.htmlContent.replace(/\[industry\]/g, industry).replace(/\[slug\]/g, slug)}
            </ReactMarkdown>
          ) : (
            <>
              <p className='text-xl leading-relaxed text-gray-800 font-medium'>{post.excerpt}</p>
              <hr className='my-8' />
              <p>
                Maintaining the security of your property is an ongoing responsibility. When evaluating your home or business defenses, it pays to
                consider the quality of the locks and the surrounding hardware.
              </p>
              <p>
                A high-quality lock installed by a professional can often be the single difference in preventing an unauthorized entry. We always
                advise checking that your locks meet current BS3621 standards to ensure you conform with standard home insurance policies.
              </p>
              <blockquote>
                &quot;An ounce of prevention is worth a pound of cure, especially when it comes to the safety of your family and property.&quot;
              </blockquote>
              <p>If you have questions about upgrading your security or need an immediate assessment, do not hesitate to contact our expert team.</p>
            </>
          )}
        </article>
      </Container>
    </div>
  );
}
