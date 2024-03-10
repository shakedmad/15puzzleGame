import './square.css';

export default function Square(props) {
    return <button id={props.id}
                   className="square"
                   disabled={props.isDisabled ? "disabled":''}
                   onClick={() => props.onClick(props.value)}
            >
                {(props.imageLink && props.imageLink != "" && props.id != "lastSquare") ?
                <img src={props.imageLink} alt={props.imageTitle}
                     className={props.isDisabled ? "drakedImage":''}/> :
                props.value}
            </button>
};


















/*
export default function Square({value}) {
    return <button className="square">{value}</button>
}









<div className="boardrow">
            <Square className="square" value={mix[0]} />
            <Square className="square" value={mix[1]} />
            <Square className="square" value={mix[2]} />
        </div>
        <div className="boardrow">
            <Square className="square" value={mix[3]} />
            <Square className="square" value={mix[4]} />
            <Square className="square" value={mix[5]} />
        </div>
        <div className="boardrow">
            <Square className="square" value={mix[6]} />
            <Square className="square" value={mix[7]} />
            <Square className="square" value={mix[8]} />
        </div>  
*/