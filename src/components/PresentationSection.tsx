import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import useMobileView from '../hooks/useMobileView';

const PresentationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const isMobile = useMobileView();

  return (
    <motion.section
      id="presentation"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full h-screen flex lg:flex-row flex-col items-center justify-center lg:px-[20%] gap-10"
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="lg:w-1/2 w-full lg:h-[60%] flex flex-col items-center justify-between lg:gap-0 gap-3 px-4"
      >
        <motion.p
          className="text-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Agée de 28 ans, Sarah Bencharef a commencé sa carrière de danseuse à
          l'école des cons. A la suite de quoi elle apparaitra dans divers
          spéctables gnegnegne. Passionnée par le sport et la méditation, c'est
          finalement dans le pilate qu'elle jetera son dévolu. Elle a
          progressivement fait du pilate son activité principale. En parallèle
          de son activité de danceuse et chorégraphe, elle a commencé à
          enseigner le pilate. Elle attache une grande importance au parcours de
          chacun, que ce soit dans l'intensité physique et émotionnelle des
          séances
        </motion.p>

        {isMobile && <hr className="w-[80%] border-t-2 border-gray-300 " />}

        <motion.div
          className="flex flex-col w-full lg:items-start items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="lg:text-2xl text-lg font-bold lg:leading-12 leading-8">
            Certifications
          </h2>
          <motion.ul
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-blue-950 italic text-sm lg:text-lg"
          >
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Certification Pilates 1
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Certification Pilates 2
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              Ecole de danse de con
            </motion.li>
          </motion.ul>
        </motion.div>

        {isMobile && <hr className="w-[80%] border-t-2 border-gray-300 " />}

        <motion.div
          className="flex flex-col w-full lg:items-start items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="lg:text-2xl text-lg font-bold lg:leading-12 leading-8">
            Expériences
          </h2>
          <motion.ul
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-row gap-10"
          >
            <motion.img
              src={'education-nationale-logo.png'}
              alt="Logo de l'éducation nationale"
              className="lg:w-25 lg:h-25 w-10 h-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <motion.img
              src={'gendarmerie-logo.png'}
              alt="Logo de la gendarmerie nationale"
              className="lg:w-25 lg:h-25 w-10 h-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
            <motion.img
              src={'kine-logo.png'}
              alt="Logo de l'institut kinésithérapie de Paris 11"
              className="lg:w-25 lg:h-25 w-10 h-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            />
          </motion.ul>
        </motion.div>
      </motion.div>

      <motion.img
        src={isMobile ? 'main.jpg' : 'presentation-1.jpg'}
        alt="Sarah Bencharef en équilibre au sommet d'une montagne"
        className="lg:w-1/2 w-full lg:h-[60%] h-[40%] object-cover"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      />
    </motion.section>
  );
};

export default PresentationSection;
