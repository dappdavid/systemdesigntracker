export enum Category {
  CORE_CONCEPTS = 'Core Concepts',
  DATA_HANDLING = 'Data Handling',
  DISTRIBUTED_SYSTEMS = 'Distributed Systems',
  ARCHITECTURAL_PATTERNS = 'Architectural Patterns',
  SYSTEM_DESIGN_PROBLEMS = 'System Design Problems'
}

export enum Status {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  MASTERED = 'Mastered',
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface Topic {
  id: string;
  title: string;
  category: Category;
  description: string;
  status: Status;
  isQuestion: boolean; // Distinguish between concept vs full design question
  difficulty?: Difficulty;
  notes?: string;
  lastReviewDate?: number;
}

export interface AppState {
  topics: Topic[];
  activeTab: 'dashboard' | 'concepts' | 'problems' | 'settings';
  selectedTopicId: string | null;
  isAiModalOpen: boolean;
}

export type TopicUpdatePayload = Partial<Omit<Topic, 'id'>>;

export interface AIResponse {
  explanation: string;
  keyPoints: string[];
  relatedTopics: string[];
}