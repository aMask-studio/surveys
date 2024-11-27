import { Answer } from "./Answer";

export interface Question {
    id: number,
    text: string,
    answers: Answer[]
}