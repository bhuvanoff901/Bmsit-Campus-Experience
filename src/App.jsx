import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Cpu,
  GraduationCap,
  Landmark,
  Layers3,
  MapPin,
  Menu,
  Microscope,
  Send,
  Sparkles,
  X,
} from 'lucide-react';

const officialSite = 'https://bmsit.ac.in/';

const campusImages = [
  {
    src: '/images/campus-hero.jpg',
    alt: 'A view of the BMSIT&M campus from an official institutional photograph.',
    category: 'Campus',
    label: 'A place to find your perspective',
    className: 'gallery-feature',
  },
  {
    src: '/images/campus-about.jpg',
    alt: 'BMSIT&M campus imagery published by the institution.',
    category: 'Campus',
    label: 'The campus, in its element',
    className: '',
  },
  {
    src: '/images/campus-research.jpg',
    alt: 'Institutional research and learning imagery from BMSIT&M.',
    category: 'Research',
    label: 'Curiosity in motion',
    className: '',
  },
  {
    src: '/images/campus-learning.jpg',
    alt: 'An official BMSIT&M image introducing the institution’s study pathways.',
    category: 'Learning',
    label: 'Room to think differently',
    className: 'gallery-tall',
  },
  {
    src: '/images/campus-research-two.jpg',
    alt: 'Research imagery from the official BMSIT&M website.',
    category: 'Research',
    label: 'Ideas don’t stop at the classroom',
    className: '',
  },
];

const studyPathways = [
  {
    number: '01',
    title: 'Undergraduate',
    detail:
      'Explore undergraduate programmes and current eligibility details directly with the institution.',
    icon: GraduationCap,
    href: `${officialSite}admission-query.php`,
    link: 'View admission information',
  },
  {
    number: '02',
    title: 'Postgraduate',
    detail:
      'Discover postgraduate study options. Refer to the official admissions information for the latest programme list.',
    icon: BookOpen,
    href: `${officialSite}admission-query.php`,
    link: 'Explore postgraduate study',
  },
  {
    number: '03',
    title: 'Research & PhD',
    detail:
      'The official site highlights doctoral study and research. Visit BMSIT&M for current areas and details.',
    icon: Microscope,
    href: `${officialSite}research-scholars.php`,
    link: 'Discover research',
  },
];

const sampleEvents = [
  {
    date: 'DATE TO BE CONFIRMED',
    type: 'ACADEMIC · SAMPLE',
    title: 'Ideas in the making',
    description:
      'An example event-card layout. Replace with an institution-confirmed event and date.',
  },
  {
    date: 'DATE TO BE CONFIRMED',
    type: 'COMMUNITY · SAMPLE',
    title: 'A campus in conversation',
    description:
      'A clearly marked placeholder for an upcoming campus gathering and its verified details.',
  },
  {
    date: 'DATE TO BE CONFIRMED',
    type: 'RESEARCH · SAMPLE',
    title: 'Open questions, new directions',
    description:
      'A sample announcement card. No registration is open; check the official site for updates.',
  },
];

const studentStories = [
  {
    image: '/images/campus-research.jpg',
    category: 'STUDENT PROJECT · PLACEHOLDER',
    title: 'The next story starts here.',
    description:
      'An editorial space for a verified student project or story. Details and student approval needed.',
  },
  {
    image: '/images/campus-learning.jpg',
    category: 'CAMPUS LIFE · PLACEHOLDER',
    title: 'Room for different points of view.',
    description:
      'Replace with a confirmed campus-life story, first-person account or community feature.',
  },
];

function handleImageError(event) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = '/images/image-placeholder.svg';
  if (image.alt.trim()) {
    image.alt = 'Photograph unavailable — replace with institution-approved imagery.';
  }
}

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.2, 0.8, 0.2, 1] } },
};

