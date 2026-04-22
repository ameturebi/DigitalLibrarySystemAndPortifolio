import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/features/HeroSection";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { DynamicButton } from "@/components/ui/DynamicButton";
import SEO from "@/components/utils/SEO";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="w-full h-screen font-sans antialiased text-slate-900 relative bg-transparent overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      <SEO 
        title={t('home.seoTitle')}
        description={t('home.seoDesc')}
      />
      
      {/* 
        CRITICAL BACKGROUND RENDER 
        Locked using fixed so it persists while scrolling.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>

      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 w-full min-h-screen snap-start flex flex-col">
        <HeroSection />
      </div>

      {/* About Section */}
      <div id="about-section" className="relative z-10 w-full min-h-screen snap-start flex items-center justify-center bg-white/40 backdrop-blur-sm py-24">
        <div className="text-center space-y-8 max-w-4xl px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">{t('home.aboutTitle')}</h2>
          <p className="text-slate-600 font-light text-lg max-w-2xl mx-auto">
            {t('home.aboutPreview')}
          </p>
          <div className="pt-8 flex justify-center w-full">
            <Link to="/about" className="inline-block w-full sm:w-auto">
              <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center w-full">
                {t('home.aboutBtn')}
              </DynamicButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Gallery Highlight Section */}
      <div id="gallery-section" className="relative z-10 w-full min-h-screen snap-start flex items-center justify-center bg-slate-50/80 backdrop-blur-sm py-24">
        <div className="text-center space-y-8 max-w-4xl px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">{t('home.galleryTitle')}</h2>
          <p className="text-slate-600 font-light text-lg">
            {t('home.galleryPreview')}
          </p>
          <div className="pt-8 flex justify-center w-full">
            <Link to="/gallery" className="inline-block w-full sm:w-auto">
              <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center w-full">
                {t('home.galleryBtn')}
              </DynamicButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 snap-start">
        <Footer />
      </div>

    </main>
  );
}
