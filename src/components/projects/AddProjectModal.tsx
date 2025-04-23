import React, { useState } from "react";
import { useCreateProject, useLanguages } from "../../hooks/useGraphQL";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SourceType = 'local' | 'github';

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createProject = useCreateProject();
  const { data: languages = [] } = useLanguages();
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    sourceType: "local" as SourceType,
    source: "",
    language: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Set initial language when languages are loaded
  React.useEffect(() => {
    if (languages.length > 0 && !formData.language) {
      setFormData(prev => ({ ...prev, language: languages[0] }));
    }
  }, [languages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSourceTypeChange = (type: SourceType) => {
    setFormData(prev => ({
      ...prev,
      sourceType: type,
      source: "", // Reset source when changing type
    }));
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        source: file.name,
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        source: file.name,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject.mutateAsync({
        name: formData.projectName,
        description: formData.description,
        repositoryUrl: formData.sourceType === 'github' ? formData.source : '',
        language: formData.language,
      });
      setFormData({
        projectName: "",
        description: "",
        sourceType: "local",
        source: "",
        language: "",
      });
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-[#15AE88]">Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15AE88]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15AE88]"
              rows={3}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Programming Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15AE88] bg-white"
              required
            >
              <option value="" disabled>Select a language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Source Code</label>
            <div className="space-y-2">
              <div 
                className={`flex items-center gap-2 p-4 border rounded-md transition-all duration-200 cursor-pointer ${
                  formData.sourceType === 'local' 
                    ? 'border-[#15AE88] bg-[#F5FFFC]' 
                    : 'border-gray-200 opacity-50'
                }`}
                onClick={() => handleSourceTypeChange('local')}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="radio"
                  id="local"
                  name="sourceType"
                  className="text-[#15AE88] focus:ring-[#15AE88]"
                  checked={formData.sourceType === 'local'}
                  onChange={() => handleSourceTypeChange('local')}
                />
                <div className="flex flex-col items-center justify-center w-full gap-2">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  {selectedFile ? (
                    <div className="flex items-center gap-2 text-[#15AE88]">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{selectedFile.name}</span>
                      <button 
                        type="button" 
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setFormData(prev => ({ ...prev, source: "" }));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="fileInput" 
                      className="flex flex-col items-center justify-center w-full gap-2 text-[#15AE88] cursor-pointer"
                    >
                      <span className="text-sm font-medium">Upload or Drop Source Code</span>
                    </label>
                  )}
                </div>
              </div>

              <div 
                className={`flex items-center gap-2 p-4 border rounded-md transition-all duration-200 ${
                  formData.sourceType === 'github' 
                    ? 'border-[#15AE88] bg-[#F5FFFC]' 
                    : 'border-gray-200 opacity-50'
                }`}
                onClick={() => handleSourceTypeChange('github')}
              >
                <input
                  type="radio"
                  id="github"
                  name="sourceType"
                  className="text-[#15AE88] focus:ring-[#15AE88]"
                  checked={formData.sourceType === 'github'}
                  onChange={() => handleSourceTypeChange('github')}
                />
                <div className="flex items-center w-full gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="url"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    placeholder="Paste Github link"
                    className={`flex-1 px-2 py-1 text-sm bg-transparent focus:outline-none ${
                      formData.sourceType === 'github' ? '' : 'cursor-pointer'
                    }`}
                    disabled={formData.sourceType !== 'github'}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              disabled={createProject.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#15AE88] text-white text-sm font-medium rounded-lg hover:bg-[#0f8e6d] transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={createProject.isPending || (!formData.source && formData.sourceType === 'github')}
            >
              Analyse Code
            </button>
          </div>

          {createProject.isError && (
            <p className="mt-2 text-sm text-red-600">
              Error creating project: {createProject.error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
