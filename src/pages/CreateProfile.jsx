import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2, PlusCircle, Save, Sparkles, User, MapPin, Briefcase,
  GraduationCap, Code, Award, Target, ChevronRight, ChevronLeft,
  CheckCircle, UserCheck, Star, BookOpen, Globe, Users
} from 'lucide-react';
import api from '../api/api';

// --- Configuration and Constants ---
const STEPS = [
  { id: 'basic', title: 'Personal Info', icon: User, description: 'Your name, contact, and social links' },
  { id: 'location', title: 'Location & Skills', icon: MapPin, description: 'Address and key competencies' },
  { id: 'professional', title: 'Professional Details', icon: UserCheck, description: 'Experience, CTC, and preferences' },
  { id: 'experience', title: 'Work Experience', icon: Briefcase, description: 'Your detailed work history' },
  { id: 'education', title: 'Education', icon: GraduationCap, description: 'Educational background' },
  { id: 'projects', title: 'Projects', icon: Code, description: 'Portfolio of your work' },
  { id: 'publications', title: 'Publications', icon: BookOpen, description: 'Published articles or papers' },
  { id: 'certifications', title: 'Certifications & Languages', icon: Award, description: 'Licenses and language skills' },
  { id: 'demographics', title: 'Demographics (Optional)', icon: Users, description: 'Optional diversity information' },
  { id: 'achievements', title: 'Achievements', icon: Star, description: 'List your key achievements' }, // <-- This was missing
  { id: 'review', title: 'Review & Submit', icon: CheckCircle, description: 'Final review of your profile' }
];

// --- Initial State Structures ---
const initialSocials = { portfolio: '', linkedin: '', github: '', twitter: '', other: '' };
const initialAddress = { street: '', city: '', state: '', country: '', zipCode: '' };
const initialExperience = { company: '', role: '', experienceType: 'Job', startDate: '', endDate: '', isCurrent: false, description: '' };
const initialEducation = { school: '', degree: '', fieldOfStudy: '', grade: '' };
const initialProject = { title: '', description: '', technologies: '', githubLink: '', liveDemoLink: '' };
const initialCertification = { name: '', issuer: '', issueDate: '', expiryDate: '', credentialId: '', credentialUrl: '' };
const initialLanguage = { language: '', proficiency: 'Conversational' };
const initialPublication = { title: '', link: '', description: '' };

const initialDetails = {
  personalInfo: {
    firstName: '', lastName: '', pronouns: '',
    demographics: { gender: 'Prefer not to say', ethnicity: '', race: '', disabilityStatus: 'Prefer not to say', veteranStatus: 'Prefer not to say' },
  },
  contactInfo: { email: '', phoneCountryCode: '', phone: '', presentAddress: initialAddress, socials: initialSocials },
  workAuthorization: { nationality: '', usAuthorized: null, sponsorshipRequired: null, citizenshipStatus: '' },
  careerSummary: {
    totalExperienceInYears: '', skills: '', achievements: '',
    experience: [], education: [], projects: [], certifications: [],
    languages: [], publications: []
  },
  jobPreferences: {
    jobType: 'Remote', preferredLocations: '', currentCTC: '', expectedCTC: '', willingToRelocate: false,
    noticePeriod: { available: false, durationInDays: '' },
  },
};

const initialFormState = { profileName: '', resumeUrl: '', details: initialDetails };

// --- Reusable Sub-Components ---

