import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Fish,
  BookOpen,
  Layers,
  MapPin,
  Moon,
  Waves,
  FileText,
  Menu,
  X,
  Ship,
  PlusCircle,
  Users,
  Calendar,
  MessageSquare,
  ChevronDown,
  CloudSun,
  Anchor,
  Info,
} from 'lucide-react';
import SearchModal, { SearchButton } from './SearchModal';
import ThemeToggle from './ThemeToggle';

const NAV_GROUPS = [
  {
    id: 'clima-pique',
    title: 'Clima y Pique',
    icon: CloudSun,
    items: [
      { name: 'Pronóstico', path: '/', icon: Fish },
      { name: 'Solunar', path: '/calendario', icon: Moon },
      { name: 'Partes', path: '/partes', icon: MessageSquare },
    ],
  },
  {
    id: 'lugares',
    title: 'Lugares',
    icon: MapPin,
    items: [
      { name: 'Diques', path: '/diques', icon: Waves },
      { name: 'Mapa', path: '/mapa', icon: MapPin },
      { name: 'Botes y Guías', path: '/botes', icon: Ship },
    ],
  },
  {
    id: 'tecnica',
    title: 'Técnica',
    icon: Layers,
    items: [
      { name: 'Líneas', path: '/lineas', icon: Layers },
      { name: 'Nudos', path: '/nudos', icon: Anchor },
      { name: 'Planificador', path: '/planificador', icon: Calendar },
    ],
  },
  {
    id: 'info',
    title: 'Info',
    icon: Info,
    items: [
      { name: 'Reglamento', path: '/reglamento', icon: FileText },
      { name: 'Blog', path: '/blog', icon: BookOpen },
    ],
  },
];

export default function NavBar({ onSearchOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const location = useLocation();
  const timeoutRef = useRef(null);
  const navRef = useRef(null);

  const handleSearchToggle = useCallback(() => {
    if (onSearchOpen) {
      onSearchOpen(prev => !prev);
    } else {
      setInternalSearchOpen(prev => !prev);
    }
  }, [onSearchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchToggle();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleSearchToggle]);

  const isItemActive = useCallback((path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  }, [location.pathname]);

  const isGroupActive = useCallback((group) => {
    return group.items.some(item => isItemActive(item.path));
  }, [isItemActive]);

  // Adjust state during render when route changes (idiomatic React pattern)
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setIsOpen(false);
    setActiveDropdown(null);
  }

  const toggleMobileMenu = () => {
    setIsOpen(open => {
      const nextOpen = !open;
      if (nextOpen) {
        const activeGroup = NAV_GROUPS.find(group => isGroupActive(group));
        if (activeGroup) {
          setOpenMobileAccordion(activeGroup.id);
        }
      }
      return nextOpen;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // Dropdown hover timing
  const handleMouseEnter = (groupId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(groupId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  const dropdownTriggerClass = (group) => {
    const active = isGroupActive(group);
    const isExpanded = activeDropdown === group.id;
    return `flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs xl:text-sm transition-colors cursor-pointer select-none ${
      active
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold'
        : isExpanded
        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  const dropdownItemClass = (path) => {
    const active = isItemActive(path);
    return `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
      active
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  const mobileNavLinkClass = (path) => {
    const active = isItemActive(path);
    return `flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-lg font-medium transition-all text-sm ${
      active
        ? 'bg-blue-50 text-blue-700 font-bold dark:bg-blue-900/50 dark:text-blue-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  return (
    <>
      <nav
        ref={navRef}
        onKeyDown={handleKeyDown}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2 tracking-tight hover:opacity-80 transition-opacity"
            >
              <Fish className="h-8 w-8 text-blue-600" />
              Pesca<span className="text-slate-900 dark:text-white">App</span>
            </Link>

            {/* Desktop Menu with 4 Dropdowns */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <div className="flex items-center gap-1 xl:gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-3 mr-1">
                {NAV_GROUPS.map((group) => {
                  const isExpanded = activeDropdown === group.id;
                  return (
                    <div
                      key={group.id}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(group.id)}
                      onMouseLeave={handleMouseLeave}
                      onFocus={() => handleMouseEnter(group.id)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setActiveDropdown(null);
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(prev => prev === group.id ? null : group.id)}
                        aria-expanded={isExpanded}
                        aria-haspopup="true"
                        className={dropdownTriggerClass(group)}
                      >
                        <group.icon className="h-4 w-4 shrink-0" />
                        <span>{group.title}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown panel */}
                      <div
                        className={`absolute top-full left-0 pt-1.5 w-48 z-50 transition-all duration-150 ${
                          isExpanded
                            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                            : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 space-y-0.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className={dropdownItemClass(item.path)}
                            >
                              <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Outside Dropdowns: Search, Theme Toggle, Sumar Servicio */}
              <div className="flex items-center gap-2">
                <SearchButton onClick={handleSearchToggle} />
                <ThemeToggle />
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                <Link
                  to="/sumar-servicio"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-semibold transition-all text-xs border border-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800 shadow-sm"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Sumar Servicio</span>
                </Link>
              </div>
            </div>

            {/* Mobile Header Bar */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchButton onClick={handleSearchToggle} />
              <ThemeToggle />
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 p-2.5 transition-colors dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                onClick={toggleMobileMenu}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation-menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        <div
          id="mobile-navigation-menu"
          role="region"
          aria-label="Menú de navegación móvil"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`lg:hidden fixed inset-x-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 ease-in-out top-16 ${
            isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-md">
            {NAV_GROUPS.map((group) => {
              const isExpanded = openMobileAccordion === group.id;
              const isGroupCurrent = isGroupActive(group);
              return (
                <div
                  key={group.id}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-800/60 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenMobileAccordion(prev => prev === group.id ? null : group.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`accordion-${group.id}`}
                    className={`w-full flex items-center justify-between px-3.5 py-3 min-h-[44px] transition-colors ${
                      isGroupCurrent
                        ? 'bg-blue-50/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold'
                        : 'text-slate-800 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <group.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-sm">{group.title}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`accordion-${group.id}`}
                    className={`transition-all duration-200 ease-in-out ${
                      isExpanded
                        ? 'max-h-60 opacity-100 border-t border-slate-100 dark:border-slate-800 p-1.5'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={mobileNavLinkClass(item.path)}
                        >
                          <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Action buttons outside accordion in mobile */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <Link
                to="/sumar-servicio"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Sumar Servicio</span>
              </Link>
              <Link
                to="/nosotros"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-xl font-medium text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Sobre Nosotros</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {internalSearchOpen && (
        <SearchModal
          onClose={() => setInternalSearchOpen(false)}
          isOpen={internalSearchOpen}
        />
      )}
    </>
  );
}
