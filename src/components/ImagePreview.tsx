import { motion } from 'framer-motion';
import useMobileView from '../hooks/useMobileView';

export type SpanData = {
  id: string;
  text: string;
  image: string;
  gradient: string;
  right: string;
};

interface ImagePreviewProps {
  hoveredSpan: string | null;
  spanData: SpanData[];
}

const ImagePreview = ({ hoveredSpan, spanData }: ImagePreviewProps) => {
  const isMobile = useMobileView();
  if (isMobile) return null;

  return (
    <div className="fixed top-[60%] right-15 transform -translate-y-1/2 w-120 h-140 z-1">
      {spanData.map((span, index) => (
        <motion.div
          key={span.id}
          initial={{ opacity: 0, y: 32 }}
          animate={{
            opacity: hoveredSpan === span.id ? 1 : 0,
            y: 0,
            scale: hoveredSpan === span.id ? 1 : 0.85,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: index * 0.15,
          }}
          className="absolute w-full h-full flex items-center justify-center"
          style={{ right: span.right }}
        >
          <motion.img
            src={span.image}
            alt={`Image pour ${span.text}`}
            className="w-full h-full object-cover shadow-lg"
            initial={{ scale: 0.9, filter: 'brightness(0.8)' }}
            animate={{
              scale: hoveredSpan === span.id ? 1 : 1,
              filter:
                hoveredSpan === span.id ? 'brightness(1)' : 'brightness(0.6)',
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: index * 0.15 + 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImagePreview;
