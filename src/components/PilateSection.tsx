import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PilatesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section
      className="w-full lg:h-screen h-auto flex flex-col items-center justify-center lg:px-[10%] px-4 gap-10 bg-gray-200 relative py-10 lg:py-0 lg:pb-0 pb-30"
      id="pilates"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex flex-col w-full h-full gap-20 py-[10%]"
      >
        <h1 className="lg:text-4xl text-xl font-bold font-host-grotesk text-center underline">
          Les cours de pilate
        </h1>
        <div className="flex lg:flex-row flex-col justify-center gap-20">
          <div className=" flex flex-col items-start justify-start lg:w-2/3 w-full lg:h-[60%] h-auto lg:gap-10 gap-5 font-host-grotesk">
            <h1 className="lg:text-2xl text-xl font-bold">
              Déroulement d'une séance
            </h1>
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
          <div className="flex flex-col items-start justify-start lg:w-1/3 w-full h-[60%] gap-10 font-host-grotesk">
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

export default PilatesSection;
