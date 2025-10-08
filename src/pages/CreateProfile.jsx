import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  PlusCircle, 
  Save, 
  Sparkles, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  Target,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Circle
} from 'lucide-react';
import api from '../api/api';

// --- Configuration and Constants ---
// NOTE: In a real MERN project, this API URL would likely be an environment variable.
const API_BASE_URL = "http://localhost:5000/api/profiles";

// Step configuration for the wizard
const STEPS = [
  { id: 'basic', title: 'Basic Info', icon: User, description: 'Personal details and contact information' },
  { id: 'location', title: 'Location & Skills', icon: MapPin, description: 'Address and professional skills' },
  { id: 'experience', title: 'Experience', icon: Briefcase, description: 'Work experience and career history' },
  { id: 'education', title: 'Education', icon: GraduationCap, description: 'Educational background and qualifications' },
  { id: 'projects', title: 'Projects', icon: Code, description: 'Portfolio projects and achievements' },
  { id: 'certifications', title: 'Certifications', icon: Award, description: 'Professional certifications and licenses' },
  { id: 'preferences', title: 'Job Preferences', icon: Target, description: 'Career preferences and expectations' },
  { id: 'review', title: 'Review', icon: CheckCircle, description: 'Review and submit your profile' }
]; 

// --- Initial State Structures matching Mongoose Sub-Schemas ---

const initialAddress = {
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
};

const initialExperience = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
};

const initialEducation = {
  school: '',
  degree: '',
  fieldOfStudy: '',
  startDate: '',
  endDate: '',
  grade: '',
};

const initialProject = {
  title: '',
  description: '',
  technologies: '', // Will be split by comma
  link: '',
  startDate: '',
  endDate: '',
};

const initialCertification = {
  name: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  credentialId: '',
  credentialUrl: '',
};

const initialDetails = {
  fullName: '',
  email: '',
  phone: '',
  address: initialAddress,
  skills: '', // Will be split by comma
  experience: [initialExperience],
  education: [initialEducation],
  projects: [initialProject],
  certifications: [initialCertification],
  jobPreferences: {
    jobType: 'remote',
    preferredLocations: '', // Will be split by comma
    expectedSalary: '',
  },
};

const initialFormState = {
  profileName: '',
  resumeUrl: '',
  details: initialDetails,
};

