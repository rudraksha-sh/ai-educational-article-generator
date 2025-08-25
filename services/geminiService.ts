import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';
import { CustomizationOptions } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudyGuide = async (syllabus: string, options: CustomizationOptions): Promise<string> => {
    try {
        const customizationPrompt = `
### CUSTOMIZATION PREFERENCES
- **Target Audience**: ${options.audience}
- **Difficulty Level**: ${options.difficulty}
- **Content Format**: ${options.format}
- **Focus Style**: ${options.focus}
- **Learning Add-ons**: ${options.addOns.length > 0 ? options.addOns.join(', ') : 'None'}
`;

        const fullPrompt = `${SYSTEM_PROMPT}\n\n${customizationPrompt}\n\nSyllabus/Keywords:\n${syllabus}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
                topK: 64,
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API call failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
};
