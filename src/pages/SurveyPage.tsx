import { GetQuestions } from "../api/GetQuestions";
import QuestionBlock from "../components/QuestionBlock";
import { FC, useEffect, useState } from "react";
import { Question } from "../types/Question";
import Button from "../components/Button";
import { Answer } from "../types/Answer";
import { SendResults } from "../api/SendResults";
import { Result } from "../types/Result";

const SurveyPage = () => {
    const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
    var answers: Answer[] = new Array<Answer>();
    var listQuestions;

    const onEndSurvey = () => {
        if(answers.length == questions?.length){
            let newResult: Result[] = new Array<Result>();
            for(let i = 0;i<questions.length;i++){
                answers.forEach((element)=>{
                    if(questions[i].id==element.question){
                        var res:Result={question:questions[i].id,answer:element.text,surveyed:1};
                        newResult.push(res);
                    }
                });
            }
            SendResults(newResult).then((res)=>{
                if(res){
                    alert(res);
                }
            });
        }
    }
    const onAnswerSelected = (answer:Answer) => {
        if(answers){
            for(let i=0;i<answers.length;i++){
                if(answers[i]?.question==answer.question){
                    answers[i] = answer;
                    console.log(answers);
                    return;
                }
            }
            answers.push(answer);
            console.log(answers);
        }
    }

    useEffect(()=>{
        if(!questions){
            GetQuestions().then((res)=>{
                if(res){
                    setQuestions(res);
                }
            });
        }
    });
    if(questions){
        listQuestions = questions.map((question)=>{
            return <QuestionBlock onSelectedAnswer={onAnswerSelected} question={question}/>
        });
    }
    return <div>
        {listQuestions}
        <Button onClicked={onEndSurvey}>Сдать ответы</Button>
    </div>
}
export default SurveyPage;