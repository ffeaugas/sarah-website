interface ScrollButtonProps {
  scrollDown: (targetId?: string) => void;
}

const ScrollButton = ({ scrollDown }: ScrollButtonProps) => {
  return (
    <button
      onClick={() => scrollDown()}
      className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-10 group rounded-full  backdrop-blur-sm  animate-float-pause"
      aria-label="Faire défiler vers le bas"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        className="text-black group-hover:white transition-colors duration-1000 cursor-pointer"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default ScrollButton;
