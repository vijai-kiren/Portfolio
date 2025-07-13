import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  User,
  ExternalLink,
  X,
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const sectionsRef = useRef([]);

  /* --- HERO‑specific scroll tracking --- */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const avatarY = useTransform(heroScrollYProgress, [0, 1], [0, 120]); // tweak 120 as needed

  /* --- Page‑wide scroll listener for nav highlighting --- */
  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const timelineData = [
    {
      year: '2004',
      title: 'Born',
      description: 'Beginning of the journey',
      icon: <User className="w-4 h-4" />,
    },
    {
      year: '2008-2022',
      title: 'School Years',
      description: 'Primary and Secondary Education',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      year: '2022',
      title: 'College',
      description:
        'Started BTech in Computer Science at Rajagiri School of Engineering and Technology',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      year: '2024-2025',
      title: 'Technical Co-Lead',
      description: 'Selected as a Technical Co-Lead for HACK CLUB RSET',
      icon: <Award className="w-4 h-4" />,
    },
    {
      year: '2025',
      title: 'Internship at Infionic',
      description: 'Completed the internship in .net MVC ASP framework',
      icon: <Award className="w-4 h-4" />,
    },
  ];
  const certificates = [
    {
      name: 'Introduction to Generative AI in Azure',
      organization: 'Infosys',
      year: '2024',
      image: '/assets/certificates/generative-ai-azure.jpg',
    },
    {
      name: 'IOT Programming using Embedded C and Python',
      organization: 'RSET',
      year: '2024',
      image: '/assets/certificates/iot-programming.jpg',
    },
    // {
    //   name: 'Machine Learning',
    //   organization: 'Udemy',
    //   year: '2025',
    //   image: '/assets/certificates/machine-learning.jpg',
    // },
    {
      name: 'Full Stack Web Development',
      organization: 'Apna College',
      year: '2025',
      image: '/assets/certificates/full-stack-web.jpg',
    },
    {
      name: '.NET MVC Architecture',
      organization: 'Udemy',
      year: '2025',
      image: '/assets/certificates/dotnet-mvc.jpg',
    },
    // {
    //   name: 'Android Development using Kotlin',
    //   organization: 'Udemy',
    //   year: '2025',
    //   image: '/assets/certificates/android-kotlin.jpg',
    // },
  ];

  const navItems = ['Home', 'About', 'Education', 'Timeline', 'Certificates'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(index)}
                  className={`transition-all duration-300 hover:text-blue-400 ${
                    activeSection === index ? 'text-blue-400' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={(el) => {
          sectionsRef.current[0] = el;
          heroRef.current = el;
        }}
        className="min-h-screen flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background gradient that moves slightly */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black-800/20 to-purple-800/20"
          style={{ translateY: avatarY }}
        />

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          {/* Avatar wrapper */}
          <motion.div className="mb-8" style={{ translateY: avatarY }}>
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/image/profile.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            Vijai Kiren S
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            Computer Science Student & Aspiring Developer
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>vijaikiren@outlook.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 7907858808</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Kerala, India</span>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex items-center py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Hi, I'm Vijai Kiren, a final-year Computer Science and Engineering student
                at Rajagiri School of Engineering and Technology, Kochi. I'm passionate 
                about building impactful tech solutions that combine functionality, design,
                and innovation.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With hands-on experience across diverse domains—from web development and machine
                learning—I enjoy bringing ideas to life through code. My key projects include 
                Eventique, an end-to-end event management platform with features like QR-based 
                ticketing, certificate generation, as well as CarTypeCNN, a deep learning model 
                that classifies cars using convolutional neural networks.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold text-blue-400 mb-2">Frontend</h3>
                  <p className="text-gray-300 text-sm">
                    React, JavaScript, HTML/CSS, Tailwind
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold text-purple-400 mb-2">Backend</h3>
                  <p className="text-gray-300 text-sm">
                    Node.js, MySQL, MongoDB
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold text-pink-400 mb-2">Tools</h3>
                  <p className="text-gray-300 text-sm">
                    Git, VS Code
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold text-green-400 mb-2">Languages</h3>
                  <p className="text-gray-300 text-sm">
                     Python, C++
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex items-center py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Education
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Bachelor of Technology in Computer Science
                  </h3>
                  <p className="text-blue-400 font-semibold mb-2">
                    Rajagiri School of Engineering and Technology
                  </p>
                  <p className="text-gray-400 mb-4">2022 - 2026</p>
                  <p className="text-gray-300 leading-relaxed">
                    Currently pursuing BTech in Computer Science with focus on
                    software development.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      CGPA: 8.84
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex items-center py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Journey Timeline
          </motion.h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-start mb-12"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.2, type: 'spring', stiffness: 80, damping: 20 }}
              >
                <div className="absolute left-8 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                  {item.icon}
                </div>
                <div className="ml-20 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="text-blue-400 font-semibold">{item.year}</span>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="min-h-screen flex items-center py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Certifications & Achievements
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 80, damping: 20 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                  <ExternalLink
                    className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer transition-colors"
                    onClick={() => setSelectedCertificate(cert)}
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-blue-400 text-sm mb-1">{cert.organization}</p>
                <p className="text-gray-400 text-sm">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-3xl w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelectedCertificate(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">{selectedCertificate.name}</h3>
            <img
              src={selectedCertificate.image}
              alt={selectedCertificate.name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-blue-400 text-sm mt-4">{selectedCertificate.organization}</p>
            <p className="text-gray-400 text-sm">{selectedCertificate.year}</p>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <motion.footer
        className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h3>
          <p className="text-gray-300 mb-6">
            Always open to discussing new opportunities and collaborations
          </p>
          <div className="flex justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              <span>vijaikiren@outlook.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
              <Phone className="w-4 h-4" />
              <span>+91 7907858808</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
            © 2025 Vijai Kiren S.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Portfolio;