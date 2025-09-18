import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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

export default PilatesSection;
