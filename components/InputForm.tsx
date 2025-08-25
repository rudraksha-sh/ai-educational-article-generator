import React from 'react';
import { CustomizationOptions, Audience, Difficulty, ContentFormat, FocusStyle, AddOn } from '../types';

interface InputFormProps {
    syllabus: string;
    setSyllabus: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    customizations: CustomizationOptions;
    setCustomizations: (value: CustomizationOptions | ((prev: CustomizationOptions) => CustomizationOptions)) => void;
}

const audienceOptions: Audience[] = ['Student', 'Teacher', 'Professor', 'Researcher', 'General Learner'];
const difficultyOptions: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const formatOptions: ContentFormat[] = ['PDF study guide', 'Blog-style article', 'Quick revision notes'];
const focusOptions: FocusStyle[] = ['Exam preparation', 'Conceptual understanding', 'Real-world applications', 'Research focus'];
const addOnOptions: AddOn[] = ['Glossary of key terms', 'Section-wise quick recap boxes', 'Adaptive difficulty highlighting', 'Exam-oriented tips'];

const InputForm: React.FC<InputFormProps> = ({ syllabus, setSyllabus, onGenerate, isLoading, customizations, setCustomizations }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate();
    };

    const handleAddOnToggle = (addOn: AddOn) => {
        setCustomizations(prev => {
            const newAddOns = prev.addOns.includes(addOn)
                ? prev.addOns.filter(a => a !== addOn)
                : [...prev.addOns, addOn];
            return { ...prev, addOns: newAddOns };
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100">
            <div>
                <label htmlFor="syllabus-input" className="block text-xl font-bold mb-4 text-slate-800">
                    Syllabus / Keywords
                </label>
                <textarea
                    id="syllabus-input"
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    placeholder="e.g., Operating System Basics, Process Management, Memory Management..."
                    className="w-full h-48 p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out resize-y text-base placeholder-slate-400"
                    disabled={isLoading}
                />
            </div>

            {/* --- Customization Options --- */}
            <div className="mt-6 border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                    Customize Your Guide
                </h3>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        {/* Target Audience */}
                        <div>
                            <label htmlFor="audience" className="block text-sm font-medium text-slate-600 mb-2">Target Audience</label>
                            <select id="audience" value={customizations.audience} onChange={e => setCustomizations(p => ({...p, audience: e.target.value as Audience}))} className="w-full p-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {audienceOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        {/* Content Difficulty */}
                         <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-600 mb-2">Content Difficulty</label>
                            <select id="difficulty" value={customizations.difficulty} onChange={e => setCustomizations(p => ({...p, difficulty: e.target.value as Difficulty}))} className="w-full p-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {difficultyOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                         {/* Content Format */}
                        <div>
                            <label htmlFor="format" className="block text-sm font-medium text-slate-600 mb-2">Content Format</label>
                            <select id="format" value={customizations.format} onChange={e => setCustomizations(p => ({...p, format: e.target.value as ContentFormat}))} className="w-full p-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {formatOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                         {/* Focus Style */}
                        <div>
                            <label htmlFor="focus" className="block text-sm font-medium text-slate-600 mb-2">Focus Style</label>
                            <select id="focus" value={customizations.focus} onChange={e => setCustomizations(p => ({...p, focus: e.target.value as FocusStyle}))} className="w-full p-2 bg-white border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                {focusOptions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Learning Add-ons */}
                    <div>
                         <label className="block text-sm font-medium text-slate-600 mb-3">Learning Add-ons</label>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                            {addOnOptions.map(addOn => (
                                <label key={addOn} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={customizations.addOns.includes(addOn)}
                                        onChange={() => handleAddOnToggle(addOn)}
                                        className="h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-slate-700">{addOn}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
            
            <button
                type="submit"
                disabled={isLoading || !syllabus.trim()}
                className="mt-8 w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : (
                    'Generate Study Guide'
                )}
            </button>
        </form>
    );
};

export default InputForm;