const ExperienceFormItem = ({ experience, index, handleChange, handleRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-blue-600" />
        Experience #{index + 1}
      </h4>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
        aria-label="Remove Experience"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Company *</label>
        <input type="text" placeholder="Enter company name" value={experience.company} onChange={(e) => handleChange(index, 'company', e.target.value)} required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Role/Position *</label>
        <input type="text" placeholder="Enter your role" value={experience.role} onChange={(e) => handleChange(index, 'role', e.target.value)} required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">Experience Type *</label>
        <select value={experience.experienceType} onChange={(e) => handleChange(index, 'experienceType', e.target.value)} required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900">
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
          <option value="Apprenticeship">Apprenticeship</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Start Date</label>
        <input type="date" value={experience.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">End Date</label>
        <input type="date" value={experience.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} disabled={experience.isCurrent} className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 disabled:bg-gray-100" />
      </div>
      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea placeholder="Describe your responsibilities and achievements" value={experience.description} onChange={(e) => handleChange(index, 'description', e.target.value)} rows="3" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none" />
      </div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <label className="flex items-center text-sm text-gray-700 cursor-pointer">
        <input type="checkbox" checked={experience.isCurrent} onChange={(e) => handleChange(index, 'isCurrent', e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <span className="ml-2">Currently work here</span>
      </label>
    </div>
  </motion.div>
);

const EducationFormItem = ({ education, index, handleChange, handleRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-blue-600" />
        Education #{index + 1}
      </h4>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
        aria-label="Remove Education"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">School/Institution *</label>
        <input type="text" placeholder="Enter school name" value={education.school} onChange={(e) => handleChange(index, 'school', e.target.value)} required className="w-full p-4 bg-white/50 border rounded-xl"/>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Degree/Qualification</label>
        <input type="text" placeholder="e.g., Bachelor's" value={education.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl"/>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Field of Study</label>
        <input type="text" placeholder="e.g., Computer Science" value={education.fieldOfStudy} onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl"/>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Grade/GPA</label>
        <input type="text" placeholder="e.g., 3.8 GPA" value={education.grade} onChange={(e) => handleChange(index, 'grade', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl"/>
      </div>
    </div>
  </motion.div>
);

const ProjectFormItem = ({ project, index, handleChange, handleRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Code className="w-5 h-5 text-blue-600" />
        Project #{index + 1}
      </h4>
      <button type="button" onClick={() => handleRemove(index)} className="text-red-500 p-2 rounded-full hover:bg-red-50" aria-label="Remove Project">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">Project Title *</label>
        <input type="text" placeholder="Enter project title" value={project.title} onChange={(e) => handleChange(index, 'title', e.target.value)} required className="w-full p-4 bg-white/50 border rounded-xl" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">Technologies</label>
        <input type="text" placeholder="React, Node.js, MongoDB (comma separated)" value={project.technologies} onChange={(e) => handleChange(index, 'technologies', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">GitHub Link</label>
        <input type="url" placeholder="https://github.com/your/repo" value={project.githubLink} onChange={(e) => handleChange(index, 'githubLink', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Live Demo Link</label>
        <input type="url" placeholder="https://your-project.com" value={project.liveDemoLink} onChange={(e) => handleChange(index, 'liveDemoLink', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl" />
      </div>
      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea placeholder="Describe your project, key features, and your role" value={project.description} onChange={(e) => handleChange(index, 'description', e.target.value)} rows="3" className="w-full p-4 bg-white/50 border rounded-xl resize-none" />
      </div>
    </div>
  </motion.div>
);

const CertificationFormItem = ({ certification, index, handleChange, handleRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-600" />
        Certification #{index + 1}
      </h4>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
        aria-label="Remove Certification"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Certification Name *</label>
        <input
          type="text"
          placeholder="e.g., AWS Certified Solutions Architect"
          value={certification.name}
          onChange={(e) => handleChange(index, 'name', e.target.value)}
          required
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Issuing Organization</label>
        <input
          type="text"
          placeholder="e.g., Amazon Web Services"
          value={certification.issuer}
          onChange={(e) => handleChange(index, 'issuer', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Credential ID</label>
        <input
          type="text"
          placeholder="Your credential ID"
          value={certification.credentialId}
          onChange={(e) => handleChange(index, 'credentialId', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Credential URL</label>
        <input
          type="url"
          placeholder="https://verify.credential.com/your-id"
          value={certification.credentialUrl}
          onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Issue Date</label>
        <input
          type="date"
          value={certification.issueDate}
          onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Expiry Date (Optional)</label>
        <input
          type="date"
          value={certification.expiryDate}
          onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
    </div>
  </motion.div>
);

const LanguageFormItem = ({ item, index, handleChange, handleRemove }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-6 bg-white/80 rounded-2xl shadow-lg border">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-bold text-gray-900 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-600" /> Language #{index + 1}</h4>
      <button type="button" onClick={() => handleRemove(index)} className="text-red-500 p-2 rounded-full hover:bg-red-50"><Trash2 className="w-5 h-5" /></button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="e.g., English, Spanish" value={item.language} onChange={e => handleChange(index, 'language', e.target.value)} required className="w-full p-4 bg-white/50 border rounded-xl" />
      <select value={item.proficiency} onChange={e => handleChange(index, 'proficiency', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl">
        <option>Basic</option><option>Conversational</option><option>Fluent</option><option>Native</option>
      </select>
    </div>
  </motion.div>
);

// ✨ NEW: Publication Form Item
const PublicationFormItem = ({ item, index, handleChange, handleRemove }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 mb-6 bg-white/80 rounded-2xl shadow-lg border">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Publication #{index + 1}</h4>
      <button type="button" onClick={() => handleRemove(index)} className="text-red-500 p-2 rounded-full hover:bg-red-50"><Trash2 className="w-5 h-5" /></button>
    </div>
    <div className="space-y-4">
      <input type="text" placeholder="Publication Title *" value={item.title} onChange={e => handleChange(index, 'title', e.target.value)} required className="w-full p-4 bg-white/50 border rounded-xl" />
      <input type="url" placeholder="Link to publication (e.g., DOI, URL)" value={item.link} onChange={e => handleChange(index, 'link', e.target.value)} className="w-full p-4 bg-white/50 border rounded-xl" />
      <textarea placeholder="Brief description..." value={item.description} onChange={e => handleChange(index, 'description', e.target.value)} rows="2" className="w-full p-4 bg-white/50 border rounded-xl resize-none" />
    </div>
  </motion.div>
);


// --- Main Component ---
const CreateProfile = () => {

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // --- Handlers (many new ones added) ---
  const nextStep = () => setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
  const goToStep = (stepIndex) => setCurrentStep(stepIndex);

  const handleTopLevelChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleNestedChange = (section, field, value) => {
    setFormData(p => ({ ...p, details: { ...p.details, [section]: { ...p.details[section], [field]: value } } }));
  };

  const handlePersonalInfoChange = e => handleNestedChange('personalInfo', e.target.name, e.target.value);
  const handleDemographicsChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, details: { ...p.details, personalInfo: { ...p.details.personalInfo, demographics: { ...p.details.personalInfo.demographics, [name]: value } } } }));
  };
  const handleContactInfoChange = e => handleNestedChange('contactInfo', e.target.name, e.target.value);
  const handleSocialsChange = e => handleNestedChange('contactInfo', 'socials', { ...formData.details.contactInfo.socials, [e.target.name]: e.target.value });
  const handleAddressChange = e => handleNestedChange('contactInfo', 'presentAddress', { ...formData.details.contactInfo.presentAddress, [e.target.name]: e.target.value });
  const handleWorkAuthChange = e => {
    const { name, value } = e.target;
    const booleanValue = value === 'yes'; 
    handleNestedChange('workAuthorization', name, booleanValue);
  };
  const handleCareerSummaryChange = e => handleNestedChange('careerSummary', e.target.name, e.target.value);
  const handleJobPreferenceChange = e => {
    const { name, value, type, checked } = e.target;
    handleNestedChange('jobPreferences', name, type === 'checkbox' ? checked : value);
  };
  const handleNoticePeriodChange = e => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const newNotice = { ...formData.details.jobPreferences.noticePeriod, [name]: val };
    if (name === 'available' && !checked) newNotice.durationInDays = '';
    handleNestedChange('jobPreferences', 'noticePeriod', newNotice);
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(p => {
      const newItems = [...p.details.careerSummary[section]];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...p, details: { ...p.details, careerSummary: { ...p.details.careerSummary, [section]: newItems } } };
    });
  };

  const handleAddItem = (section, initialItem) => {
    setFormData(p => ({ ...p, details: { ...p.details, careerSummary: { ...p.details.careerSummary, [section]: [...p.details.careerSummary[section], initialItem] } } }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData(p => ({ ...p, details: { ...p.details, careerSummary: { ...p.details.careerSummary, [section]: p.details.careerSummary[section].filter((_, i) => i !== index) } } }));
  };

  // Submission Logic
  const prepareDataForSubmission = (data) => {
    const { details } = data;
    const processCommaString = (str) =>
      str ? str.split(',').map(s => s.trim()).filter(s => s) : [];

    return {
      profileName: data.profileName,
      resumeUrl: data.resumeUrl,
      details: {
        ...details,
        careerSummary: {
          ...details.careerSummary,
          skills: processCommaString(details.careerSummary.skills),
          achievements: processCommaString(details.careerSummary.achievements),
          projects: details.careerSummary.projects.map(p => ({
            ...p,
            technologies: processCommaString(p.technologies),
          })),
        },
        jobPreferences: {
          ...details.jobPreferences,
          preferredLocations: processCommaString(details.jobPreferences.preferredLocations),
        },
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const payload = prepareDataForSubmission(formData);
      // Replace with your actual API endpoint for creating a profile
      const response = await api.post('/profiles/createprofile', payload);

      if (response.status === 200 || response.status === 201) {
        setMessage(response.data.message || 'Profile created successfully!');
        setIsSuccess(true);
      } else {
        setMessage(response.data.message || `An error occurred: ${response.statusText}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      const errorMessage = error.response?.data?.message || 'A network error occurred. Please try again.';
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // Render Logic
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-white/50 p-6 hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProskAI
              </h1>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
            <p className="text-gray-600 text-sm">Build your professional profile step by step</p>
          </motion.div>

          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const isActive = currentStep === index;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => goToStep(index)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/50 border border-gray-200 text-gray-600 hover:bg-white/80'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gray-200'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{STEPS[currentStep].title}</h3>
                  <p className="text-gray-600">{STEPS[currentStep].description}</p>
                </div>
                <div className="text-sm text-gray-500">Step {currentStep + 1} of {STEPS.length}</div>
              </div>
            </motion.div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 mb-6 rounded-2xl ${isSuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}
              >
                {message}
              </motion.div>
            )}

            <motion.div
              key={currentStep}
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} noValidate>
                <AnimatePresence mode="wait">

                  {currentStep === 0 && (
                    <motion.div key="basic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Profile Name *</label><input type="text" name="profileName" value={formData.profileName} onChange={handleTopLevelChange} placeholder="e.g., Senior Developer Role" required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Resume URL</label><input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleTopLevelChange} placeholder="https://your-resume-link.com" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">First Name *</label><input type="text" name="firstName" value={formData.details.personalInfo.firstName} onChange={handlePersonalInfoChange} placeholder="Enter your first name" required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Last Name *</label><input type="text" name="lastName" value={formData.details.personalInfo.lastName} onChange={handlePersonalInfoChange} placeholder="Enter your last name" required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Email *</label><input type="email" name="email" value={formData.details.contactInfo.email} onChange={handleContactInfoChange} placeholder="your.email@example.com" required className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Pronouns</label><input type="text" name="pronouns" value={formData.details.personalInfo.pronouns} onChange={handlePersonalInfoChange} placeholder="e.g., he/him, she/her" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="md:col-span-2 grid grid-cols-3 gap-4">
                          <div className="col-span-1 space-y-2"><label className="text-sm font-semibold text-gray-700">Country Code</label><input type="text" name="phoneCountryCode" value={formData.details.contactInfo.phoneCountryCode} onChange={handleContactInfoChange} placeholder="+91" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                          <div className="col-span-2 space-y-2"><label className="text-sm font-semibold text-gray-700">Phone Number</label><input type="tel" name="phone" value={formData.details.contactInfo.phone} onChange={handleContactInfoChange} placeholder="12345 67890" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900">Social & Portfolio Links</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="url" name="portfolio" value={formData.details.contactInfo.socials.portfolio} onChange={handleSocialsChange} placeholder="Portfolio URL" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="url" name="linkedin" value={formData.details.contactInfo.socials.linkedin} onChange={handleSocialsChange} placeholder="LinkedIn Profile URL" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="url" name="github" value={formData.details.contactInfo.socials.github} onChange={handleSocialsChange} placeholder="GitHub Profile URL" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="url" name="twitter" value={formData.details.contactInfo.socials.twitter} onChange={handleSocialsChange} placeholder="Twitter Profile URL" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <div className="md:col-span-2 space-y-2"><label className="text-sm font-semibold text-gray-700">Other Link (Blog, etc.)</label><input type="url" name="other" value={formData.details.contactInfo.socials.other} onChange={handleSocialsChange} placeholder="https://your.blog.com" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" /></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div key="location" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">Present Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" name="street" value={formData.details.contactInfo.presentAddress.street} onChange={handleAddressChange} placeholder="Street Address" className="p-4 w-full bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="text" name="city" value={formData.details.contactInfo.presentAddress.city} onChange={handleAddressChange} placeholder="City" className="p-4 w-full bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="text" name="state" value={formData.details.contactInfo.presentAddress.state} onChange={handleAddressChange} placeholder="State" className="p-4 w-full bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="text" name="country" value={formData.details.contactInfo.presentAddress.country} onChange={handleAddressChange} placeholder="Country" className="p-4 w-full bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          <input type="text" name="zipCode" value={formData.details.contactInfo.presentAddress.zipCode} onChange={handleAddressChange} placeholder="ZIP Code" className="p-4 w-full bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Skills</label>
                        <textarea name="skills" rows="3" value={formData.details.careerSummary.skills} onChange={handleCareerSummaryChange} placeholder="e.g., React, Node.js, Python (comma separated)" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none" />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div key="professional" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Total Experience (in years)</label>
                          <input type="number" name="totalExperienceInYears" value={formData.details.careerSummary.totalExperienceInYears} onChange={handleCareerSummaryChange} placeholder="e.g., 5" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Job Type Preference</label>
                          <select name="jobType" value={formData.details.jobPreferences.jobType} onChange={handleJobPreferenceChange} className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                            <option>Remote</option>
                            <option>Onsite</option>
                            <option>Hybrid</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Current CTC</label>
                          <input type="text" name="currentCTC" value={formData.details.jobPreferences.currentCTC} onChange={handleJobPreferenceChange} placeholder="e.g., 15 LPA" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Expected CTC</label>
                          <input type="text" name="expectedCTC" value={formData.details.jobPreferences.expectedCTC} onChange={handleJobPreferenceChange} placeholder="e.g., 20 LPA" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Preferred Locations</label>
                          <input type="text" name="preferredLocations" value={formData.details.jobPreferences.preferredLocations} onChange={handleJobPreferenceChange} placeholder="e.g., Mumbai, Bangalore (comma separated)" className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900">Other Preferences</h4>
                        <div className="flex flex-col md:flex-row gap-6">
                          <label className="flex items-center cursor-pointer"><input type="checkbox" name="willingToRelocate" checked={formData.details.jobPreferences.willingToRelocate} onChange={handleJobPreferenceChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> <span className="ml-2 text-gray-700">Willing to relocate?</span></label>
                          <label className="flex items-center cursor-pointer"><input type="checkbox" name="visaRequired" checked={formData.details.jobPreferences.visaRequired} onChange={handleJobPreferenceChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> <span className="ml-2 text-gray-700">Visa sponsorship required?</span></label>
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900">Notice Period</h4>
                        <div className="flex items-center gap-4 flex-wrap">
                          <label className="flex items-center cursor-pointer"><input type="checkbox" name="available" checked={formData.details.jobPreferences.noticePeriod.available} onChange={handleNoticePeriodChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> <span className="ml-2 text-gray-700">Serving notice period?</span></label>
                          {formData.details.jobPreferences.noticePeriod.available && (
                            <motion.input initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '12rem' }} type="number" name="durationInDays" value={formData.details.jobPreferences.noticePeriod.durationInDays} onChange={handleNoticePeriodChange} placeholder="Duration in days" className="p-4 w-48 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" />
                          )}
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900">Work Authorization</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Nationality</label><input type="text" name="nationality" value={formData.details.workAuthorization.nationality} onChange={handleWorkAuthChange} placeholder="e.g., Indian" className="w-full p-4 bg-white/50 border rounded-xl" /></div>
                          <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Citizenship Status</label><input type="text" name="citizenshipStatus" value={formData.details.workAuthorization.citizenshipStatus} onChange={handleWorkAuthChange} placeholder="e.g., Citizen, Visa Holder" className="w-full p-4 bg-white/50 border rounded-xl" /></div>
                          <div className="space-y-2"><p className="text-sm font-semibold text-gray-700">Authorized to work in the USA?</p><div className="flex gap-4 items-center pt-2"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="usAuthorized" value="yes" checked={formData.details.workAuthorization.usAuthorized === true} onChange={handleWorkAuthChange} /> Yes</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="usAuthorized" value="no" checked={formData.details.workAuthorization.usAuthorized === false} onChange={handleWorkAuthChange} /> No</label></div></div>
                          <div className="space-y-2"><p className="text-sm font-semibold text-gray-700">Need visa sponsorship?</p><div className="flex gap-4 items-center pt-2"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="sponsorshipRequired" value="yes" checked={formData.details.workAuthorization.sponsorshipRequired === true} onChange={handleWorkAuthChange} /> Yes</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="sponsorshipRequired" value="no" checked={formData.details.workAuthorization.sponsorshipRequired === false} onChange={handleWorkAuthChange} /> No</label></div></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div key="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {formData.details.careerSummary.experience.map((exp, index) => (
                        <ExperienceFormItem key={index} experience={exp} index={index}
                          handleChange={(i, field, value) => handleArrayChange('experience', i, field, value)}
                          handleRemove={() => handleRemoveItem('experience', index)}
                        />
                      ))}
                      <motion.button type="button" onClick={() => handleAddItem('experience', initialExperience)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Experience</motion.button>
                    </motion.div>
                  )}

                  {/* --- STEP 4: Education --- */}
                  {currentStep === 4 && (
                    <motion.div key="education" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {formData.details.careerSummary.education.map((edu, index) => (
                        <EducationFormItem key={index} education={edu} index={index}
                          handleChange={(i, field, value) => handleArrayChange('education', i, field, value)}
                          handleRemove={() => handleRemoveItem('education', index)}
                        />
                      ))}
                      <motion.button type="button" onClick={() => handleAddItem('education', initialEducation)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Education</motion.button>
                    </motion.div>
                  )}

                  {currentStep === 5 && (
                    <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {formData.details.careerSummary.projects.map((proj, index) => (
                        <ProjectFormItem key={index} project={proj} index={index}
                          handleChange={(i, field, value) => handleArrayChange('projects', i, field, value)}
                          handleRemove={() => handleRemoveItem('projects', index)}
                        />
                      ))}
                      <motion.button type="button" onClick={() => handleAddItem('projects', initialProject)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Project</motion.button>
                    </motion.div>
                  )}

                  {/* --- STEP 6: Publications --- */}
                  {currentStep === 6 && (
                    <motion.div key="publications">
                      {formData.details.careerSummary.publications.map((item, i) => <PublicationFormItem key={i} item={item} index={i} handleChange={(...args) => handleArrayChange('publications', ...args)} handleRemove={() => handleRemoveItem('publications', i)} />)}
                      <motion.button type="button" onClick={() => handleAddItem('publications', initialPublication)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Publication</motion.button>
                    </motion.div>
                  )}

                  {/* --- STEP 7: Certifications & Languages --- */}
                  {currentStep === 7 && (
                    <motion.div key="certifications">
                      {formData.details.careerSummary.certifications.map((item, i) => <CertificationFormItem key={i} certification={item} index={i} handleChange={(...args) => handleArrayChange('certifications', ...args)} handleRemove={() => handleRemoveItem('certifications', i)} />)}
                      <motion.button type="button" onClick={() => handleAddItem('certifications', initialCertification)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Certification</motion.button>
                      <h3 className="text-xl font-bold mt-10 mb-4 border-t pt-6">Languages</h3>
                      {formData.details.careerSummary.languages.map((item, i) => <LanguageFormItem key={i} item={item} index={i} handleChange={(...args) => handleArrayChange('languages', ...args)} handleRemove={() => handleRemoveItem('languages', i)} />)}
                      <motion.button type="button" onClick={() => handleAddItem('languages', initialLanguage)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"><PlusCircle className="w-5 h-5" /> Add Language</motion.button>
                    </motion.div>
                  )}

                  {/* --- STEP 8: Demographics --- */}
                  {currentStep === 8 && (
                    <motion.div key="demographics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">Providing this information is optional and is used for diversity reporting purposes only. It will not affect your application status.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Gender</label><select name="gender" value={formData.details.personalInfo.demographics.gender} onChange={handleDemographicsChange} className="w-full p-4 bg-white/50 border rounded-xl"><option>Prefer not to say</option><option>Male</option><option>Female</option><option>Non-binary</option><option>Other</option></select></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Veteran Status</label><select name="veteranStatus" value={formData.details.personalInfo.demographics.veteranStatus} onChange={handleDemographicsChange} className="w-full p-4 bg-white/50 border rounded-xl"><option>Prefer not to say</option><option>Yes</option><option>No</option></select></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Disability Status</label><select name="disabilityStatus" value={formData.details.personalInfo.demographics.disabilityStatus} onChange={handleDemographicsChange} className="w-full p-4 bg-white/50 border rounded-xl"><option>Prefer not to say</option><option>Yes</option><option>No</option></select></div>
                        <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Ethnicity</label><input type="text" name="ethnicity" value={formData.details.personalInfo.demographics.ethnicity} onChange={handleDemographicsChange} placeholder="e.g., Hispanic or Latino" className="w-full p-4 bg-white/50 border rounded-xl" /></div>
                        <div className="md:col-span-2 space-y-2"><label className="text-sm font-semibold text-gray-700">Race</label><input type="text" name="race" value={formData.details.personalInfo.demographics.race} onChange={handleDemographicsChange} placeholder="e.g., White, Black, Asian..." className="w-full p-4 bg-white/50 border rounded-xl" /></div>
                      </div>
                    </motion.div>
                  )}

                  {/* --- STEP 9: Achievements (CORRECTED INDEX) --- */}
                  {currentStep === 9 && (
                    <motion.div key="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Achievements</label>
                        <textarea name="achievements" rows="5" value={formData.details.careerSummary.achievements} onChange={handleCareerSummaryChange} placeholder="List key achievements, separated by commas..." className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none" />
                      </div>
                    </motion.div>
                  )}

                  {/* --- STEP 10: Review (CORRECTED INDEX) --- */}
                  {currentStep === 10 && (
                    <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Profile</h3>
                        <p className="text-gray-600">Please review all information before submitting.</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><h4 className="font-semibold text-blue-900 mb-2">Profile Name</h4><p className="text-blue-700">{formData.profileName || 'Not specified'}</p></div>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200"><h4 className="font-semibold text-green-900 mb-2">Full Name</h4><p className="text-green-700">{`${formData.details.personalInfo.firstName} ${formData.details.personalInfo.lastName}` || 'Not specified'}</p></div>
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200"><h4 className="font-semibold text-purple-900 mb-2">Experience Entries</h4><p className="text-purple-700">{formData.details.careerSummary.experience.length} experience(s) added</p></div>
                    </motion.div>
                  )}

                </AnimatePresence>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <motion.button type="button" onClick={prevStep} disabled={currentStep === 0} whileHover={{ scale: currentStep > 0 ? 1.02 : 1 }} whileTap={{ scale: currentStep > 0 ? 0.98 : 1 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200"><ChevronLeft className="w-5 h-5" /> Previous</motion.button>
                  {currentStep < STEPS.length - 1 ? (
                    <motion.button type="button" onClick={nextStep} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">Next <ChevronRight className="w-5 h-5" /></motion.button>
                  ) : (
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Creating...</>) : (<><Save className="w-5 h-5" /> Create Profile</>)}
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;