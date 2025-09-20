import useMobileView from '../hooks/useMobileView';

export type SpanData = {
  id: string;
  text: string;
  image: string;
};

interface ImagePreviewProps {
  hoveredSpan: string | null;
  spanData: SpanData[];
}

const ImagePreview = ({ hoveredSpan, spanData }: ImagePreviewProps) => {
  const isMobile = useMobileView();
  if (isMobile) return null;

  return (
    <div
      className={`fixed top-[50%] right-15 transform -translate-y-1/2 w-96 h-120 transition-opacity duration-2000 ease-out z-20 ${
        hoveredSpan ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {hoveredSpan && (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={spanData.find(item => item.id === hoveredSpan)?.image}
            alt={`Image pour ${spanData.find(item => item.id === hoveredSpan)?.text}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
