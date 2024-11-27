export interface Answer {
    id: number,
    text: string,
    question: number,
    is_correct: boolean
}
export enum Types {
    radio,
    input
}