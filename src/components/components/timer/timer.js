import  React, { useEffect } from "react";
import { useStopwatch } from 'react-timer-hook';
import './timer.css';

export default function GameTimer(props) {
    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
      } = useStopwatch({autoStart: false});
    
    function startGameTimer() {
        reset();
        setTimeout(start, 1000); // reset takes time and update after a tick
    };

    var gameTime;
    function stopDeTimer() { 
        gameTime = `${minutes}:${seconds}`;
        reset();
        pause();
    };

    function startOrStop(){
        if (props.timerState) {
            startGameTimer();
        } else {
            stopDeTimer();
        };
    };

    useEffect(() => { 
        startOrStop();
        props.handleTime(gameTime);   
    }, [props.timerState]);

    useEffect(() => { 
        if (9<minutes) {
            reset();
            pause();
            props.gameOver();
        }
    }, [minutes])

    function showDigit(dig) {
        return dig > 9 ? dig : "0" + dig;
    }
    

    return <div className="timer-box">
        <h1>⏱ {minutes ? showDigit(minutes) : "00"} : {seconds ? showDigit(seconds) : "00"}</h1>
    </div>
}