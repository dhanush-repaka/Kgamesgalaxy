import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl ${
      isScrolled
        ? 'bg-gaming-card/80 backdrop-blur-lg border border-gaming-border shadow-gaming-lg rounded-2xl px-2'
        : 'bg-gaming-card/60 backdrop-blur-md border border-gaming-border rounded-3xl px-2'
    }`}>
      <div className="mx-auto px-2 py-2 md:py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="cursor-pointer transform hover:scale-110 hover:rotate-3 transition-all duration-300" onClick={() => navigate('/')}>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button
              onClick={() => scrollToSection('latest')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Latest
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
            <button
              onClick={() => scrollToSection('games')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Games
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
            <button
              onClick={() => scrollToSection('announcements')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Announcements
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
            <button
              onClick={() => navigate('/cancel')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Cancel Booking
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gaming-text hover:text-gaming-accent transition-all duration-300 font-medium relative group px-2 py-1"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gaming-accent transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(139,92,246,0.6)]"></span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gaming-accent/5"></span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gaming-text hover:text-gaming-accent hover:bg-gaming-accent/10 transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] group"
            >
              <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Call
            </Button>
            <Button
              className="bg-gaming-accent hover:bg-gaming-accent-hover text-gaming-light font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-gaming hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] relative overflow-hidden group animate-pulse-slow"
              onClick={() => navigate('/booking')}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Calendar className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Book Now</span>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gaming-accent/10 transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ?
              <X className="w-6 h-6 text-gaming-accent animate-spin-once" /> :
              <Menu className="w-6 h-6 text-gaming-text group-hover:text-gaming-accent transition-colors duration-300" />
            }
          </button>
        </div>

        <div className={`lg:hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        } overflow-hidden`}>
          <nav className="py-4 space-y-2 border-t border-gaming-border mt-4 bg-gaming-light/95 backdrop-blur-lg rounded-lg shadow-gaming-lg max-h-[70vh] overflow-y-auto">
            {[
              { label: 'Latest', action: () => scrollToSection('latest'), delay: 'delay-75' },
              { label: 'Games', action: () => scrollToSection('games'), delay: 'delay-100' },
              { label: 'Announcements', action: () => scrollToSection('announcements'), delay: 'delay-150' },
              { label: 'Services', action: () => scrollToSection('services'), delay: 'delay-200' },
              { label: 'Cancel Booking', action: () => navigate('/cancel'), delay: 'delay-[250ms]' },
              { label: 'Contact', action: () => scrollToSection('contact'), delay: 'delay-300' }
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`block w-full text-left text-gaming-text hover:text-gaming-accent hover:bg-gaming-accent/10 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:translate-x-2 hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] ${
                  isMenuOpen ? `animate-slide-in-right ${item.delay}` : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className={`pt-4 space-y-3 px-4 ${isMenuOpen ? 'animate-slide-in-right delay-[350ms]' : ''}`}>
              <Button
                variant="ghost"
                className="w-full justify-center text-gaming-text hover:text-gaming-accent hover:bg-gaming-accent/10 border border-gaming-border transition-all duration-300 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Call Now
              </Button>
              <Button
                className="w-full bg-gaming-accent hover:bg-gaming-accent-hover text-gaming-light font-semibold shadow-gaming py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] relative overflow-hidden group"
                onClick={() => navigate('/booking')}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <Calendar className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Book Now</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;