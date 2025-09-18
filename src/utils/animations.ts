export const smoothScrollTo = (targetId?: string) => {
    let targetY: number;
    if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        targetY = targetElement.offsetTop;
    } else {
        targetY = window.innerHeight;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime: number | null = null;

    function animateScroll(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  };