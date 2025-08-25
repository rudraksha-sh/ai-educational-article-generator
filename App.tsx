import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import StudyGuideDisplay from './components/StudyGuideDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStudyGuide } from './services/geminiService';
import { CustomizationOptions } from './types';

const App: React.FC = () => {
    const [syllabus, setSyllabus] = useState<string>('');
    const [studyGuide, setStudyGuide] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [customizations, setCustomizations] = useState<CustomizationOptions>({
        audience: 'Student',
        difficulty: 'Intermediate',
        format: 'PDF study guide',
        focus: 'Exam preparation',
        addOns: [],
    });

    const handleGenerate = useCallback(async () => {
        if (!syllabus.trim()) {
            setError('Please enter a syllabus or keywords.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setStudyGuide('');

        try {
            const result = await generateStudyGuide(syllabus, customizations);
            setStudyGuide(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to generate study guide. ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [syllabus, customizations]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    <p className="text-center text-slate-600 mb-8 text-lg">
                        Enter a syllabus outline or topic keywords below to generate a comprehensive, exam-ready study guide.
                    </p>
                    
                    <InputForm
                        syllabus={syllabus}
                        setSyllabus={setSyllabus}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                        customizations={customizations}
                        setCustomizations={setCustomizations}
                    />

                    {error && (
                        <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="mt-10">
                        {isLoading && <LoadingSpinner />}
                        {studyGuide && <StudyGuideDisplay content={studyGuide} />}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