// --- Reusable Component for Array Items (Experience) ---

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
        <label className="text-sm font-semibold text-gray-700">Company</label>
        <input
          type="text"
          placeholder="Enter company name"
          value={experience.company}
          onChange={(e) => handleChange(index, 'company', e.target.value)}
          required
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Role/Position</label>
        <input
          type="text"
          placeholder="Enter your role"
          value={experience.role}
          onChange={(e) => handleChange(index, 'role', e.target.value)}
          required
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Start Date</label>
        <input
          type="date"
          value={experience.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">End Date</label>
        <input
          type="date"
          value={experience.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          disabled={experience.isCurrent}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>
      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          placeholder="Describe your responsibilities and achievements"
          value={experience.description}
          onChange={(e) => handleChange(index, 'description', e.target.value)}
          rows="3"
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
        />
      </div>
    </div>
    
    <div className="flex justify-between items-center mt-4">
      <label className="flex items-center text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={experience.isCurrent}
          onChange={(e) => handleChange(index, 'isCurrent', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="ml-2">Currently work here</span>
      </label>
    </div>
  </motion.div>
);

// --- Reusable Component for Array Items (Education) ---

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
        <label className="text-sm font-semibold text-gray-700">School/Institution</label>
        <input
          type="text"
          placeholder="Enter school name"
          value={education.school}
          onChange={(e) => handleChange(index, 'school', e.target.value)}
          required
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Degree/Qualification</label>
        <input
          type="text"
          placeholder="e.g., Bachelor's, Master's, PhD"
          value={education.degree}
          onChange={(e) => handleChange(index, 'degree', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Field of Study</label>
        <input
          type="text"
          placeholder="e.g., Computer Science, Business"
          value={education.fieldOfStudy}
          onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Grade/GPA</label>
        <input
          type="text"
          placeholder="e.g., 3.8 GPA, First Class"
          value={education.grade}
          onChange={(e) => handleChange(index, 'grade', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Start Date</label>
        <input
          type="date"
          value={education.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">End Date</label>
        <input
          type="date"
          value={education.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
    </div>
  </motion.div>
);

// --- Reusable Component for Array Items (Projects) ---

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
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
        aria-label="Remove Project"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Project Title</label>
        <input
          type="text"
          placeholder="Enter project title"
          value={project.title}
          onChange={(e) => handleChange(index, 'title', e.target.value)}
          required
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Technologies</label>
        <input
          type="text"
          placeholder="React, Node.js, MongoDB (comma separated)"
          value={project.technologies}
          onChange={(e) => handleChange(index, 'technologies', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Project Link</label>
        <input
          type="url"
          placeholder="https://your-project.com"
          value={project.link}
          onChange={(e) => handleChange(index, 'link', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Start Date</label>
        <input
          type="date"
          value={project.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">End Date</label>
        <input
          type="date"
          value={project.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
        />
      </div>
      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          placeholder="Describe your project, key features, and your role"
          value={project.description}
          onChange={(e) => handleChange(index, 'description', e.target.value)}
          rows="3"
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
        />
      </div>
    </div>
  </motion.div>
);

// --- Reusable Component for Array Items (Certifications) ---

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
        <label className="text-sm font-semibold text-gray-700">Certification Name</label>
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
          placeholder="e.g., Amazon Web Services, Microsoft"
          value={certification.issuer}
          onChange={(e) => handleChange(index, 'issuer', e.target.value)}
          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Credential ID</label>
        <input
          type="text"
          placeholder="Your credential ID or certificate number"
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


// --- Main Component ---
const CreateProfile = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const markStepComplete = (stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  };

  // General handler for top-level and nested 'details' fields (non-array/non-object)
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === 'profileName' || name === 'resumeUrl') {
      // Top level fields
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      // Fields nested under 'details'
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [name]: value,
        },
      }));
    }
  }, []);

  // Handler for nested 'address' object
  const handleAddressChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        address: {
          ...prev.details.address,
          [name]: value,
        },
      },
    }));
  }, []);

  // Handler for nested 'jobPreferences' object
  const handleJobPreferenceChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        jobPreferences: {
          ...prev.details.jobPreferences,
          [name]: value,
        },
      },
    }));
  }, []);

  // Handler for dynamic array fields (Education, Experience, Projects, Certifications)
  const handleArrayChange = useCallback((section, index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.details[section]];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
      return {
        ...prev,
        details: {
          ...prev.details,
          [section]: newItems,
        },
      };
    });
  }, []);

  // Handler to add a new item to an array field
  const handleAddItem = useCallback((section, initialItem) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [section]: [...prev.details[section], initialItem],
      },
    }));
  }, []);

  // Handler to remove an item from an array field
  const handleRemoveItem = useCallback((section, index) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [section]: prev.details[section].filter((_, i) => i !== index),
      },
    }));
  }, []);

  // --- Submission Logic ---

  const prepareDataForSubmission = (data) => {
    const { details } = data;

    // Helper to process comma-separated strings into arrays
    const processCommaString = (str) =>
      str ? str.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

    // Final data structure preparation
    const finalDetails = {
      ...details,
      skills: processCommaString(details.skills),
      jobPreferences: {
        ...details.jobPreferences,
        preferredLocations: processCommaString(details.jobPreferences.preferredLocations),
      },
      // Process technologies for projects
      projects: details.projects.map(p => ({
        ...p,
        technologies: processCommaString(p.technologies),
      })),
      // Ensure empty string dates are null or undefined
      education: details.education.map(e => ({
        ...e,
        startDate: e.startDate || undefined,
        endDate: e.endDate || undefined,
      })),
      experience: details.experience.map(e => ({
        ...e,
        startDate: e.startDate || undefined,
        endDate: e.endDate || undefined,
      })),
      certifications: details.certifications.map(c => ({
        ...c,
        issueDate: c.issueDate || undefined,
        expiryDate: c.expiryDate || undefined,
      })),
    };

    return {
      profileName: data.profileName,
      resumeUrl: data.resumeUrl,
      details: finalDetails,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      setMessage('Authentication error: Token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const payload = prepareDataForSubmission(formData);

      const response = await api.post('/profiles/createprofile', payload);

      const data = await response.data;

      if (response.status === 200) {
        setMessage(data.message || 'Profile created successfully!');
        setIsSuccess(true);

        // Reset form or redirect user
        // setFormData(initialFormState); 
      } else {
        setMessage(data.message || `Error: ${response.statusText}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setMessage('A network error occurred. Please try again.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar - Step Navigation */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-white/50 p-6">
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

          {/* Step Progress */}
          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = completedSteps.has(index);
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => goToStep(index)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : isCompleted
                      ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100'
                      : 'bg-white/50 border border-gray-200 text-gray-600 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-white/20'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                      <p className="text-xs opacity-75">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {STEPS[currentStep].title}
                  </h3>
                  <p className="text-gray-600">{STEPS[currentStep].description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {STEPS.length}
                </div>
              </div>
            </motion.div>

            {/* Message Box */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 mb-6 rounded-2xl ${
                  isSuccess 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8"
            >
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                      key="basic"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Profile Name *</label>
                          <input
                            type="text"
                            name="profileName"
                            value={formData.profileName}
                            onChange={handleInputChange}
                            placeholder="e.g., Primary Resume"
                            required
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.details.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.details.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.details.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Resume URL</label>
                          <input
                            type="url"
                            name="resumeUrl"
                            value={formData.resumeUrl}
                            onChange={handleInputChange}
                            placeholder="https://your-resume.pdf"
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                      key="location"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">Address Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="street"
                            value={formData.details.address.street}
                            onChange={handleAddressChange}
                            placeholder="Street Address"
                            className="p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                          <input
                            type="text"
                            name="city"
                            value={formData.details.address.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                          <input
                            type="text"
                            name="state"
                            value={formData.details.address.state}
                            onChange={handleAddressChange}
                            placeholder="State/Province"
                            className="p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                          <input
                            type="text"
                            name="country"
                            value={formData.details.address.country}
                            onChange={handleAddressChange}
                            placeholder="Country"
                            className="p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.details.address.zipCode}
                            onChange={handleAddressChange}
                            placeholder="ZIP/Postal Code"
                            className="p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Skills</label>
                        <textarea
                          name="skills"
                          rows="3"
                          value={formData.details.skills}
                          onChange={handleInputChange}
                          placeholder="List your key skills, separated by commas (e.g., React, Node.js, MongoDB, Python)"
                          className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {formData.details.experience.map((exp, index) => (
                        <ExperienceFormItem
                          key={index}
                          experience={exp}
                          index={index}
                          handleChange={(i, field, value) => handleArrayChange('experience', i, field, value)}
                          handleRemove={() => handleRemoveItem('experience', index)}
                        />
                      ))}
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem('experience', initialExperience)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Experience
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {formData.details.education.map((edu, index) => (
                        <EducationFormItem
                          key={index}
                          education={edu}
                          index={index}
                          handleChange={(i, field, value) => handleArrayChange('education', i, field, value)}
                          handleRemove={() => handleRemoveItem('education', index)}
                        />
                      ))}
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem('education', initialEducation)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Education
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="projects"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {formData.details.projects.map((proj, index) => (
                        <ProjectFormItem
                          key={index}
                          project={proj}
                          index={index}
                          handleChange={(i, field, value) => handleArrayChange('projects', i, field, value)}
                          handleRemove={() => handleRemoveItem('projects', index)}
                        />
                      ))}
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem('projects', initialProject)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Project
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 5 && (
                    <motion.div
                      key="certifications"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {formData.details.certifications.map((cert, index) => (
                        <CertificationFormItem
                          key={index}
                          certification={cert}
                          index={index}
                          handleChange={(i, field, value) => handleArrayChange('certifications', i, field, value)}
                          handleRemove={() => handleRemoveItem('certifications', index)}
                        />
                      ))}
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem('certifications', initialCertification)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Certification
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 6 && (
                    <motion.div
                      key="preferences"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Job Type</label>
                          <select
                            name="jobType"
                            value={formData.details.jobPreferences.jobType}
                            onChange={handleJobPreferenceChange}
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                          >
                            <option value="remote">Remote</option>
                            <option value="onsite">Onsite</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Preferred Locations</label>
                          <input
                            type="text"
                            name="preferredLocations"
                            value={formData.details.jobPreferences.preferredLocations}
                            onChange={handleJobPreferenceChange}
                            placeholder="New York, San Francisco, London (comma separated)"
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Expected Salary</label>
                          <input
                            type="text"
                            name="expectedSalary"
                            value={formData.details.jobPreferences.expectedSalary}
                            onChange={handleJobPreferenceChange}
                            placeholder="e.g., 120k USD, £80k"
                            className="w-full p-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 7 && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Your Profile</h3>
                        <p className="text-gray-600">Please review all information before submitting</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl">
                          <h4 className="font-semibold text-blue-900 mb-2">Profile Name</h4>
                          <p className="text-blue-700">{formData.profileName || 'Not specified'}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl">
                          <h4 className="font-semibold text-green-900 mb-2">Full Name</h4>
                          <p className="text-green-700">{formData.details.fullName || 'Not specified'}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl">
                          <h4 className="font-semibold text-purple-900 mb-2">Experience Entries</h4>
                          <p className="text-purple-700">{formData.details.experience.length} experience(s) added</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl">
                          <h4 className="font-semibold text-orange-900 mb-2">Education Entries</h4>
                          <p className="text-orange-700">{formData.details.education.length} education(s) added</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    whileHover={{ scale: currentStep > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: currentStep > 0 ? 0.98 : 1 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentStep > 0
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </motion.button>

                  <div className="flex gap-2">
                    {STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? 'bg-blue-500 w-8'
                            : index < currentStep
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {currentStep < STEPS.length - 1 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Profile...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Create Profile
                        </>
                      )}
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
