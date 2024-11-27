import { FC } from "react";
import { Answer, Types } from "../../types/Answer";
import "./styles.scss";

const AnswerBlock: FC<{answer:Answer, name:string, type: Types, onSelected:Function}> = ({answer, name, type, onSelected}) => {
    switch(type){
        case Types.radio:
            return <label className="answer-block">
                <input onClick={()=>onSelected(answer)} name={name} className="radio-button" type="radio"/> {answer.text}
            </label>
        case Types.input:
            return <label className="answer-block">
                <input name={name} className="" type="input"/>
            </label>
    }
}
export default AnswerBlock;