function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reducedMotion ? undefined : reveal}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span className={`eyebrow${light ? ' eyebrow-light' : ''}`}>
      <span className="eyebrow-mark" aria-hidden="true" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, children, light = false, className = '' }) {
  return (
    <Reveal className={`section-heading${light ? ' section-heading-light' : ''} ${className}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </Reveal>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 26);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    if (menuOpen) menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleMenuKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleMenuKeyDown);
    return () => document.removeEventListener('keydown', handleMenuKeyDown);
  }, [menuOpen]);

  return (
    <header className={`navigation${scrolled ? ' navigation-scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="wordmark" href="#home" aria-label="BMSIT&M home" onClick={closeMenu}>
          <span className="wordmark-symbol" aria-hidden="true">
            B
          </span>
          <span className="wordmark-text">
            BMSIT<span>&</span>M
            <small>ENGINEER YOUR FUTURE</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#academics">Academics</a>
          <a href="#campus">Campus life</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-cta" href="#discovery">
          Explore <ArrowUpRight size={14} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          ref={menuButtonRef}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
          >
            {[
              ['Home', '#home'],
              ['About', '#about'],
              ['Academics', '#academics'],
              ['Campus life', '#campus'],
              ['Events', '#events'],
              ['Contact', '#contact'],
              ['Explore campus', '#discovery'],
            ].map(([label, href]) => (
              <a href={href} key={href} onClick={closeMenu}>
                {label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reducedMotion = useReducedMotion();
  const enter = (delay) =>
    reducedMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.72, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <img className="hero-image" src="/images/campus-hero.jpg" alt="" fetchpriority="high" />
      <div className="hero-overlay" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-atmosphere hero-atmosphere-one" aria-hidden="true" />
      <div className="hero-atmosphere hero-atmosphere-two" aria-hidden="true" />
      <Navigation />

      <div className="hero-content">
        <motion.div className="hero-location" {...enter(0.13)}>
          <span className="location-dot" />
          BENGALURU, INDIA <span className="location-separator">/</span> KARNATAKA
        </motion.div>
        <motion.h1 id="hero-title" {...enter(0.27)}>
          ENGINEER
          <br />
          YOUR <span className="hero-future">FUTURE.</span>
        </motion.h1>
        <motion.div className="hero-bottom" {...enter(0.44)}>
          <p>
            A new perspective on engineering, ideas
            <br className="desktop-break" /> and the world beyond the classroom.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#campus">
              Explore campus <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#about">
              Discover BMSIT <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero-footer">
        <p>ENGINEERING · RESEARCH · POSSIBILITY</p>
        <a className="scroll-cue" href="#about" aria-label="Scroll to discover BMSIT&M">
          SCROLL TO DISCOVER
          <span className="scroll-cue-line">
            <ArrowDown size={14} aria-hidden="true" />
          </span>
        </a>
        <p>BENGALURU · KARNATAKA</p>
      </div>
      <div className="hero-image-note">CAMPUS IMAGE · BMSIT&M OFFICIAL WEBSITE</div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-paper" id="about">
      <div className="about-grid">
        <Reveal className="about-copy">
          <Eyebrow>A different kind of beginning</Eyebrow>
          <h2>
            Built on curiosity.
            <br />
            Looking <span>forward.</span>
          </h2>
          <p>
            BMS Institute of Technology and Management is an engineering and technology
            institution in Bengaluru. Explore an environment shaped by learning, research
            and the ambition to ask better questions.
          </p>
          <a className="text-link" href={`${officialSite}our-founders.php`} target="_blank" rel="noreferrer">
            Discover our story <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <div className="about-note">
            <span className="about-note-mark">B</span>
            <p>
              Curious about admissions?
              <br />
              Start with the institution’s official information.
            </p>
          </div>
        </Reveal>
        <Reveal className="about-visual" delay={0.1}>
          <img
            src="/images/campus-about.jpg"
            alt="An official BMSIT&M campus photograph."
            loading="lazy"
            onError={handleImageError}
          />
          <div className="about-image-caption">
            <Landmark size={16} aria-hidden="true" />
            <span>BMS INSTITUTE OF TECHNOLOGY & MANAGEMENT</span>
          </div>
          <div className="about-image-coordinate">BENGALURU · KARNATAKA</div>
        </Reveal>
      </div>
    </section>
  );
}

function Academics() {
  return (
    <section className="academics section-dark" id="academics">
      <div className="section-container">
        <div className="academics-intro">
          <SectionHeading eyebrow="Learning at BMSIT&M" title="Find your field." light>
            Undergraduate, postgraduate and doctoral study are listed by BMSIT&M. For current
            disciplines, eligibility and admissions, follow the institution’s latest updates.
          </SectionHeading>
          <a
            className="button button-outline"
            href={`${officialSite}admission-query.php`}
            target="_blank"
            rel="noreferrer"
          >
            Official admissions info <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="program-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {studyPathways.map(({ number, title, detail, icon: Icon, href, link }, index) => (
            <Reveal key={title} className="program-wrap" delay={index * 0.08}>
              <article className="program-card">
                <div className="program-card-top">
                  <span>{number} / STUDY PATHWAY</span>
                  <Icon size={20} strokeWidth={1.45} aria-hidden="true" />
                </div>
                <div className="program-art" aria-hidden="true">
                  <div className="art-ring art-ring-one" />
                  <div className="art-ring art-ring-two" />
                  <div className="art-core">
                    <Icon size={32} strokeWidth={1.15} />
                  </div>
                  <span className="art-tick art-tick-one" />
                  <span className="art-tick art-tick-two" />
                  <span className="art-tick art-tick-three" />
                  <span className="art-label">BMSIT&M / {number}</span>
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
                <a className="program-link" href={href} target="_blank" rel="noreferrer">
                  {link} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="source-note">
          Programme information changes. Please confirm current offerings with the official
          admissions office.
        </p>
      </div>
    </section>
  );
}

function CampusGallery() {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const filteredImages =
    category === 'All' ? campusImages : campusImages.filter((image) => image.category === category);
  const categories = ['All', ...new Set(campusImages.map((image) => image.category))];

  function closeGallery() {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      const returnFocus = returnFocusRef.current;
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected) returnFocus.focus();
    });
  }

  useEffect(() => {
    if (activeIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('.lightbox-close')?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + filteredImages.length) % filteredImages.length);
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % filteredImages.length);
      }
      if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!buttons?.length) return;
        const firstButton = buttons[0];
        const lastButton = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === firstButton) {
          event.preventDefault();
          lastButton.focus();
        } else if (!event.shiftKey && document.activeElement === lastButton) {
          event.preventDefault();
          firstButton.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, filteredImages.length]);

  const showImage = (image) => {
    returnFocusRef.current = document.activeElement;
    setActiveIndex(filteredImages.indexOf(image));
  };

  return (
    <section className="gallery-section section-paper" id="campus">
      <div className="section-container">
        <div className="gallery-top">
          <SectionHeading eyebrow="A campus, in focus" title="Take it all in.">
            A closer look at BMSIT&M through imagery published on the institution’s own website.
          </SectionHeading>
          <div className="gallery-filter" role="group" aria-label="Filter campus photographs">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'filter-chip filter-chip-active' : 'filter-chip'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`gallery-grid${filteredImages.length <= 2 ? ' gallery-grid-compact' : ''}`}
          aria-live="polite"
        >
          {filteredImages.map((image) => (
            <button
              className={`gallery-tile ${image.className}${filteredImages.length <= 2 ? ' gallery-tile-filtered' : ''}`}
              key={image.src}
              type="button"
              onClick={() => showImage(image)}
              aria-label={`View image: ${image.label}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onError={handleImageError}
              />
              <span className="gallery-tile-shade" />
              <span className="gallery-tile-category">{image.category} / BMSIT&M</span>
              <span className="gallery-tile-caption">{image.label}</span>
              <span className="gallery-tile-arrow" aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </button>
          ))}
        </div>
        <p className="gallery-footnote">
          Campus imagery: official BMSIT&M website. Select a photograph to expand.
        </p>
      </div>

      <AnimatePresence>
        {activeIndex !== null && filteredImages[activeIndex] ? (
          <motion.div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Campus photo viewer"
            tabIndex={-1}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeGallery();
            }}
          >
            <div className="lightbox-toolbar">
              <span>
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredImages.length).padStart(2, '0')} &nbsp;·&nbsp;{' '}
                {filteredImages[activeIndex].category}
              </span>
              <button
                className="lightbox-close"
                type="button"
                aria-label="Close image viewer"
                onClick={closeGallery}
              >
                <X size={20} />
              </button>
            </div>
            <button
              className="lightbox-arrow lightbox-arrow-left"
              type="button"
              aria-label="Previous campus image"
              onClick={() =>
                setActiveIndex((index) => (index - 1 + filteredImages.length) % filteredImages.length)
              }
            >
              <ArrowLeft size={20} />
            </button>
            <figure className="lightbox-figure">
              <img
                src={filteredImages[activeIndex].src}
                alt={filteredImages[activeIndex].alt}
                onError={handleImageError}
              />
              <figcaption>{filteredImages[activeIndex].label}</figcaption>
            </figure>
            <button
              className="lightbox-arrow lightbox-arrow-right"
              type="button"
              aria-label="Next campus image"
              onClick={() =>
                setActiveIndex((index) => (index + 1) % filteredImages.length)
              }
            >
              <ArrowRight size={20} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Experience() {
  const features = [
    {
      number: '01',
      title: 'Build',
      copy: 'Follow your questions into research, practical learning and what you can make next.',
      icon: Cpu,
      className: 'experience-build',
      visual: 'BUILD / OBSERVE → TEST → REFINE',
    },
    {
      number: '02',
      title: 'Connect',
      copy: 'Make room for shared ideas, different perspectives and new points of view.',
      icon: Layers3,
      className: 'experience-connect',
      visual: 'CONNECT / PEOPLE × IDEAS',
    },
    {
      number: '03',
      title: 'Explore',
      copy: 'Get to know the campus, and see where a different direction might lead.',
      icon: Sparkles,
      className: 'experience-explore',
      visual: 'EXPLORE / OPEN ENDED',
    },
  ];

  return (
    <section className="experience-section section-ink" id="experience">
      <div className="section-container">
        <div className="experience-heading">
          <SectionHeading eyebrow="The bigger picture" title="More than a degree." light>
            What you take with you can start with one good idea — and where you choose to take it.
          </SectionHeading>
          <span className="experience-coordinate" aria-hidden="true">
            YOU ARE HERE <ArrowDownRight size={15} />
          </span>
        </div>
        <div className="experience-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(({ number, title, copy, icon: Icon, className, visual }) => (
            <Reveal key={title}>
              <article className={`experience-card ${className}`}>
                <div className="experience-card-top">
                  <span>{number} — HOW WE GROW</span>
                  <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="experience-visual" aria-hidden="true">
                  <div className="experience-orbit orbit-one" />
                  <div className="experience-orbit orbit-two" />
                  <div className="experience-spark">
                    <Icon size={25} strokeWidth={1.35} />
                  </div>
                  <span>{visual}</span>
                </div>
                <h3>{title}<span>.</span></h3>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="sample-note">
          A student-first perspective. For confirmed facilities, clubs and activities, please refer to
          BMSIT&M directly.
        </p>
      </div>
    </section>
  );
}

function Discovery() {
  const places = [
    {
      number: '01',
      name: 'Academic pathways',
      copy: 'Find current programmes and admissions information.',
      icon: GraduationCap,
      link: `${officialSite}admission-query.php`,
    },
    {
      number: '02',
      name: 'Research & innovation',
      copy: 'Explore research information published by BMSIT&M.',
      icon: Microscope,
      link: `${officialSite}research-scholars.php`,
    },
    {
      number: '03',
      name: 'Visit the campus',
      copy: 'Check the official address and plan your enquiry.',
      icon: MapPin,
      link: '#contact',
    },
  ];

  return (
    <section className="discovery-section section-paper" id="discovery">
      <div className="section-container discovery-grid">
        <div className="discovery-copy">
          <SectionHeading eyebrow="Your first steps" title="Find your way in.">
            A starting point for getting to know the institution. Follow official links for
            up-to-date programme, research and visit information.
          </SectionHeading>
          <div className="map-illustration" aria-label="Illustrative campus discovery graphic; not a campus map">
            <div className="map-grid" aria-hidden="true" />
            <div className="map-orbit map-orbit-a" aria-hidden="true" />
            <div className="map-orbit map-orbit-b" aria-hidden="true" />
            <div className="map-center">
              <Landmark size={22} />
              <span>BMSIT&M</span>
            </div>
            <span className="map-label map-label-a">LEARNING</span>
            <span className="map-label map-label-b">RESEARCH</span>
            <span className="map-label map-label-c">BENGALURU</span>
            <span className="map-caption">ILLUSTRATIVE · NOT A CAMPUS MAP</span>
          </div>
        </div>
        <div className="discovery-links">
          {places.map(({ number, name, copy, icon: Icon, link }, index) => (
            <Reveal key={name} delay={index * 0.07}>
              <a className="discovery-card" href={link}>
                <span className="discovery-number">{number}</span>
                <span className="discovery-icon">
                  <Icon size={19} strokeWidth={1.55} aria-hidden="true" />
                </span>
                <span className="discovery-text">
                  <strong>{name}</strong>
                  <span>{copy}</span>
                </span>
                <ArrowUpRight className="discovery-arrow" size={17} aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="stories-section section-paper">
      <div className="section-container">
        <div className="stories-heading">
          <SectionHeading eyebrow="The human side" title="Stories still unfolding.">
            Student projects and campus stories belong here — always with real people and confirmed details.
          </SectionHeading>
          <span className="stories-status">
            <span /> EDITORIAL SPACE · AWAITING VERIFIED STORIES
          </span>
        </div>
        <div className="stories-grid">
          {studentStories.map((story, index) => (
            <Reveal key={story.category} className="story-card-wrap" delay={index * 0.08}>
              <article className="story-card">
                <div className="story-image">
                  <img src={story.image} alt="" loading="lazy" onError={handleImageError} />
                  <span>{index === 0 ? <Cpu size={24} /> : <Sparkles size={24} />}</span>
                </div>
                <p className="story-category">{story.category}</p>
                <h3>{story.title}</h3>
                <p className="story-description">{story.description}</p>
                <span className="story-link" aria-label="Story to be added when verified">
                  Story details to be confirmed <ArrowRight size={15} aria-hidden="true" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  const [filter, setFilter] = useState('Upcoming');
  const past = filter === 'Past';

  return (
    <section className="events-section section-dark" id="events">
      <div className="section-container">
        <div className="events-top">
          <SectionHeading eyebrow="What’s happening" title="Make room for what’s next." light>
            Event cards are provided as samples. Dates, registrations and schedules must be confirmed
            by the institution before publication.
          </SectionHeading>
          <div className="event-filters" role="group" aria-label="Filter sample events">
            {['Upcoming', 'Past'].map((item) => (
              <button
                className={filter === item ? 'event-filter event-filter-active' : 'event-filter'}
                type="button"
                key={item}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="events-grid grid grid-cols-1 md:grid-cols-3 gap-4" aria-live="polite">
          {sampleEvents.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.07}>
              <article className={`event-card${past ? ' event-card-past' : ''}`}>
                <div className="event-meta">
                  <CalendarDays size={14} aria-hidden="true" />
                  <span>{past ? 'PAST EVENT · SAMPLE' : event.date}</span>
                </div>
                <p className="event-type">{past ? event.type.replace('SAMPLE', 'ARCHIVE SAMPLE') : event.type}</p>
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <span className="event-link">
                  {past ? 'Archive placeholder' : 'Details to be confirmed'}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="source-note source-note-events">
          No event date or registration is represented as official or open. For confirmed notices, check{' '}
          <a href={officialSite} target="_blank" rel="noreferrer">
            bmsit.ac.in
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [formStatus, setFormStatus] = useState(null);
  const reducedMotion = useReducedMotion();

  function handleSubmit(event) {
    event.preventDefault();
    setFormStatus('demo');
    event.currentTarget.reset();
  }

  return (
    <section className="contact-section section-paper" id="contact">
      <div className="section-container contact-grid">
        <div className="contact-info">
          <SectionHeading eyebrow="Start a conversation" title="Let’s talk futures.">
            Find verified contact details or send a frontend-demo enquiry. No message is sent or
            stored by this demonstration.
          </SectionHeading>
          <a className="contact-address" href="https://maps.google.com/?q=BMS+Institute+of+Technology+and+Management+Bengaluru" target="_blank" rel="noreferrer">
            <MapPin size={19} strokeWidth={1.5} aria-hidden="true" />
            <span>
              <strong>Find us in Bengaluru</strong>
              <span>Doddaballapur Main Road, Avalahalli, Yelahanka, Bengaluru – 560119</span>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="contact-details">
            <div>
              <span>ADMISSIONS ENQUIRY</span>
              <a href="tel:08026146800">080-26146800</a>
              <a href="tel:08026146829">080-26146829</a>
            </div>
            <div>
              <span>EMAIL</span>
              <a href="mailto:principal@bmsit.in">principal@bmsit.in</a>
            </div>
          </div>
          <a className="contact-official" href={officialSite} target="_blank" rel="noreferrer">
            Visit the official BMSIT&M website <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <p className="contact-source">Contact details verified against bmsit.ac.in/contact-details.php.</p>
        </div>

        <div className="contact-form-card">
          <div className="form-top">
            <span>YOUR NEXT STEP</span>
            <Send size={17} aria-hidden="true" />
          </div>
          <h3>Send a note.</h3>
          <p className="form-intro">Every field is required. This frontend demo doesn’t deliver messages.</p>
          <form onSubmit={handleSubmit} onChange={() => setFormStatus(null)}>
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" required maxLength={100} placeholder="How should we address you?" />
            </label>
            <label>
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
            </label>
            <label>
              <span>Subject</span>
              <input name="subject" required maxLength={160} placeholder="What would you like to know?" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={3} required maxLength={2000} placeholder="Write your message here..." />
            </label>
            <button className="button button-dark" type="submit">
              Send enquiry <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <p className="form-disclaimer">
              Demo only · no message leaves this browser · please use the verified contacts for real enquiries.
            </p>
            <AnimatePresence>
              {formStatus ? (
                <motion.p
                  className="form-feedback"
                  role="status"
                  initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                >
                  <Check size={16} aria-hidden="true" />
                  Demo complete. Your message was not sent; contact BMSIT&M directly.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-top section-container">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="#home">
            <span className="wordmark-symbol" aria-hidden="true">B</span>
            <span className="wordmark-text">
              BMSIT<span>&</span>M
              <small>ENGINEER YOUR FUTURE</small>
            </span>
          </a>
          <p>BMS Institute of Technology and Management</p>
          <span>Bengaluru, Karnataka, India</span>
        </div>
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            <a href="#about">About</a>
            <a href="#academics">Academics</a>
            <a href="#campus">Campus life</a>
            <a href="#events">Events</a>
          </div>
          <div>
            <span>GET IN TOUCH</span>
            <a href="#contact">Contact</a>
            <a href={`${officialSite}admission-query.php`} target="_blank" rel="noreferrer">
              Admissions
            </a>
            <a href="tel:08026146800">080-26146800</a>
            <a href="mailto:principal@bmsit.in">principal@bmsit.in</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom section-container">
        <p>© {year} BMSIT&M · INFORMATION SUBJECT TO OFFICIAL CONFIRMATION.</p>
        <a href="#home">
          Back to top <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={officialSite} target="_blank" rel="noreferrer">
          Official website <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Hero />
      <main id="main-content">
        <About />
        <Academics />
        <CampusGallery />
        <Experience />
        <Discovery />
        <Events />
        <Stories />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
