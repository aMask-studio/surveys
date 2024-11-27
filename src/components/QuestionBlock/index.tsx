import { FC, useState } from "react";
import { Question } from "../../types/Question";
import { Answer, Types } from "../../types/Answer";
import AnswerBlock from "../AnswerBlock";
import "./styles.scss";

const QuestionBlock:FC<{question:Question,onSelectedAnswer:Function}> = ({question, onSelectedAnswer}) => {
    const answersList = question.answers.map((answer)=>{
        if(question.answers.length>1){
            return <AnswerBlock onSelected={onSelectedAnswer} 
                answer={answer} name={`answer_${question.id}`} type={Types.radio}/>
        } else {
            //return <AnswerBlock answer={answer} name={`answer_${question.id}`} type={Types.input}/>
        }
    });

    return <div className="question-block">
        <h1>{question.text}</h1>
        {answersList}
    </div>
}
export default QuestionBlock;