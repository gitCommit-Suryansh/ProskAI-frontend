import React, { useState, useCallback } from 'react';
import { Trash2, PlusCircle, Save } from 'lucide-react';
import api from '../api/api';

// --- Configuration and Constants ---
// NOTE: In a real MERN project, this API URL would likely be an environment variable.
const API_BASE_URL = "http://localhost:5000/api/profiles"; 

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
  <div className="p-4 mb-4 border border-gray-200 bg-white rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold text-indigo-700 mb-3">Experience #{index + 1}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Company"
        value={experience.company}
        onChange={(e) => handleChange(index, 'company', e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Role"
        value={experience.role}
        onChange={(e) => handleChange(index, 'role', e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={experience.startDate}
        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="date"
        placeholder="End Date"
        value={experience.endDate}
        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
        disabled={experience.isCurrent}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
      />
      <div className="col-span-1 md:col-span-2">
        <textarea
          placeholder="Description"
          value={experience.description}
          onChange={(e) => handleChange(index, 'description', e.target.value)}
          rows="3"
          className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    <div className="flex justify-between items-center mt-3">
      <label className="flex items-center text-sm text-gray-700">
        <input
          type="checkbox"
          checked={experience.isCurrent}
          onChange={(e) => handleChange(index, 'isCurrent', e.target.checked)}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className="ml-2">Currently work here</span>
      </label>
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150"
        aria-label="Remove Experience"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Reusable Component for Array Items (Education) ---

const EducationFormItem = ({ education, index, handleChange, handleRemove }) => (
  <div className="p-4 mb-4 border border-gray-200 bg-white rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold text-indigo-700 mb-3">Education #{index + 1}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="School Name"
        value={education.school}
        onChange={(e) => handleChange(index, 'school', e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Degree/Qualification"
        value={education.degree}
        onChange={(e) => handleChange(index, 'degree', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Field of Study"
        value={education.fieldOfStudy}
        onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Grade (e.g., 3.8 GPA)"
        value={education.grade}
        onChange={(e) => handleChange(index, 'grade', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="flex space-x-2">
        <input
          type="date"
          placeholder="Start Date"
          value={education.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="date"
          placeholder="End Date"
          value={education.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    <div className="flex justify-end mt-3">
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150"
        aria-label="Remove Education"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Reusable Component for Array Items (Projects) ---

const ProjectFormItem = ({ project, index, handleChange, handleRemove }) => (
  <div className="p-4 mb-4 border border-gray-200 bg-white rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold text-indigo-700 mb-3">Project #{index + 1}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => handleChange(index, 'title', e.target.value)}
        required
        className="col-span-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Technologies (comma separated: React, Node, Mongo)"
        value={project.technologies}
        onChange={(e) => handleChange(index, 'technologies', e.target.value)}
        className="col-span-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="url"
        placeholder="Project Link (URL)"
        value={project.link}
        onChange={(e) => handleChange(index, 'link', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="flex space-x-2">
        <input
          type="date"
          placeholder="Start Date"
          value={project.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="date"
          placeholder="End Date"
          value={project.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <textarea
          placeholder="Description"
          value={project.description}
          onChange={(e) => handleChange(index, 'description', e.target.value)}
          rows="3"
          className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    <div className="flex justify-end mt-3">
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150"
        aria-label="Remove Project"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Reusable Component for Array Items (Certifications) ---

const CertificationFormItem = ({ certification, index, handleChange, handleRemove }) => (
  <div className="p-4 mb-4 border border-gray-200 bg-white rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold text-indigo-700 mb-3">Certification #{index + 1}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Certification Name"
        value={certification.name}
        onChange={(e) => handleChange(index, 'name', e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Issuing Organization (Issuer)"
        value={certification.issuer}
        onChange={(e) => handleChange(index, 'issuer', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Credential ID"
        value={certification.credentialId}
        onChange={(e) => handleChange(index, 'credentialId', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="url"
        placeholder="Credential URL"
        value={certification.credentialUrl}
        onChange={(e) => handleChange(index, 'credentialUrl', e.target.value)}
        className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="flex space-x-2">
        <input
          type="date"
          placeholder="Issue Date"
          value={certification.issueDate}
          onChange={(e) => handleChange(index, 'issueDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="date"
          placeholder="Expiry Date (Optional)"
          value={certification.expiryDate}
          onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    <div className="flex justify-end mt-3">
      <button
        type="button"
        onClick={() => handleRemove(index)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150"
        aria-label="Remove Certification"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);


// --- Main Component ---
const CreateProfile = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .form-section {
          @apply p-6 bg-white rounded-xl shadow-lg mb-8 border-t-4 border-indigo-600;
        }
        .input-label {
          @apply block text-sm font-medium text-gray-700 mb-1;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create Your Profile</h1>
        <p className="text-lg text-gray-500 mb-8">
          Fill out the details to create a comprehensive professional profile.
        </p>

        {/* Message Box */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${isSuccess ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* --- Section 1: Basic Profile Info --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="profileName" className="input-label">Profile Name (e.g., 'Primary Resume') *</label>
                <input
                  type="text"
                  id="profileName"
                  name="profileName"
                  value={formData.profileName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="fullName" className="input-label">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.details.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.details.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="input-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.details.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="resumeUrl" className="input-label">External Resume URL</label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  placeholder="e.g., A link to your hosted PDF resume"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* --- Section 2: Address and Skills --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Location & Skills</h2>

            <fieldset className="p-4 border border-gray-200 rounded-lg mb-6">
              <legend className="px-2 text-lg font-medium text-gray-700">Address</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="street" value={formData.details.address.street} onChange={handleAddressChange} placeholder="Street" className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="city" value={formData.details.address.city} onChange={handleAddressChange} placeholder="City" className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="state" value={formData.details.address.state} onChange={handleAddressChange} placeholder="State/Province" className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="country" value={formData.details.address.country} onChange={handleAddressChange} placeholder="Country" className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" name="zipCode" value={formData.details.address.zipCode} onChange={handleAddressChange} placeholder="Zip Code" className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </fieldset>

            <div>
              <label htmlFor="skills" className="input-label">Skills</label>
              <textarea
                id="skills"
                name="skills"
                rows="2"
                value={formData.details.skills}
                onChange={handleInputChange}
                placeholder="List your key skills, separated by commas (e.g., React, Node.js, MongoDB, Tailwind CSS)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* --- Section 3: Experience --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Professional Experience</h2>
            {formData.details.experience.map((exp, index) => (
              <ExperienceFormItem
                key={index}
                experience={exp}
                index={index}
                handleChange={(i, field, value) => handleArrayChange('experience', i, field, value)}
                handleRemove={() => handleRemoveItem('experience', index)}
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('experience', initialExperience)}
              className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Experience
            </button>
          </div>

          {/* --- Section 4: Education --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Education</h2>
            {formData.details.education.map((edu, index) => (
              <EducationFormItem
                key={index}
                education={edu}
                index={index}
                handleChange={(i, field, value) => handleArrayChange('education', i, field, value)}
                handleRemove={() => handleRemoveItem('education', index)}
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('education', initialEducation)}
              className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Education
            </button>
          </div>

          {/* --- Section 5: Projects --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Projects</h2>
            {formData.details.projects.map((proj, index) => (
              <ProjectFormItem
                key={index}
                project={proj}
                index={index}
                handleChange={(i, field, value) => handleArrayChange('projects', i, field, value)}
                handleRemove={() => handleRemoveItem('projects', index)}
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('projects', initialProject)}
              className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Project
            </button>
          </div>

          {/* --- Section 6: Certifications --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Certifications</h2>
            {formData.details.certifications.map((cert, index) => (
              <CertificationFormItem
                key={index}
                certification={cert}
                index={index}
                handleChange={(i, field, value) => handleArrayChange('certifications', i, field, value)}
                handleRemove={() => handleRemoveItem('certifications', index)}
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddItem('certifications', initialCertification)}
              className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Certification
            </button>
          </div>

          {/* --- Section 7: Job Preferences --- */}
          <div className="form-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Job Preferences (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="jobType" className="input-label">Preferred Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.details.jobPreferences.jobType}
                  onChange={handleJobPreferenceChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="preferredLocations" className="input-label">Preferred Locations</label>
                <input
                  type="text"
                  id="preferredLocations"
                  name="preferredLocations"
                  value={formData.details.jobPreferences.preferredLocations}
                  onChange={handleJobPreferenceChange}
                  placeholder="Cities or Regions, separated by commas"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="expectedSalary" className="input-label">Expected Salary (e.g., '120k USD')</label>
                <input
                  type="text"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.details.jobPreferences.expectedSalary}
                  onChange={handleJobPreferenceChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* --- Submission Button --- */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {loading ? 'Saving Profile...' : 'Save Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
