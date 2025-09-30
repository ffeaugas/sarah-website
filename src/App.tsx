import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import ScrollButton from './components/ScrollButton';
import ImagePreview, { type SpanData } from './components/ImagePreview';
import PresentationSection from './components/PresentationSection';
import PilatesSection from './components/PilateSection';
import ContactSection from './components/ContactSection';
import { smoothScrollTo } from './utils/animations';
import useMobileView from './hooks/useMobileView';

function App() {
  const [hoveredSpan, setHoveredSpan] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('accueil');

  const spanData = [
    {
      id: 'danceuse',
      text: 'Danseuse',
      image: '/dance.jpg',
      gradient:
        'linear-gradient(120deg, rgba(0,123,255,0.25) 0%, rgba(255,0,123,0.25) 100%)',
      right: '350px',
    },
    {
      id: 'choreographe',
      text: 'Chorégraphe',
      image: '/chore.jpg',
      gradient:
        'linear-gradient(120deg, rgba(0,255,0,0.15) 0%, rgba(222,122,0,0.38) 100%)',
      right: '200px',
    },
    {
      id: 'professeure',
      text: 'Professeure de pilate',
      image: '/teaching.jpg',
      gradient:
        'linear-gradient(120deg, rgba(255,128,0,0.25) 0%, rgba(255,0,0,0.25) 100%)',
      right: '50px',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'presentation', 'pilates', 'contact'];
      const navbarHeight = 100;
      const scrollPosition = window.scrollY + navbarHeight;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <div className="h-screen relative w-full">
      <Navbar activeSection={activeSection} />

      <HeroSection
        spanData={spanData}
        setHoveredSpan={setHoveredSpan}
        hoveredSpan={hoveredSpan}
      />

      <ImagePreview hoveredSpan={hoveredSpan} spanData={spanData} />

      <ScrollButton scrollDown={smoothScrollTo} />

      <PresentationSection />

      <PilatesSection />

      <ContactSection />
    </div>
  );
}

export default App;

interface HeroSectionProps {
  spanData: SpanData[];
  setHoveredSpan: (id: string | null) => void;
  hoveredSpan: string | null;
}

const HeroSection = ({
  spanData,
  setHoveredSpan,
  hoveredSpan,
}: HeroSectionProps) => {
  const { scrollYProgress } = useScroll();
  const isMobile = useMobileView();
  const padding = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
          delay: 0.3,
        }}
        className="lg:top-20 top-14 absolute font-host-grotesk text-gray-900 flex flex-row text-left justify-between w-full px-15"
        style={{ opacity }}
      >
        <motion.h1
          className="z-3 text-[3rem] lg:text-[9rem] font-semibold leading-none font-prata"
          style={{
            letterSpacing: '-0.08em',
          }}
        >
          Sarah
          <br />
          Bencharef
        </motion.h1>
        <h2 className="flex flex-col text-[.8rem] lg:text-[2.5rem] font-semibold mt-2 text-gray-800 z-20 text-right">
          {spanData.map((item, index) => (
            <span key={item.id}>
              <span
                className="text-gray-900 hover:text-gray-100 transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSpan(item.id)}
                onMouseLeave={() => setHoveredSpan(null)}
              >
                {item.text}
              </span>
            </span>
          ))}
        </h2>
      </motion.div>
      <motion.div
        className="w-full h-full"
        style={{ padding: isMobile ? '0' : padding }}
      >
        <div className="relative w-full h-full">
          <img
            src={'main-foreground.png'}
            alt="Premier plan devant Sarah Bencharef"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
              zIndex: 4,
            }}
          />
          <img
            src={'main-sarah.png'}
            alt="Sarah Bencharef en équilibre au sommet d'une montagne"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
              zIndex: 3,
            }}
          />
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
              zIndex: 1.5,
            }}
          >
            <img
              src={'main-sky.png'}
              alt="Ciel derrière Sarah Bencharef"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
                zIndex: 0,
              }}
            />
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                background: hoveredSpan
                  ? spanData.find(s => s.id === hoveredSpan)?.gradient
                  : 'transparent',
                borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
                zIndex: 2,
                mixBlendMode: 'multiply',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
