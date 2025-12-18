
export type SlideType = 'title' | 'content' | 'visual' | 'split' | 'conclusion' | 'interactive' | 'strategy' | 'simulation';

export interface SlidePoint {
  label: string;
  description: string;
  deadlockImpact?: string; // Specific detail on how this condition causes deadlock
  icon?: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  headerIcon?: string;
  content?: string[];
  points?: SlidePoint[];
  visualId?: string;
  visualStep?: number;
}

export interface GroupMember {
  name: string;
  role?: string;
}
