/* Quizの型 */
export interface Quiz {
  title: string;
  text: string;
  answer: string;
  difficulty: number;
  category: string[];
  id?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  };
}
