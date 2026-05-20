import { BlogPost, ServicePage } from '@/lib/types';

export const defaultServices: ServicePage[] = [
  {
    serviceSlug: 'emergency-lockout',
    title: 'Emergency 24/7 Lockout',
    summary: 'Rapid-response non-destructive entry for homes, businesses, and vehicles.',
    htmlContent: `
<h2>Immediate Assistance When You're Locked Out</h2>
<p>Being locked out of your home, office, or vehicle is incredibly stressful.</p>
<p>It always happens at the worst possible time.</p>
<p>Our emergency lockout service is designed to solve your access problems quickly, safely, and without unnecessary costs.</p>

<h3>Our Non-Destructive Approach</h3>
<p>Unlike some operators who immediately reach for the drill, our highly trained technicians specialize in <strong>non-destructive entry methods</strong>.</p>
<p>By using advanced lock-picking tools and bypass techniques, we can often open your door without damaging the lock itself.</p>
<p>This means your existing keys will still work, saving you the expense of a replacement cylinder.</p>

<h3>When Might We Need to Change a Lock?</h3>
<p>While we aim to pick every lock, modern high-security locks (like 3-Star TS007 cylinders) are specifically designed to resist picking and snapping.</p>
<p>If we have to bypass these high-security mechanisms, we may need to replace the lock.</p>
<p>However, we will <em>always</em> explain the situation and agree on pricing before undertaking any destructive entry.</p>

<h3>Fast Response Times</h3>
<ul>
<li><strong>Local Dispatch:</strong> Our vans are stationed locally to ensure we can reach you within 30-45 minutes on average.</li>
<li><strong>24/7 Availability:</strong> We do not charge inflated premium rates just because you call at 2 AM.</li>
<li><strong>Fully Stocked:</strong> Should your lock need replacing, our vans carry a wide array of British Standard locks, so we manage the situation in a single visit.</li>
</ul>

<p>If you are currently locked out, do not wait.</p>
<p><a href="tel:07000000000" class="font-bold text-[--brand-orange] hover:underline">Click here to call our emergency dispatch team immediately.</a></p>
    `,
  },
  {
    serviceSlug: 'lock-replacement',
    title: 'Lock Replacement & Upgrades',
    summary: 'High-security anti-snap locks and deadbolts installed to British Standards.',
    htmlContent: `
<h2>Upgrade Your Security with British Standard Locks</h2>
<p>Many homeowners are unaware that the locks securing their front and back doors run the risk of failing modern security standards.</p>
<p>"Lock snapping" is a common method used by intruders to break into homes with UPVC or composite doors in under 15 seconds.</p>
<p>Our <a href="./upvc-doors" class="text-[--brand-orange] hover:underline">UPVC Door specialists</a> can replace your vulnerable cylinders with high-security alternatives.</p>

<h3>Why Upgrade?</h3>
<p>A lock replacement is highly recommended when:</p>
<ul>
<li>You have just moved into a new property and don't know who has spare keys</li>
<li>Your current locks are sticking, jamming, or difficult to turn</li>
<li>You want to upgrade to Insurance-Approved BS3621 mortice deadlocks or TS007 3-Star cylinders</li>
<li>You have recently lost your keys or suspect a set has been stolen</li>
</ul>

<h3>Our Installation Standards</h3>
<p>Our locksmiths exclusively install trusted, high-security brands.</p>
<p>Every residential lock replacement is guaranteed to meet or exceed the requirements of standard home insurance policies.</p>
<p>By upgrading, we ensure that your property is protected against snapping, bumping, picking, and drilling.</p>
<br/>
<p>Ready to upgrade your home defense?</p>
<p>Reach out to schedule a <a href="tel:07000000000" class="text-[--brand-orange] hover:underline font-bold">free home security assessment</a>.</p>
    `,
  },
  {
    serviceSlug: 'upvc-doors',
    title: 'UPVC Door & Window Locks',
    summary: 'Specialist repair and replacement of multipoint UPVC locking mechanisms.',
    htmlContent: `
<h2>Expert UPVC Door & Window Solutions</h2>
<p>UPVC and composite doors provide excellent insulation and security.</p>
<p>However, their internal mechanisms (multipoint locks) are complex and prone to wear over time.</p>
<p>If your door handle is floppy, stiff, or entirely jammed, you need a specialist.</p>

<h3>Common UPVC Problems We Fix</h3>
<ul>
<li><strong>Jammed Mechanisms:</strong> The door is stuck shut and the handle won't lift. We can open the door without damaging the frame and replace the broken gearbox.</li>
<li><strong>Floppy Handles:</strong> The handle drops down when released, indicating a broken internal spring cassette or mechanism failure.</li>
<li><strong>Door Alignment Issues:</strong> The door drops on its hinges, making it difficult to lock. We can re-align the door by toe-and-heeling the glass panels or adjusting the flag hinges, preventing future mechanism damage.</li>
</ul>

<h3>Cost-Effective Repairs</h3>
<p>Many customers believe they need a whole new door when the multipoint lock fails. This is rarely the case.</p>
<p>We carry dozens of different gearboxes and central mechanisms to repair your existing door quickly.</p>
<p>This provides a solution at a fraction of the cost of a replacement door.</p>
<br />
<p>Do you need to secure a new window locking handle or upgrade your euro cylinders?</p>
<p>We do that too! Check out our <a href="./lock-replacement" class="text-[--brand-orange] hover:underline font-bold">Lock Replacement & Upgrades service</a> for more info.</p>
    `,
  },
  {
    serviceSlug: 'commercial-access',
    title: 'Commercial Access Control',
    summary: 'Master key systems, digital locks, and high-security business installations.',
    htmlContent: `
<h2>Protecting Your Business and Assets</h2>
<p>Securing a commercial premises requires a significantly different approach than a residential property.</p>
<p>You must balance high-level security with ease of access for employees, fire safety regulations, and key control.</p>
<p>Our Commercial Access team specializes in tailoring solutions for offices, retail stores, and industrial sites.</p>

<h3>Master Key Suites</h3>
<p>Managing dozens of keys across different departments is inefficient and risky. We design and install comprehensive Master Key systems where:</p>
<ul>
<li>Staff members receive a single key that only opens their authorized doors.</li>
<li>Managers receive a sub-master key for their department.</li>
<li>The business owner holds a Grand Master key that opens every door in the building.</li>
</ul>

<h3>Digital & Smart Access Control</h3>
<p>Move away from physical keys entirely.</p>
<p>We install mechanical push-button locks, electronic keypad entry, and advanced smart-card / fob systems.</p>
<p>If an employee leaves, you don't need to change the locks—simply revoke their fob's access from the central portal.</p>
<br />
<p>Protecting your commercial premises also means dealing with emergencies swiftly.</p>
<p>Our <a href="./burglary-repairs" class="text-[--brand-orange] hover:underline font-bold">Burglary Repairs team</a> is available 24/7 if your business has suffered a break-in.</p>
    `,
  },
  {
    serviceSlug: 'key-cutting',
    title: 'Mobile Key Cutting',
    summary: 'Precision key duplication on-site for mortice, cylinder, and high-security keys.',
    htmlContent: `
<h2>Precision Mobile Key Cutting</h2>
<p>Don't waste time traveling to a high street kiosk only to find the duplicated key doesn't work.</p>
<p>Our fleet of vans is equipped with state-of-the-art key cutting machinery calibrated to duplicate a massive variety of keys flawlessly <em>at your location.</em></p>

<h3>Types of Keys We Cut</h3>
<ul>
<li>Standard cylinder keys (Yale-style) and UPVC door keys</li>
<li>Traditional mortice and deadlock keys</li>
<li>High-security dimple keys and restricted profile keys</li>
<li>Window lock keys, padlock keys, and postbox keys</li>
</ul>

<h3>Guaranteed to Work</h3>
<p>The major advantage of mobile key cutting is that we test the newly cut key in your lock immediately.</p>
<p>If it needs a microscopic adjustment to turn smoothly, we make it right then and there.</p>
<p>High street shops cannot test the lock, leading to frustrating return trips.</p>
<br />
<p>If you're upgrading your security, we can cut extra keys on the spot during our <a href="./lock-replacement" class="text-[--brand-orange] hover:underline font-bold">Lock Replacement</a> service.</p>
    `,
  },
  {
    serviceSlug: 'auto-locksmith',
    title: 'Auto Locksmith Services',
    summary: 'Vehicle entry, transponder key programming, and broken key extraction.',
    htmlContent: `
<h2>Rapid Auto Locksmithing for All Vehicles</h2>
<p>Losing your car keys, locking them inside the vehicle, or breaking a key in the ignition can ruin your entire day.</p>
<p>Our specialist auto locksmith team provides roadside assistance to get you back behind the wheel quickly and safely.</p>

<h3>Damage-Free Vehicle Entry</h3>
<p>Using specialized Lishi decoders and varying techniques, we can pick the door locks of 95%+ of modern cars, vans, and trucks.</p>
<p>We do this without leaving a single scratch on the paintwork or damaging the door seals.</p>
<p>We entirely bypass the costly and damaging "wedge and rod" methods used by some recovery services.</p>

<h3>Key Replacement & Programming</h3>
<p>Modern vehicle keys are complex transponders that communicate with your car's immobilizer.</p>
<p>If you have lost all your keys, we can:</p>
<ul>
<li>Decode your door lock to cut a physical emergency blade</li>
<li>Connect to the vehicle's OBD port to extract the necessary PIN codes</li>
<li>Program a brand new transponder fob to your vehicle and delete the old lost keys from the ECU</li>
</ul>
<p>All of this is done on the side of the road.</p>
<p>This saves you the exorbitant cost and hassle of towing your car to the main dealer.</p>
<br />
<p>Need immediate roadside help?</p>
<p><a href="tel:07000000000" class="text-[--brand-orange] hover:underline font-bold">Get an auto expert on the way.</a></p>
    `,
  },
  {
    serviceSlug: 'burglary-repairs',
    title: 'Burglary Repairs & Boarding',
    summary: 'Immediate post-break-in securing, boarding up, and lock replacement.',
    htmlContent: `
<h2>Emergency Break-In Response</h2>
<p>Experiencing a break-in is traumatic and leaves you feeling incredibly vulnerable.</p>
<p>Our priority in these situations is responding immediately, securing your property, and restoring your peace of mind so you can focus on the recovery process.</p>

<h3>Securing the Premises</h3>
<p>If doors, frames, or windows have been severely damaged to gain entry, we will make the property watertight and physically secure right away.</p>
<p>If the damage is too extensive to immediately refit a door, we provide heavy-duty boarding up services to secure the structure overnight.</p>

<h3>Comprehensive Repairs and Upgrades</h3>
<ul>
<li><strong>Lock Changes:</strong> We immediately change all affected locks, prioritizing high-security anti-snap cylinders to aggressively deter repeat attempts.</li>
<li><strong>Mechanism Repairs:</strong> Intruders often badly damage the internal UPVC gearboxes. We carry stock to replace these on the spot.</li>
<li><strong>Frame Reinforcement:</strong> If the wooden frame has been splintered, we can supply and fit London bars and Birmingham bars to reinforce the structural integrity of the frame.</li>
</ul>

<p>If you have just suffered a break-in, make sure to notify the authorities.</p>
<p>Once you are safe, we will dispatch an emergency technician immediately.</p>
<br />
<p>Consider our <a href="./lock-replacement" class="text-[--brand-orange] hover:underline font-bold">Lock Upgrade services</a> to ensure your property meets modern security standards against future attacks.</p>
    `,
  },
];

