import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './button'; 

const languages = [
  { code: 'en', name: 'English' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'ar', name: 'العربية' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-600 hover:bg-transparent hover:text-slate-900 focus:outline-none focus:ring-0"
        aria-label="Change Language"
      >
        <Globe className="h-[1.2rem] w-[1.2rem] transition-all" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/90 backdrop-blur-md ring-1 ring-black/5 z-50 overflow-hidden rtl:left-0 rtl:right-auto">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  i18n.language === lang.code 
                    ? 'bg-slate-100/80 text-black font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                }`}
                role="menuitem"
                dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
