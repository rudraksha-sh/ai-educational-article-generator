
import React, { useState, useCallback, useMemo } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';

interface StudyGuideDisplayProps {
    content: string;
}

// This helper component parses and renders inline formatting like bold text.
// It uses a simple regex replace and dangerouslySetInnerHTML for simplicity.
const FormattedLine: React.FC<{ text: string }> = ({ text }) => {
    const formattedHtml = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />;
};

const StudyGuideDisplay: React.FC<StudyGuideDisplayProps> = ({ content }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(content).then(() => {
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        });
    }, [content]);
    
    const renderedContent = useMemo(() => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let listItems: React.ReactNode[] = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4">{listItems}</ul>);
                listItems = [];
            }
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                listItems.push(<li key={`li-${index}`} className="text-slate-700 leading-relaxed"><FormattedLine text={trimmedLine.substring(2)} /></li>);
            } else {
                flushList(); // End any list we were in

                if (line.match(/^\*\*Title:/)) {
                    elements.push(<h1 key={index} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500"><FormattedLine text={line.replace('**Title:**', '').trim()} /></h1>);
                } else if (trimmedLine.startsWith('## ')) {
                    elements.push(<h2 key={index} className="text-2xl md:text-3xl font-semibold text-slate-800 mt-10 mb-4 border-b border-slate-300 pb-2"><FormattedLine text={trimmedLine.substring(3)} /></h2>);
                } else if (trimmedLine.startsWith('### ')) {
                    elements.push(<h3 key={index} className="text-xl md:text-2xl font-semibold text-slate-700 mt-8 mb-3"><FormattedLine text={trimmedLine.substring(4)} /></h3>);
                } else if (trimmedLine) { // Only render non-empty lines as paragraphs
                    elements.push(<p key={index} className="text-slate-700 leading-relaxed my-4"><FormattedLine text={trimmedLine} /></p>);
                }
            }
        });

        flushList(); // Flush any remaining list items at the end
        return elements;
    }, [content]);

    return (
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-slate-200">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-md transition-colors duration-200"
                >
                    <ClipboardIcon className="w-4 h-4" />
                    <span>{copyStatus === 'copied' ? 'Copied!' : 'Copy Text'}</span>
                </button>
            </div>
            <article className="prose-lg max-w-none">
                {renderedContent}
            </article>
        </div>
    );
};

export default StudyGuideDisplay;
