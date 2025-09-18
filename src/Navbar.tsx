const Navbar = ({ activeSection }) => {
  const navItems = [
    { href: '#presentation', label: 'Présentation', id: 'presentation' },
    { href: '#pilates', label: 'Cours de pilates', id: 'pilates' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const smoothScrollTo = targetId => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetY = targetElement.offsetTop;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime = null;

    function animateScroll(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = t =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      window.scrollTo(0, startY + distance * ease(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <nav className="w-full fixed z-50 flex flex-row items-center justify-center gap-20 py-3 text-lg font-host-grotesk">
      {navItems.map(item => (
        <a
          key={item.id}
          href={item.href}
          onClick={e => handleNavClick(e, item.id)}
          className={`transition-colors duration-300 relative ${
            activeSection === item.id
              ? 'text-gray-500 font-semibold'
              : 'text-gray-900 hover:text-gray-500'
          }`}
        >
          {item.label}
          {activeSection === item.id && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-500 rounded-full border-b border-gray-500" />
          )}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
