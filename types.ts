export type Audience = 'Student' | 'Teacher' | 'Professor' | 'Researcher' | 'General Learner';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ContentFormat = 'Blog-style article' | 'PDF study guide' | 'Quick revision notes';
export type FocusStyle = 'Conceptual understanding' | 'Exam preparation' | 'Real-world applications' | 'Research focus';
export type AddOn = 'Glossary of key terms' | 'Section-wise quick recap boxes' | 'Adaptive difficulty highlighting' | 'Exam-oriented tips';

export interface CustomizationOptions {
    audience: Audience;
    difficulty: Difficulty;
    format: ContentFormat;
    focus: FocusStyle;
    addOns: AddOn[];
}
