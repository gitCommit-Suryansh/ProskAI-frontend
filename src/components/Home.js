import React from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Chrome,
  FileText,
  TrendingUp,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Award,
} from "lucide-react";

import extensionVideo from "../assets/videos/extension.mp4";
import trackerVideo from "../assets/videos/applicationTracker.mp4";
import resumeVideo from "../assets/videos/resumeOptimizer.mp4";
// import coverVideo from "../assets/videos/cover.mp4";
import heroImage from "../assets/images/image.png";

const features = [
  {
    title: "One-Click Job Applications",
    description:
      "Save hours by applying to jobs instantly using our Chrome extension that auto-fills your details across any job portal with perfect accuracy.",
    icon: Chrome,
    video: extensionVideo,
  },
  {
    title: "Application Tracker Dashboard",
    description:
      "Keep every job you’ve applied to in one organized space. Track application progress, follow-ups, and interviews seamlessly.",
    icon: TrendingUp,
    video: trackerVideo,
  },
  {
    title: "AI Resume Optimizer",
    description:
      "Boost your chances of getting noticed. Our AI scans job descriptions and optimizes your resume to pass ATS filters and impress recruiters.",
    icon: FileText,
    video: resumeVideo,
  },
  {
    title: "Smart Cover Letter Generator",
    description:
      "Generate tailored cover letters instantly. Personal, relevant, and ready to send — crafted uniquely for each job description.",
    icon: Users,
    video: resumeVideo,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-6 shadow-lg bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-white/20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ProskAI
          </h1>
        </motion.div>
        <nav className="space-x-8 text-gray-600 font-medium hidden md:block">
          {["Features", "How It Works", "FAQ"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="hover:text-blue-600 transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        >
          Get Started
        </motion.button>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-lg"
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Job Search</span>
          </motion.div>
          
          <h2 className="text-6xl font-bold leading-tight">
            Apply Smarter, Not Harder — with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ProskAI
            </span>
          </h2>
          
          <p className="text-gray-600 text-xl leading-relaxed">
            Automate job applications, optimize resumes, and track progress —
            all in one intelligent assistant that works 24/7 for your success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
            >
              Try ProskAI Free <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm bg-white/50"
            >
              Watch Demo <PlayCircle className="w-5 h-5" />
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Setup in 2 minutes</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10"
        >
          {/* Hero illustration with enhanced effects */}
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
            ></motion.div>
            <motion.img
              src={heroImage}
              alt="ProskAI hero"
              className="w-[85%] max-w-lg drop-shadow-2xl relative z-10"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative px-10 md:px-20 py-32 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tl from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-lg mb-6">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Premium Features</span>
          </div>
          <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Powerful Features That Save You Time
          </h3>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Everything you need to streamline your job search and land your dream role faster than ever.
          </p>
        </motion.div>

        <div className="space-y-32 relative z-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`flex flex-col lg:flex-row items-center justify-between gap-16 ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                    {feature.title}
                  </h4>
                </motion.div>
                
                <p className="text-gray-600 text-xl leading-relaxed">
                  {feature.description}
                </p>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold cursor-pointer group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>

              <div className="lg:w-1/2 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <video
                    src={feature.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative rounded-3xl shadow-2xl w-[90%] border-2 border-white/50 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="relative px-10 md:px-20 py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-lg mb-6">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Simple Process</span>
          </div>
          <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            How It Works
          </h3>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Get started in minutes and transform your job search experience
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              step: "1",
              title: "Sign Up & Install",
              desc: "Create your ProskAI account and install the Chrome extension to begin.",
              icon: Chrome,
              color: "from-blue-500 to-cyan-500"
            },
            {
              step: "2",
              title: "Apply with One Click",
              desc: "Enable the extension to auto-fill job forms and save hours of manual work.",
              icon: Zap,
              color: "from-purple-500 to-pink-500"
            },
            {
              step: "3",
              title: "Track & Optimize",
              desc: "View all your job applications in one dashboard and use AI tools to improve results.",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500"
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-8 text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {step.step}
                </div>
                
                <h4 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative px-10 md:px-20 py-32 bg-gradient-to-br from-white via-gray-50 to-blue-50/30 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-yellow-200/50 shadow-lg mb-6">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Success Stories</span>
          </div>
          <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Loved by Job Seekers Worldwide
          </h3>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their job search with ProskAI
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              name: "Aarav Mehta",
              role: "Software Engineer",
              text: "ProskAI saved me countless hours applying for jobs. The autofill extension is pure magic!",
              rating: 5,
              avatar: "AM"
            },
            {
              name: "Sneha Kapoor",
              role: "Product Manager",
              text: "The resume optimizer really improved my ATS score. I started getting interview calls within days.",
              rating: 5,
              avatar: "SK"
            },
            {
              name: "Rahul Sharma",
              role: "Data Scientist",
              text: "A must-have for anyone applying to multiple jobs. Tracking applications has never been this easy.",
              rating: 5,
              avatar: "RS"
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-300"></div>
              <div className="relative p-8 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(t.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6 shadow-lg">
                  {t.avatar}
                </div>
                
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">"{t.text}"</p>
                
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                  <p className="text-blue-600 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative px-10 md:px-20 py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Got Questions?</span>
          </div>
          <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Everything you need to know about ProskAI
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          {[
            {
              q: "Is ProskAI free to use?",
              a: "ProskAI offers both free and premium plans. You can start with all basic features for free and upgrade anytime for advanced AI capabilities.",
            },
            {
              q: "How do I install the Chrome extension?",
              a: "Once you sign up, you'll receive a direct link to install and activate the ProskAI extension. It takes less than 2 minutes to set up.",
            },
            {
              q: "Can I track job applications from any site?",
              a: "Yes! ProskAI works across all major job portals including LinkedIn, Naukri, Indeed, AngelList, and 50+ other platforms.",
            },
            {
              q: "How does the AI resume optimizer work?",
              a: "Our AI analyzes job descriptions and optimizes your resume to match ATS requirements, improving your chances of getting noticed by recruiters.",
            },
            {
              q: "Is my data secure with ProskAI?",
              a: "Absolutely. We use enterprise-grade encryption and never share your personal information with third parties. Your data is completely secure.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <details className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 cursor-pointer group-hover:shadow-xl transition-all duration-300">
                <summary className="font-bold text-xl text-gray-900 group-open:text-blue-600 transition-colors duration-300 flex items-center justify-between">
                  <span>{faq.q}</span>
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-lg font-bold">+</span>
                  </motion.div>
                </summary>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 text-gray-600 text-lg leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-3xl font-bold">ProskAI</h4>
              </motion.div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Transform your job search with AI-powered automation. Apply smarter, not harder.
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Sales
                </motion.button>
              </div>
            </div>
            
            <div>
              <h5 className="text-xl font-bold mb-6">Product</h5>
              <ul className="space-y-4 text-gray-300">
                {["Features", "Pricing", "Chrome Extension", "API", "Integrations"].map((item, i) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-xl font-bold mb-6">Support</h5>
              <ul className="space-y-4 text-gray-300">
                {["Help Center", "Documentation", "Community", "Status", "Contact"].map((item, i) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="cursor-pointer hover:text-white transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} ProskAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <motion.span
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