export const defaultPosts: BlogPost[] = [
  {
    postSlug: 'how-to-prevent-lock-snapping',
    title: 'How to Prevent Lock Snapping: Protect Your UPVC Doors',
    excerpt:
      'Lock snapping is the most common method burglars use to break into homes with UPVC doors. Here is how you can stop them in their tracks.',
    publishedAt: '2024-03-12',
    htmlContent: `
<p>If your home features UPVC or composite doors, there is a good chance you rely on a Euro Cylinder lock for your security. While these locks are extremely common and convenient, standard variations harbor a critical weakness: they are incredibly vulnerable to a technique known as "lock snapping."</p>

<h3>What is Lock Snapping?</h3>
<p>Lock snapping requires no specialist tools, no heavy machinery, and no advanced lock-picking skills. By using simple physical force on the protruding part of a standard cylinder, an intruder can snap the lock in half and manipulate the internal mechanism to open the door. Shockingly, this can be done in under 15 seconds, making it the preferred entry method for opportunistic burglars.</p>

<h3>The Warning Signs</h3>
<p>Your property is at high risk if:</p>
<ul>
<li>Your lock cylinder protrudes outward from the door handle by more than 3mm.</li>
<li>You have standard unbranded cylinders installed by a property developer over 10 years ago.</li>
<li>There is no "Kitemark" or "3-Star" logo engraved onto the face of the lock where you insert the key.</li>
</ul>

<h3>How to Protect Your Home</h3>
<p>The solution is straightforward and relatively inexpensive compared to the massive cost of a break-in: <strong>Upgrade to Anti-Snap Locks.</strong></p>
<p>Anti-snap locks (specifically those rated TS007 3-Star or SS312 Diamond) are engineered with reinforced steel pins, anti-drill plates, and sacrificial snap lines. If an intruder attempts to snap the lock, the front portion breaks away intentionally, leaving the core mechanism intact, locked, and entirely inaccessible from the outside.</p>

<p>Don't wait until you become a victim. Check out our <a href="../services/lock-replacement" class="text-[--brand-orange] hover:underline">Lock Upgrade service</a> to secure your UPVC doors today.</p>
    `,
  },
  {
    postSlug: 'what-to-do-when-you-lose-your-car-keys',
    title: 'What To Do When You Lose Your Car Keys',
    excerpt:
      'Losing your vehicle keys is a panic-inducing moment. Follow these practical steps to regain access without paying exorbitant dealership prices.',
    publishedAt: '2024-04-05',
    htmlContent: `
<p>We've all been there: you reach into your pocket or bag to grab your car keys, and they simply aren't there. After the frantic retracing of steps, the reality sets in. You've lost your car keys. But before you call an expensive dealership and arrange a tow truck, take a deep breath.</p>

<h3>Step 1: Check Your Insurance and Breakdown Cover</h3>
<p>First, verify if your standard car insurance policy or your roadside breakdown cover involves "key cover." Many modern policies include reimbursement provisions if you need an auto locksmith to cut you a new key. Do not break a window—this will cost you massively in repairs and is entirely unnecessary.</p>

<h3>Step 2: Gather Your Vehicle Information</h3>
<p>When you contact a professional, you need to provide specific information so they can guarantee they have the correct diagnostic equipment and blank transponders. Have the following ready:</p>
<ul>
<li>The Make, Model, and Year of the vehicle</li>
<li>The Vehicle Registration Number (License Plate)</li>
<li>The Vehicle Identification Number (VIN) – usually visible on the dashboard through the windshield</li>
<li>Proof of ownership (V5C logbook or insurance documents)</li>
</ul>

<h3>Step 3: Call an Auto Locksmith, Not the Main Dealer</h3>
<p>If you call a main dealership, you will inevitably have to pay to get the car towed to their garage. Furthermore, you will often wait days or even weeks for replacement keys to be shipped from a manufacturer warehouse in Europe.</p>
<p>A professional <a href="../services/auto-locksmith" class="text-[--brand-orange] hover:underline">Auto Locksmith</a> operates from a mobile workshop. We drive to your location, pick the door locks damage-free, decode the mechanical cuts, provide a new physical key, and program the complex transponder directly to your vehicle's ECU on the roadside. The process usually takes less than an hour, and old, lost keys can be completely erased from the vehicle's memory so they can never be used to steal your car.</p>
    `,
  },
  {
    postSlug: 'spring-security-checklist',
    title: 'The Ultimate Home Security Checklist for Spring',
    excerpt: 'As the weather warms up and we spend more time outside, ensure your home is fully secured with this quick checklist.',
    publishedAt: '2024-04-20',
    htmlContent: `
<p>With longer days and warmer weather on the horizon, we naturally spend more hours away from the home—whether vacationing, socializing, or just spending an afternoon out back in the garden. Unfortunately, the spring and summer months traditionally see an uptick in opportunistic burglaries. Use this professional checklist to evaluate your home's defenses.</p>

<h3>1. Check Window Locks and Restrictors</h3>
<p>We love throwing the windows open to let fresh air in, but it's dangerously easy to leave ground-floor windows open when you walk out to the store. Ensure that all window handles turn smoothly, fully engage, and lock with a key. Furthermore, consider installing window restrictors on ground-floor openings so you can safely ventilate rooms without leaving a gap large enough for an intruder.</p>

<h3>2. Inspect Outbuilding & Shed Security</h3>
<p>Your shed or detached garage often houses thousands of pounds worth of power tools, bicycles, and gardening equipment. Shockingly, they are usually secured with a simple £5 padlock. Upgrade to hardened steel, closed-shackle padlocks combined with heavy-duty hasps that conceal the mounting screws. Additionally, consider locking high-value items to internal floor anchors.</p>

<h3>3. The Garden Gate</h3>
<p>Ensure your side gates and rear access panels have stout, well-maintained bolts on the top and bottom. Burglars prefer entering through the back of a property where they cannot be seen from the street, so a tall, locked fence is an excellent deterrent.</p>

<h3>4. Service UPVC Door Mechanisms</h3>
<p>Changes in temperature and humidity can cause UPVC doors to expand and contract, throwing the multi-point locking mechanisms out of alignment. If you have to lift the handle with excessive force or push hard against the door to lock it, the gearbox is under extreme stress and will inevitably snap. Have a <a href="../services/upvc-doors" class="text-[--brand-orange] hover:underline">professional UPVC specialist</a> re-align the door now before you are locked out permanently!</p>
    `,
  },
];
