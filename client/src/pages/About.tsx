
import { motion, type Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import book1 from "@/assets/book-1.png";
import book2 from "@/assets/book-2.png";
import book3 from "@/assets/book-3.png";
import book4 from "@/assets/book-4.png";

import { Navbar } from "@/components/layout/Navbar";
import { SimpleBackground } from "@/components/layout/SimpleBackground";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { DynamicButton } from "@/components/ui/DynamicButton";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import SEO from "@/components/utils/SEO";
import { useTranslation } from "react-i18next";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface BookProps {
  src: string;
  rotation: number;
  x: number;
  y: number;
  zIndex: number;
  delay: number;
}

function BookCard({ src, rotation, x, y, zIndex, delay }: BookProps) {
  const xVal = useMotionValue(0);
  const yVal = useMotionValue(0);

  const rotateX = useTransform(yVal, [-100, 100], [10, -10]);
  const rotateY = useTransform(xVal, [-100, 100], [-10, 10]);

  const springConfig = { damping: 25, stiffness: 400 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: x * 2, y: y * 2, rotateZ: rotation }}
      whileInView={{ opacity: 1, scale: 1, x: x, y: y, rotateZ: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{
        zIndex: zIndex,
        rotateX: springRotateX,
        rotateY: springRotateY,
        perspective: 1200,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        xVal.set(e.clientX - rect.left - rect.width / 2);
        yVal.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        xVal.set(0);
        yVal.set(0);
      }}
      whileHover={{ scale: 1.1, zIndex: 100, transition: { duration: 0.2 } }}
      className="absolute w-40 md:w-56 aspect-[3/4.2] cursor-pointer"
    >
      <div className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-l-sm rounded-r-md overflow-hidden group">
        {/* Book Spine Depth */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/20 z-20" />
        <div className="absolute left-[3px] top-0 bottom-0 w-[10px] bg-black/20 z-10" />
        
        <img 
          src={src} 
          alt="Book cover" 
          className="w-full h-full object-cover transition-transform duration-500" 
        />
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-10 mix-blend-overlay" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </div>
    </motion.div>
  );
}


export default function About() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen font-sans antialiased text-slate-900 relative flex flex-col bg-slate-50">
      <SEO 
        title={t('about.seoTitle')}
        description={t('about.seoDesc')}
        type="profile"
      />
      <SimpleBackground />
      <Navbar />
      
      <div className="flex-1 text-slate-900 font-sans pt-24 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 ml-1" />
              <span>{t('about.heroTitle')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
              {t('hero.title')} <br /> {t('hero.subtitle_name')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-lg">
              {t('about.heroDesc1')}
            </p>
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
              {t('about.heroDesc2')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative"
          >
            <div className="absolute inset-0 bg-amber-200/50 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://i.ytimg.com/vi/Sj1lqH7GQIU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCYlypCi3eDV5IfrbZ6I7kD9atHbA" 
              alt="Mohammed Ali Burhan" 
              className="w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-xl transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Story / Timeline Section */}
      <section className="bg-white py-24 md:py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('about.journeyTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('about.journeySubtitle')}</p>
          </motion.div>

          <div className="space-y-24">
            {/* Timeline Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div 
                className="relative order-2 md:order-1 h-[450px] md:h-[600px] flex items-center justify-center"
              >
                {/* Book Stack Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <BookCard src={book1} rotation={-5} x={-30} y={-80} zIndex={10} delay={0.1} />
                  <BookCard src={book2} rotation={4} x={45} y={-30} zIndex={20} delay={0.2} />
                  <BookCard src={book3} rotation={-8} x={-40} y={40} zIndex={30} delay={0.3} />
                  <BookCard src={book4} rotation={12} x={60} y={80} zIndex={40} delay={0.4} />
                  
                  {/* Decorative Elements */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl -z-10"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl -z-10"
                  />
                </div>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
                className="space-y-6 order-1 md:order-2 md:pl-12 md:rtl:pr-12 md:rtl:pl-0"
              >
                <h3 className="text-3xl font-semibold text-slate-900">{t('about.rootsTitle')}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('about.rootsDesc')}
                </p>
              </motion.div>
            </div>

            {/* Timeline Item 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                className="space-y-6 md:pr-12 md:rtl:pl-12 md:rtl:pr-0"
              >
                <h3 className="text-3xl font-semibold text-slate-900">{t('about.academicTitle')}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('about.academicDesc')}
                </p>
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
              >
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Education" 
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </motion.div>
            </div>

            {/* Timeline Item 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                className="order-2 md:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop" 
                  alt="Writing Journey" 
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
                className="space-y-6 order-1 md:order-2 md:pl-12 md:rtl:pr-12 md:rtl:pl-0"
              >
                <h3 className="text-3xl font-semibold text-slate-900">{t('about.writingTitle')}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('about.writingDesc')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Achievements Section */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t('about.milestonesTitle')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('about.milestonesSubtitle')}</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('about.publishedTitle')}</h3>
              <p className="text-slate-600">{t('about.publishedDesc')}</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('about.awardsTitle')}</h3>
              <p className="text-slate-600">{t('about.awardsDesc')}</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{t('about.lecturesTitle')}</h3>
              <p className="text-slate-600">{t('about.lecturesDesc')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Quote Section */}
      <section className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" alt="Background Texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-amber-500 text-6xl md:text-8xl leading-none font-serif opacity-50 block mb-6">"</span>
            <blockquote className="text-3xl md:text-5xl font-light italic leading-tight mb-8">
              {t('about.quote')}
            </blockquote>
            <cite className="text-xl text-amber-400 font-medium tracking-wide not-italic">{t('about.quoteAuthor')}</cite>
          </motion.div>
        </div>
      </section>

      {/* 6. Impact / Community Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="space-y-8"
            >
              <div className="inline-flex flex-col space-y-2">
                <HeartHandshake className="w-10 h-10 text-amber-600" />
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">{t('about.impactTitle')}</h2>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                {t('about.impactDesc1')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('about.impactDesc2')}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop" 
                alt="Community work" 
                className="w-full h-48 md:h-64 object-cover rounded-xl mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" 
                alt="Seminar" 
                className="w-full h-48 md:h-64 object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">{t('about.ctaTitle')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('about.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
              <Link to="/gallery?tab=Books" className="w-full sm:w-auto">
                <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center space-x-2 w-full">
                  <span>{t('about.ctaBooks')}</span>
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </DynamicButton>
              </Link>
              <Link to="/gallery" className="w-full sm:w-auto">
                <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center space-x-2 w-full">
                  <span>{t('about.ctaGallery')}</span>
                </DynamicButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
      
      <Footer />
    </main>
  );
}
