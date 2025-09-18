import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from './Navbar';
import ScrollButton from './components/ScrollButton';
import ImagePreview, { type SpanData } from './components/ImagePreview';
import PresentationSection from './components/PresentationSection';

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
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

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

    // Throttle scroll events for better performance
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
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  const scrollDown = () => {
    const targetY = window.innerHeight;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime: number | null = null;

    function animateScroll(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      window.scrollTo(0, startY + distance * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="h-screen relative w-full">
      <Navbar activeSection={activeSection} />

      <HeroSection spanData={spanData} setHoveredSpan={setHoveredSpan} />

      <ImagePreview hoveredSpan={hoveredSpan} spanData={spanData} />

      <ScrollButton scrollDown={scrollDown} />

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
        className="z-10 top-25 right-12 absolute font-host-grotesk text-gray-900 flex flex-col text-right"
        style={{ opacity }}
      >
        <motion.h1 className="text-[8rem] font-semibold leading-none">
          Sarah Bencharef
        </motion.h1>
        <h2 className="text-[2rem] font-semibold mt-2 text-gray-800">
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
      <motion.div className="w-full h-full" style={{ padding }}>
        <img
          src={'main.jpg'}
          alt="Sarah Bencharef en équilibre au sommet d'une montagne"
          className="w-full h-full object-cover rounded-xl"
        />
      </motion.div>
    </>
  );
};

const PilatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section
      className="w-full h-screen flex flex-col items-center justify-center px-[10%] gap-10 bg-gray-200 relative"
      id="pilates"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex flex-col w-full h-full gap-20 py-[10%]"
      >
        <h1 className="text-4xl font-bold font-host-grotesk text-center underline">
          Les cours de pilate
        </h1>
        <div className="flex flex-row justify-center gap-20">
          <div className="flex flex-col items-start justify-start w-2/3 h-[60%] gap-10 font-host-grotesk">
            <h1 className="text-2xl font-bold">Déroulement d'une séance</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quisquam, quos.
            </p>
            <ul className="list-disc pl-5">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam,
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start w-1/3 h-[60%] gap-10 font-host-grotesk">
            <h1 className="text-2xl font-bold">Tarifs</h1>
            <table className="w-full border-separate border-spacing-y-2">
              <tbody>
                <tr>
                  <td className="px-2 py-1">Cours collectif</td>
                  <td className="px-2 py-1">15€ / séance</td>
                </tr>
                <tr>
                  <td className="px-2 py-1">Cours particulier</td>
                  <td className="px-2 py-1">40€ / séance</td>
                </tr>
                <tr>
                  <td className="px-2 py-1">Carte 10 séances (collectif)</td>
                  <td className="px-2 py-1">130€</td>
                </tr>
                <tr>
                  <td className="px-2 py-1">Carte 10 séances (particulier)</td>
                  <td className="px-2 py-1">350€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      <div className="w-full absolute left-0 bottom-0 z-10">
        <img
          src={'mountain-calc.png'}
          alt="Sarah Bencharef en équilibre au sommet d'une montagne"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.section
      className="w-full h-screen flex flex-row items-center justify-center px-[20%] gap-10 bg-black relative"
      id="contact"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>Tarifs</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </motion.div>
    </motion.section>
  );
};
