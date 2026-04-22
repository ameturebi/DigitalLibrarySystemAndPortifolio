import { Mail, Phone, MapPin } from "lucide-react";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white relative z-10 snap-start">
      {/* Subtle top gradient border for separation */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

      <div className="py-16 px-6 sm:px-12">
        <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Brand / Details */}
          <div className="flex flex-col items-start space-y-4 max-w-sm">
            <div className="text-3xl font-serif font-medium text-slate-900 tracking-tight flex items-center space-x-2 rtl:space-x-reverse">
              <span>{t('hero.title')}</span> <span className="text-primary italic font-light">{t('hero.subtitle_name')}</span>
            </div>
            <p className="text-slate-500 font-light leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-5 text-slate-600 lg:px-8">
            <div className="group flex items-center space-x-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium tracking-wide group-hover:text-primary transition-colors duration-300">+251 91 123 4567</span>
            </div>
            <div className="group flex items-center space-x-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium tracking-wide group-hover:text-primary transition-colors duration-300">contact@mohammedali.com</span>
            </div>
            <div className="group flex items-center space-x-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-medium tracking-wide group-hover:text-primary transition-colors duration-300">{t('footer.location')}</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400">{t('footer.connect')}</h4>
            <SocialLinks size="md" />
          </div>
        </div>
        
        <div className="w-full text-center mt-16 pt-8 border-t border-slate-100 text-slate-400 text-sm font-light tracking-wider" dir="ltr">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
