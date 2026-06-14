/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoupleInfo {
  partner1: string;
  partner2: string;
  anniversaryDate: string; // YYYY-MM-DD
  avatar1?: string;
  avatar2?: string;
}

export interface TimelineEvent {
  id: string;
  date: string; // YYYY-MM-DD or readable month/year
  title: string;
  description: string;
  emoji: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  trivia: string;
}

export interface JarMessage {
  id: string;
  text: string;
  category: 'compliment' | 'challenge' | 'quote' | 'wish';
}
