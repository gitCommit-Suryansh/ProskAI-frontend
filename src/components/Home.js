import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// ASSETS - Make sure these paths are correct
import extensionVideo from "../assets/videos/extension.mp4";
import trackerVideo from "../assets/videos/applicationTracker.mp4";
import resumeVideo from "../assets/videos/resumeOptimizer.mp4";
import coverletterVideo from "../assets/videos/coverletterGenerator.mp4";
import heroBrowserMockup from "../assets/images/browser-mockup.png"; // Recommended: A new transparent PNG of your app in a browser

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "One-Click Application",
    description:
      "Our Chrome extension intelligently autofills your details on any job portal, saving you hours of repetitive data entry.",
    icon: Chrome,
    video: extensionVideo,
  },
  {
    title: "Centralized Dashboard",
    description:
      "Monitor every application's status from 'Applied' to 'Hired' in one intuitive dashboard. Never lose track of an opportunity.",
    icon: TrendingUp,
    video: trackerVideo,
  },
  {
    title: "AI Resume Optimization",
    description:
      "Get a competitive edge. Our AI analyzes job descriptions to tailor your resume, ensuring it gets past ATS filters and into human hands.",
    icon: FileText,
    video: resumeVideo,
  },
  {
    title: "Smart Cover Letters",
    description:
      "Generate personalized cover letters in seconds. Our AI crafts compelling narratives that are unique to each job you apply for.",
    icon: Users,
    video: coverletterVideo, // You can replace this with a specific cover letter video
  },
];

const testimonials = [
    {
      name: "Aarav Mehta",
      role: "Software Engineer",
      text: "ProskAI saved me countless hours applying for jobs. The autofill extension is pure magic!",
      avatar: "AM"
    },
    {
      name: "Sneha Kapoor",
      role: "Product Manager",
      text: "The resume optimizer really improved my ATS score. I started getting interview calls within days.",
      avatar: "SK"
    },
    {
      name: "Rahul Sharma",
      role: "Data Scientist",
      text: "A must-have for anyone applying to multiple jobs. Tracking applications has never been this easy.",
      avatar: "RS"
    },
];

