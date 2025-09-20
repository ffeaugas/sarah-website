import { smoothScrollTo } from './utils/animations';

interface INavbarProps {
  activeSection: string;
}

const Navbar = ({ activeSection }: INavbarProps) => {
  const navItems = [
    { href: '#presentation', label: 'Présentation', id: 'presentation' },
    { href: '#pilates', label: 'Cours de pilates', id: 'pilates' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <nav className="opacity-50 w-full fixed z-50 flex flex-row bg-white items-center justify-center lg:gap-20 gap-10 py-2 lg:text-lg text-sm font-host-grotesk">
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
