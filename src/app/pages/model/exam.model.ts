// src/app/pages/model/exam.model.ts
import { Category } from "./category.model";

export interface Exam {
  id: number;
  title: string;
  description: string;
  maxPoints: string;
  numberOfQuestions: string;
  active: boolean;
  categoryId: number;
  category?: Category; // Hacer que la categoría sea opcional
}
