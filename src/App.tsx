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
    },
    {
      id: 'choreographe',
      text: 'Chorégraphe',
      image: '/chore.jpg',
    },
    {
      id: 'professeure',
      text: 'Professeure de pilate',
      image: '/teaching.jpg',
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

      <HeroSection spanData={spanData} setHoveredSpan={setHoveredSpan} />

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
}

const HeroSection = ({ spanData, setHoveredSpan }: HeroSectionProps) => {
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
        className="z-30 lg:top-25 top-12 lg:right-12 right-4 absolute font-host-grotesk text-gray-900 flex flex-col text-right"
        style={{ opacity }}
      >
        <motion.h1 className="text-[3rem] lg:text-[8rem] font-semibold leading-none">
          Sarah Bencharef
        </motion.h1>
        <h2 className="text-[.8rem] lg:text-[2rem] font-semibold mt-2 text-gray-800">
          {spanData.map((item, index) => (
            <span key={item.id}>
              <span
                className="text-gray-900 hover:text-gray-500 transition-colors duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSpan(item.id)}
                onMouseLeave={() => setHoveredSpan(null)}
              >
                {item.text}
              </span>
              {index < spanData.length - 1 && ' - '}
            </span>
          ))}
        </h2>
      </motion.div>
      <motion.div
        className="w-full h-full"
        style={{ padding: isMobile ? '0' : padding }}
      >
        <img
          src={isMobile ? 'presentation-1.jpg' : 'main.jpg'}
          alt="Sarah Bencharef en équilibre au sommet d'une montagne"
          className="w-full h-full object-cover"
          style={{
            borderRadius: scrollYProgress && !isMobile ? '20px' : '0',
          }}
        />
      </motion.div>
    </>
  );
};