export default function Home() {
    const main = useRef();
    const featureSectionRef = useRef(null);
    const videoContainerRef = useRef(null);
    const videoRefs = useRef([]);
    const featureTextRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP Pinned Features Section Animation
            const videos = videoRefs.current;
            const featureTexts = featureTextRefs.current;

            ScrollTrigger.create({
                trigger: featureSectionRef.current,
                start: "top top",
                end: `+=${videos.length * 500}`, // Controls how long the section is pinned
                pin: videoContainerRef.current,
                scrub: 1,
                anticipatePin: 1,
            });

            featureTexts.forEach((text, i) => {
                ScrollTrigger.create({
                    trigger: text,
                    start: "top 60%",
                    end: "bottom 40%",
                    onEnter: () => gsap.to(videos[i], { opacity: 1 }),
                    onLeave: () => gsap.to(videos[i], { opacity: 0 }),
                    onEnterBack: () => gsap.to(videos[i], { opacity: 1 }),
                    onLeaveBack: () => gsap.to(videos[i], { opacity: 0 }),
                });
            });
            // Ensure the first video is visible initially
            gsap.set(videos[0], { opacity: 1 });

        }, main);
        return () => ctx.revert();
    }, []);

    const heroVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

  return (
    <div ref={main} className="min-h-screen flex flex-col text-gray-200 bg-[#0D1117] overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* HEADER */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between px-6 py-3 w-[95%] max-w-5xl bg-gray-900/40 backdrop-blur-lg rounded-full z-50 border border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">ProskAI</h1>
        </motion.div>
        <nav className="hidden md:flex space-x-8 text-gray-300 font-medium">
          {["Features", "Pricing", "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>
        <motion.a
          href="/Dashboard"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-white text-black rounded-full font-semibold transition-all duration-300 hover:bg-gray-200 text-sm"
        >
          Get Started
        </motion.a>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-10 py-32 text-center overflow-hidden">
        {/* Glowing effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-2xl bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>

        <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center gap-8"
        >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">Your AI-Powered Career Copilot</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight max-w-4xl">
                Land Your Dream Job <br/>
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">10x Faster</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                Automate applications, optimize your resume, and track every opportunity with one intelligent platform. Stop the grind, start interviewing.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-3">
                    Try ProskAI Free <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold bg-white/5 backdrop-blur-sm flex items-center gap-3">
                    Watch Demo <PlayCircle className="w-5 h-5" />
                </motion.button>
            </motion.div>
        </motion.div>
        
        {/* Hero Image / Mockup */}
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "anticipate" }}
            className="relative z-0 mt-20 w-full max-w-5xl"
        >
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#0D1117] to-transparent"></div>
            <img src={heroBrowserMockup} alt="ProskAI Dashboard Mockup" className="w-full h-auto drop-shadow-2xl" />
        </motion.div>
      </section>

      {/* GSAP POWERED FEATURES SECTION */}
      <section ref={featureSectionRef} id="features" className="relative py-32 flex flex-col lg:flex-row justify-between items-start gap-16 max-w-7xl mx-auto px-4 md:px-10">
          {/* Left Side: Pinned Video */}
          <div ref={videoContainerRef} className="lg:w-1/2 h-[300px] lg:h-screen w-full flex items-center justify-center sticky top-0">
              <div className="relative w-full max-w-2xl h-[400px] lg:h-[500px] bg-gray-900/50 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {features.map((feature, i) => (
                    <video
                        key={feature.title}
                        ref={el => (videoRefs.current[i] = el)}
                        src={feature.video}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    />
                ))}
              </div>
          </div>
          
          {/* Right Side: Scrolling Text */}
          <div className="lg:w-1/2 flex flex-col gap-32 pt-16">
              {features.map((feature, i) => (
                  <div key={feature.title} ref={el => (featureTextRefs.current[i] = el)} className="min-h-[300px] flex flex-col justify-center">
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 p-6 rounded-xl"
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <feature.icon className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                          </div>
                          <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                      </motion.div>
                  </div>
              ))}
          </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="howitworks" className="py-32 px-4 md:px-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative z-10"
        >
            <h3 className="text-5xl font-bold mb-6 text-white">Get Started in 3 Simple Steps</h3>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Transform your job search from a chore into a strategic advantage in minutes.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-white/20 hidden md:block"></div>
            {[
                { title: "Install & Setup", desc: "Create your account and add our lightweight Chrome extension to your browser.", icon: Chrome, color: "from-blue-500 to-cyan-500" },
                { title: "One-Click Apply", desc: "Navigate to any job board, and let ProskAI handle the form filling and application tracking.", icon: Zap, color: "from-purple-500 to-pink-500" },
                { title: "Optimize & Succeed", desc: "Use your dashboard to track progress and our AI tools to tailor your resume for each role.", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
            ].map((step, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="relative p-8 text-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
                >
                    <motion.div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg mx-auto mb-6`}>
                        <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-bold mb-3 text-white">{step.title}</h4>
                    <p className="text-gray-400">{step.desc}</p>
                </motion.div>
            ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-4 md:px-10 overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <h3 className="text-5xl font-bold mb-6 text-white">Loved By Professionals</h3>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
                >
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, starIndex) => <Star key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" />)}
                    </div>
                    <p className="text-gray-300 italic text-lg mb-6 text-center">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {t.avatar}
                        </div>
                        <div>
                            <h4 className="font-bold text-white">{t.name}</h4>
                            <p className="text-blue-400 font-medium">{t.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 px-4 md:px-10">
        <div className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Revolutionize Your Job Hunt?</h3>
                <p className="text-gray-300 text-xl mb-10">Join thousands of job seekers who are getting ahead with ProskAI. <br/> Sign up for free, no credit card required.</p>
                <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg shadow-lg">
                    Start Winning Today
                </motion.button>
            </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gray-900/50 border-t border-white/10 py-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">ProskAI</h4>
                </div>
                <p className="text-gray-400 max-w-md">
                    Apply smarter, not harder. Your AI co-pilot for the perfect career move.
                </p>
            </div>
            <div>
                <h5 className="text-lg font-bold text-white mb-4">Product</h5>
                <ul className="space-y-3 text-gray-400">
                    {["Features", "Pricing", "Chrome Extension", "Integrations"].map((item) => (
                        <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                    ))}
                </ul>
            </div>
            <div>
                <h5 className="text-lg font-bold text-white mb-4">Support</h5>
                <ul className="space-y-3 text-gray-400">
                    {["Help Center", "FAQ", "Contact Us", "Status"].map((item) => (
                        <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="border-t border-white/10 pt-8 mt-12 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ProskAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}