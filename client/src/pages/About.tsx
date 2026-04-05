
import { motion, type Variants } from "framer-motion";
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

export default function About() {
  return (
    <main className="min-h-screen font-sans antialiased text-slate-900 relative flex flex-col bg-slate-50">
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
              <Sparkles className="w-4 h-4" />
              <span>Author & Educator</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
              Mohammed Ali <br /> Burhan
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-lg">
              A life dedicated to knowledge, writing, and community.
            </p>
            <div className="w-20 h-1 bg-amber-500 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
              Through decades of diverse experiences and a relentless pursuit of understanding, my journey has been shaped by the power of words to inspire, educate, and transform.
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
              src="https://images.unsplash.com/photo-1725452119240-cafe017c8832?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Mohammed Ali Burhan holding a book" 
              className="w-full h-auto max-h-[600px] object-cover rounded-2xl shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Journey</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Tracing the steps from early curiosity to a lifelong commitment to literature.</p>
          </motion.div>

          <div className="space-y-24">
            {/* Timeline Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
                className="order-2 md:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop" 
                  alt="Early Life" 
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </motion.div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
                className="space-y-6 order-1 md:order-2 md:pl-12"
              >
                <h3 className="text-3xl font-semibold text-slate-900">Early Roots</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Growing up surrounded by profound texts and diverse cultures, my early life was a tapestry of endless questions. It was in the quiet corners of local libraries that I discovered my passion for storytelling and truth.
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
                className="space-y-6 md:pr-12"
              >
                <h3 className="text-3xl font-semibold text-slate-900">Academic Pursuits</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Formal education provided the structural foundation for my thoughts. Delving deep into historical analysis and philosophical literature, I honed my ability to translate complex ideas into accessible narratives.
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
                className="space-y-6 order-1 md:order-2 md:pl-12"
              >
                <h3 className="text-3xl font-semibold text-slate-900">The Writing Journey</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Transitioning from student to author, my books became the medium through which I could converse with the world. Each manuscript represents a chapter of personal growth and collective exploration.
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Milestones & Honors</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Recognition that serves not as a destination, but as encouragement to continue the work.</p>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Published Works</h3>
              <p className="text-slate-600">Author of numerous highly acclaimed books spanning multiple genres and disciplines.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Literary Awards</h3>
              <p className="text-slate-600">Recipient of prestigious awards acknowledging distinguished contributions to modern literature.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Global Lectures</h3>
              <p className="text-slate-600">Invited speaker at international literary festivals and esteemed academic institutions worldwide.</p>
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
              Words are leaves; where they most abound, much fruit of sense beneath is rarely found, unless planted with profound intention.
            </blockquote>
            <cite className="text-xl text-amber-400 font-medium tracking-wide not-italic">— Mohammed Ali Burhan</cite>
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
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Beyond the Pages</h2>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Writing is only half the journey. The true impact of literature is realized when it fosters community dialogue and drives social change. 
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Over the years, I have actively engaged in literacy programs, workshops, and philanthropic initiatives aimed at making education accessible and empowering young voices in our community to tell their own stories.
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Immerse Yourself in the Work</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the books that capture these life experiences, or explore a visual recounting of the journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
              <Link to="/gallery?tab=Books" className="w-full sm:w-auto">
                <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center space-x-2 w-full">
                  <span>Explore Books</span>
                  <ArrowRight className="w-5 h-5" />
                </DynamicButton>
              </Link>
              <Link to="/gallery" className="w-full sm:w-auto">
                <DynamicButton className="h-14 px-8 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-semibold text-lg hover:-translate-y-1 flex items-center justify-center space-x-2 w-full">
                  <span>View Gallery</span>
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
