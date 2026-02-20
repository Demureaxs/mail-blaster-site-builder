import Link from 'next/link';
import { TemplateProps } from '../types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { Phone, Siren, Award, Clock, ShieldCheck, Key, CheckCircle2, Star, Wrench } from 'lucide-react';

export function DemoHome({ lead, industry, slug }: TemplateProps) {
  return (
    <div className='space-y-16 lg:space-y-32 mb-16 lg:mb-32'>
      {/* ── 1. Hero Section ───────────────────────────────────────────── */}
      <div className='relative rounded-2xl overflow-hidden mx-4 mt-4 h-[calc(100vh-2rem)] min-h-[600px]'>
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
            <div className='max-w-3xl mt-12 md:mt-0'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm'>
                <span className='w-2 h-2 rounded-full bg-(--brand-orange) animate-pulse' />
                Local & Trusted Experts
              </div>
              <h1 className='text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]'>
                Expert Locksmith <br />
                <span className='text-(--brand-orange)'>
                  {lead?.businessName
                    ? lead.businessName
                        .split(' ')
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(' ')
                    : 'Security'}
                </span>
              </h1>

              <p className='mt-8 text-gray-300 text-lg md:text-xl lg:w-3/4 border-l-2 border-(--brand-orange) pl-6 py-1 leading-relaxed shadow-sm'>
                Locked out? Need a security upgrade? We deliver rapid, damage-free entry and professional lock fitting across the region. Available
                24/7 for all your residential and commercial security needs.
              </p>

              <div className='mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                <Link href={`tel:${lead?.phone || '07000 000000'}`}>
                  <button className='group inline-flex items-center justify-between gap-6 bg-white border border-transparent hover:border-gray-200 rounded-full pl-6 pr-2 py-2 text-base font-bold text-gray-900 transition-all duration-300 hover:shadow-xl shadow-white/10'>
                    CALL US NOW: {lead?.phone || '07000 000000'}
                    <span className='w-10 h-10 rounded-full bg-(--brand-orange) group-hover:bg-black flex items-center justify-center transition-colors duration-300'>
                      <Phone className='h-4 w-4 text-white group-hover:rotate-12 transition-transform duration-300' />
                    </span>
                  </button>
                </Link>
                <Link href={`/${industry}/${slug}/services`}>
                  <button className='inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white hover:text-gray-900 hover:bg-white transition-all duration-300 border border-white/30 hover:border-white'>
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
            <div className='absolute -inset-4 bg-(--brand-orange)/10 rounded-3xl -z-10 group-hover:bg-(--brand-orange)/20 transition-colors duration-700' />
            <Image
              src='https://www.banham.co.uk/media/wysiwyg/lock-repair-body.png'
              alt='Professional Lock Repair and Installation'
              height={800}
              width={800}
              className='w-full h-full rounded-2xl shadow-2xl object-cover'
            />
            {/* Floating Trust Badge */}
            <div className='absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:flex flex-col items-center justify-center min-w-[160px]'>
              <Clock className='h-8 w-8 text-(--brand-orange) mb-2' />
              <p className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-1'>Rapid Response</p>
              <p className='text-(--brand-orange) font-black text-2xl'>30 MINS</p>
            </div>
          </div>

          {/* Content Container */}
          <div className='flex-1 flex flex-col bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 justify-center group hover:border-(--brand-orange)/30 transition-colors duration-500'>
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
                <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>Local Security Experts</span>
              </div>

              <h2 className='text-4xl lg:text-5xl text-gray-900 font-bold leading-tight tracking-tight'>
                Emergency Locksmith & <br />
                <span className='text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500'>Security Solutions</span>
              </h2>

              <div className='space-y-4 text-gray-600 text-lg leading-relaxed'>
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
                  <button className='group inline-flex items-center gap-4 bg-(--brand-orange) hover:bg-black text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold tracking-wide transition-all duration-300 shadow-xl shadow-(--brand-orange)/20'>
                    REQUEST ASSISTANCE
                    <span className='w-10 h-10 rounded-full bg-white group-hover:bg-(--brand-orange) flex items-center justify-center transition-colors duration-300'>
                      <Phone className='h-4 w-4 text-gray-900 group-hover:text-white group-hover:rotate-12 transition-transform duration-300' />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Booking Process ──────────────────────────────────────── */}
      <section className='bg-gray-50 py-24'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <div className='text-center mb-16'>
            <div className='flex justify-center items-center gap-3 mb-4'>
              <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
              <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>How It Works</span>
              <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
            </div>
            <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight'>Our Simple 4-Step Process</h2>
            <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
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
                className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:border-(--brand-orange)/50 hover:shadow-xl transition-all duration-300'
              >
                <div className='text-6xl font-black text-gray-100 group-hover:text-(--brand-orange)/10 transition-colors absolute top-4 right-6'>
                  {step.num}
                </div>
                <div className='w-12 h-12 rounded-full bg-(--brand-orange)/10 flex items-center justify-center text-(--brand-orange) font-bold mb-6 group-hover:bg-(--brand-orange) group-hover:text-white transition-colors relative z-10'>
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
            <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight'>Discover Our Professional Services</h2>
          </div>
          <Link
            href={`/${industry}/${slug}/services`}
            className='inline-flex items-center gap-2 font-bold text-gray-900 hover:text-(--brand-orange) transition-colors border-b-2 border-transparent hover:border-(--brand-orange) pb-1'
          >
            View All Services &rarr;
          </Link>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {/* Main big service card */}
          <div className='md:col-span-2 bg-(--dark-bg) rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden group'>
            <div className='absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none'>
              <Key className='w-64 h-64' strokeWidth={1} />
            </div>
            <div className='relative z-10'>
              <div className='inline-flex px-3 py-1 bg-white/10 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-md'>
                Priority Service
              </div>
              <h3 className='text-3xl lg:text-4xl font-bold mb-4'>Emergency 24/7 Lockout</h3>
              <p className='text-gray-400 text-lg max-w-md mb-10 leading-relaxed'>
                Locked out of your home or vehicle? Our rapid-response team is on standby 24 hours a day to provide non-destructive entry and get you
                back inside safely.
              </p>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='bg-(--brand-orange) hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full transition-colors'>
                  Call For Emergency Help
                </button>
              </Link>
            </div>
          </div>

          {/* Regular service cards */}
          {[
            {
              tag: 'Home Security',
              title: 'Lock Replacement & Upgrades',
              desc: 'Anti-snap cylinder locks and deadbolts installed to British Standards.',
              icon: Wrench,
            },
            {
              tag: 'Business',
              title: 'Commercial Access Control',
              desc: 'Master key systems, digital locks, and high-security installations.',
              icon: Award,
            },
          ].map((srv, idx) => (
            <div
              key={idx}
              className='bg-white p-8 rounded-2xl border border-gray-200 hover:border-(--brand-orange) hover:shadow-xl transition-all group flex flex-col justify-between cursor-default'
            >
              <div>
                <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-(--brand-orange) mb-6 group-hover:scale-110 transition-transform'>
                  <srv.icon className='w-6 h-6' />
                </div>
                <div className='inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold mb-3 uppercase tracking-wider'>
                  {srv.tag}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>{srv.title}</h3>
                <p className='text-gray-500 leading-relaxed'>{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Benefits Grid (Why Choose Us) ────────────────────────── */}
      <section className='bg-white py-24'>
        <div className='max-w-7xl mx-auto px-4 md:px-6'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div>
              <div className='flex items-center gap-3 mb-4'>
                <span className='h-0.5 w-8 bg-(--brand-orange) rounded-full'></span>
                <span className='text-(--brand-orange) font-bold tracking-widest uppercase text-sm'>
                  The {lead?.businessName?.split(' ')[0] || 'Company'} Difference
                </span>
              </div>
              <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight'>Why Thousands Trust Us With Their Security</h2>
              <p className='text-lg text-gray-500 mb-10'>
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
                    <div className='w-10 h-10 rounded-full bg-(--brand-orange)/10 flex items-center justify-center text-(--brand-orange) mb-4'>
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
      <section className='bg-gray-50 py-24'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 text-center'>
          <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-16 tracking-tight'>What Our Clients Say</h2>

          <div className='grid md:grid-cols-3 gap-8 text-left'>
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
              <div key={i} className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between'>
                <div>
                  <div className='flex text-[#ffb800] space-x-1 mb-6'>
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
      <section className='max-w-6xl mx-auto px-4 md:px-6 mb-16'>
        <div className='bg-(--brand-orange) rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden'>
          {/* Decorative elements */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20' />
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10' />

          <div className='relative z-10 max-w-2xl mx-auto'>
            <ShieldCheck className='w-16 h-16 text-white mx-auto mb-6' />
            <h2 className='text-4xl lg:text-5xl font-bold text-white mb-6'>Ready To Secure Your Property?</h2>
            <p className='text-white/90 text-xl font-medium mb-10'>
              Don&apos;t leave your security to chance. Get a free, no-obligation quote or request immediate emergency assistance today.
            </p>

            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Link href={`tel:${lead?.phone || ''}`}>
                <button className='w-full sm:w-auto bg-black text-white hover:bg-gray-900 rounded-full px-8 py-4 text-lg font-bold transition-colors shadow-xl'>
                  Call {lead?.phone || 'Us Now'}
                </button>
              </Link>
              <button className='w-full sm:w-auto bg-white text-(--brand-orange) hover:bg-gray-50 rounded-full px-8 py-4 text-lg font-bold transition-colors shadow-xl'>
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
    <Container className='py-12 mt-16 md:mt-24'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900 tracking-tight'>Our Services</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services?.map((s) => (
          <div
            key={s.serviceSlug}
            className='bg-white border border-gray-200 p-8 rounded-2xl hover:border-(--brand-orange) hover:shadow-xl transition-all group group-hover:-translate-y-1'
          >
            <h2 className='text-xl font-bold mb-3 text-gray-900'>{s.title}</h2>
            <p className='text-gray-500 mb-6 leading-relaxed'>{s.summary}</p>
            <Link href={`/${industry}/${slug}/services/${s.serviceSlug}`}>
              <Button variant='ghost' className='pl-0 hover:pl-2 hover:bg-transparent hover:text-(--brand-orange) transition-all font-semibold'>
                Learn More &rarr;
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function ServiceDetail({ service, industry, slug }: TemplateProps) {
  if (!service) return <div>Service not found</div>;

  return (
    <Container className='py-12 mt-16 md:mt-24'>
      <Link
        href={`/${industry}/${slug}/services`}
        className='text-gray-500 font-medium text-sm hover:text-(--brand-orange) transition-colors mb-6 block'
      >
        &larr; Back to Services
      </Link>
      <div className='grid lg:grid-cols-3 gap-12'>
        <div className='lg:col-span-2'>
          <h1 className='text-4xl lg:text-5xl font-bold mb-8 text-gray-900 tracking-tight'>{service.title}</h1>
          <div className='prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-(--brand-orange)'>
            <p className='text-xl leading-relaxed text-gray-700 font-medium mb-8 pb-8 border-b border-gray-200'>{service.summary}</p>
            <p>
              Every security situation is unique, and our approach to {service.title.toLowerCase()} reflects that. We use industry-approved materials
              and leverage years of experience to ensure the best possible outcome for your property.
            </p>
            <h3>Why choose us for this service?</h3>
            <ul>
              <li>Fully certified and vetted locksmiths</li>
              <li>Fixed, transparent pricing with no hidden fees</li>
              <li>Workmanship guaranteed for 12 months</li>
            </ul>
          </div>
        </div>
        <div>
          <div className='bg-gray-50 border border-gray-100 p-8 rounded-2xl sticky top-32 text-center'>
            <Siren className='w-12 h-12 text-(--brand-orange) mx-auto mb-4' />
            <h2 className='text-2xl font-bold mb-4 text-gray-900'>Need Immediate Help?</h2>
            <p className='text-gray-500 mb-6'>Our emergency response team is available 24/7 across the local area.</p>
            <Link href={`tel:07000000000`}>
              <Button size='lg' className='w-full rounded-full bg-(--brand-orange) hover:bg-black text-white font-bold h-12'>
                Call Us Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export function BlogIndex({ posts, industry, slug }: TemplateProps) {
  return (
    <Container className='py-12 mt-16 md:mt-24'>
      <h1 className='text-4xl font-bold mb-10 text-gray-900 tracking-tight'>Security Advice & News</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        {posts?.map((p) => (
          <Link
            href={`/${industry}/${slug}/blog/${p.postSlug}`}
            key={p.postSlug}
            className='group bg-white rounded-2xl p-8 border border-gray-200 hover:border-(--brand-orange) transition-all hover:shadow-lg'
          >
            <span className='inline-block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3'>{p.publishedAt}</span>
            <h2 className='text-2xl font-bold text-gray-900 group-hover:text-(--brand-orange) transition-colors mb-3'>{p.title}</h2>
            <p className='text-gray-500 leading-relaxed line-clamp-2'>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}

export function BlogPost({ post, industry, slug }: TemplateProps) {
  if (!post) return <div>Post not found</div>;

  return (
    <Container className='py-16 mt-16 md:mt-24 max-w-3xl'>
      <Link href={`/${industry}/${slug}/blog`} className='text-gray-500 font-medium text-sm hover:text-(--brand-orange) transition-colors mb-8 block'>
        &larr; Back to Articles
      </Link>
      <div className='mb-10 text-center'>
        <span className='inline-block text-sm font-bold uppercase tracking-wider text-(--brand-orange) mb-4'>{post.publishedAt}</span>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight'>{post.title}</h1>
      </div>
      <article className='prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-(--brand-orange)'>
        <p className='text-xl leading-relaxed text-gray-800 font-medium'>{post.excerpt}</p>
        <hr className='my-8' />
        <p>
          Maintaining the security of your property is an ongoing responsibility. When evaluating your home or business defenses, it pays to consider
          the quality of the locks and the surrounding hardware.
        </p>
        <p>
          A high-quality lock installed by a professional can often be the single difference in preventing an unauthorized entry. We always advise
          checking that your locks meet current BS3621 standards to ensure you conform with standard home insurance policies.
        </p>
        <blockquote>
          "An ounce of prevention is worth a pound of cure, especially when it comes to the safety of your family and property."
        </blockquote>
        <p>If you have questions about upgrading your security or need an immediate assessment, do not hesitate to contact our expert team.</p>
      </article>
    </Container>
  );
}
