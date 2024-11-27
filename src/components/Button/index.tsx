import { FC } from 'react';
import './styles.scss'

const Button: FC<{children:any, onClicked?:Function}> = ({children, onClicked}) => {
    return <button onClick={()=>{onClicked && onClicked()}}>
        {children}
    </button>
}
export default Button;