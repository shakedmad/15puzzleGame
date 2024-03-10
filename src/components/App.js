import React, {useState} from 'react';
import './App.css';
import Board from './components/board/board.js';
import LeaderBoard from './components/leaderBoard/leaderBoard';
import CarouselCard from './components/carousel/carousel';
import GameTimer from './components/timer/timer';
import GameHeader from './components/gameHeader/gameHeader';
import {image_1_Folder, image_2_Folder, image_3_Folder} from "../boardImages"


export const photoStateContext = React.createContext();
function App(props) {
  const [gameState, setGamestate] = useState(false); 
  const [timerState, setTimerState] = useState(false);
  const [boardImageState, setBoardImageState] = useState(false);
  const [imgToApply, SetImgToApply] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState(""); 
  const [playerToData, setPlayerToData] = useState([]);
  const [win, setWin] = useState(false);
  
  function gameStarted() { 
    setGamestate(true);
    setTimerState(true);
  }

  function gameOver() {
    setGamestate(false);
    setTimerState(false);
  }

  function onWin(){
    setWin(true);
    setTimerState(false); 
    setGamestate(false);    
  }
  
  function addPlayerToLeaderBoard(time) {
    if (win){
      let playerName = "";
      if (newPlayerName===[] || newPlayerName==="" || newPlayerName===" " || newPlayerName===null) {
        playerName = "unknown player👀👀";
      } else {
        playerName = newPlayerName;
      }
      const playerResult = ({"name": playerName, "time": time})
      setPlayerToData([...playerToData, playerResult]);
      setWin(false);
    }
  } 

  function applyImage(img){
    if (img.id === 1){
      SetImgToApply(image_1_Folder);
    }
    else if (img.id === 2){
      SetImgToApply(image_2_Folder);
    }
    else if (img.id === 3) {
      SetImgToApply(image_3_Folder);
    }
    setBoardImageState(true);
  }
  
  function removeImage(){
    setBoardImageState(false);
  }

  return (
    <div>
      <div className='waviy'>
        <span id={1} style={{"animation-delay": "0.1s"}}>S</span>
        <span id={2} style={{"animation-delay": "0.2s"}}>h</span>
        <span id={3} style={{"animation-delay": "0.3s"}}>a</span>
        <span id={4} style={{"animation-delay": "0.4s"}}>k</span>
        <span id={5} style={{"animation-delay": "0.5s"}}>e</span>
        <span id={6} style={{"animation-delay": "0.6s"}}>d</span>
        <span id={7} style={{"animation-delay": "0.7s"}}>'</span>
        <span id={8} style={{"animation-delay": "0.8s"}}>s</span>
        <br/>
        <span className='invisible'>.    .</span>
        <span id={9} style={{"animation-delay": "0.9s"}}>1</span>
        <span id={10} style={{"animation-delay": "1s"}}>5</span>
        <span className='invisible'>.    .</span>
        <span id={11} style={{"animation-delay": "1.1s"}}>p</span>
        <span id={12} style={{"animation-delay": "1.2s"}}>u</span>
        <span id={13} style={{"animation-delay": "1.3s"}}>z</span>
        <span id={14} style={{"animation-delay": "1.4s"}}>z</span>
        <span id={15} style={{"animation-delay": "1.5s"}}>l</span>
        <span id={16} style={{"animation-delay": "1.6s"}}>e</span>
        <span className='invisible'>.    .</span>
        <span id={17} style={{"animation-delay": "1.7s"}}>g</span>
        <span id={18} style={{"animation-delay": "1.8s"}}>a</span>
        <span id={19} style={{"animation-delay": "1.9s"}}>m</span>
        <span id={20} style={{"animation-delay": "2s"}}>e</span>
      </div>
        <div className='parent-container container-1'>
          <photoStateContext.Provider value={boardImageState}>
            <Board handler={gameStarted} gameState={gameState} onWinning={onWin} removeImg={removeImage} selectedImage={imgToApply} boardImageState={boardImageState}/>
          </photoStateContext.Provider>
        </div>
      <div className='grandparent-Container1'>
        <div className='parent-container container-2'>
          <GameHeader handleOnClick={newPlayerName => setNewPlayerName(newPlayerName)} />
        </div>
        <div className='parent-container container-3'>
          <LeaderBoard newPlayerName={newPlayerName} playerToData={playerToData} addPlayerWin={onWin} />
        </div>
        <div className='parent-container container-4'>
          <GameTimer timerState={timerState} gameState={gameState} gameOver={gameOver} handleTime={addPlayerToLeaderBoard}/>
        </div>
      </div>
      <div className='grandparent-Container2'>
        <div className='container-5'>
          <h5 className='carouselTitle'>click image to apply on board!</h5>
          <CarouselCard imageChosen={applyImage} />
        </div>
      </div>
    </div>
  );
}
export default App;