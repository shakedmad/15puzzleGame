import Square from './components/square';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './board.css';


export default function Board(props) {
    let boxes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const [mix, setMix] = useState(boxes);
    function mixer() {
        let numsArr = [];
        while (numsArr.length < 16) {
            let singleDigit = Math.floor(Math.random() * 10);
            let doubleDigit = Math.floor(Math.random() * 100);
            if (!numsArr.includes(singleDigit))
                numsArr.push(singleDigit)
            if (!numsArr.includes(doubleDigit) && doubleDigit < 16)
                numsArr.push(doubleDigit)
        }
        return numsArr;
    }

    function isItTheLastQuare(val) {
        if (val === 15)
            return "lastSquare";
        return "aSquare";
    };

    function closeSquares(indexOfLastSquare, numOfRows, clickedSquareIndex) {//the checkIfGame will remain 4*4 grid - but i do need to generalize the func
        const prior = indexOfLastSquare - 1;
        const following = indexOfLastSquare + 1;
        const upwards = indexOfLastSquare - numOfRows;
        const downwards = indexOfLastSquare + numOfRows;
        const ShouldBecloseSquares = [prior, following, upwards, downwards];
        return ShouldBecloseSquares.includes(clickedSquareIndex) ? true : false;
    }

    function findLastSquareIndex(array) {
        return array.indexOf(15);
    }

    var ChoiceArr = [];
    function squareClick(vall) {
        if (0 < ChoiceArr.length < 1) {
            ChoiceArr.push(vall);
        }
        let lastSquareInxed = findLastSquareIndex(mix);
        let clickedSquare = mix.indexOf(vall)
        if (closeSquares(lastSquareInxed, 4, clickedSquare)) {
            switchSquares();
        } else {
            toast.warning(("can't switch to the empty space"), {
                className: "cantSwitchToast",
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            ChoiceArr = [];
        };
    };

    var mixCopy = mix;
    function switchSquares() {
        if (ChoiceArr.length === 1) {
            let emptySquareIndex = mix.indexOf(15);
            let firstIndex = mix.indexOf(ChoiceArr[0]); 
            let temp = mixCopy[firstIndex];
            mixCopy[firstIndex] = mixCopy[emptySquareIndex]; // setting the 1st value to the sec's place in the array
            mixCopy[emptySquareIndex] = temp;
            setMix([...mixCopy]);
        } 
        ChoiceArr = [];
        checkIfGame();
    };

    function areDeArraysEqual() {
        for (let i = 0; i < boxes.length; i++) {
            if (mix[i] !== boxes[i]) {
                return false;
            }
        };
        return true;
    };

    function checkIfGame() {
        if (mix.length === boxes.length && areDeArraysEqual()) {
            props.onWinning();
            toast.success(('great success!\n You win!'), {
                bodyClassName: "youWinToast",
                position: "top-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    function startGame() {
        setMix(mixer);
        props.handler();
    };


    return <div className="bigBoard">
        <div className='gameBoard'>
            <div className="boardrow">
                {
                    (mix.slice(0, 4)).map((num) =>
                        <Square id={isItTheLastQuare(mix[mix.indexOf(num)])} onClick={squareClick} value={mix[mix.indexOf(num)]} isDisabled={!props.gameState} imageLink={props.boardImageState ? props.selectedImage[num] : ""} imgTitle="image" />
                    )
                }
            </div>
            <div className="boardrow">
                {
                    (mix.slice(4, 8)).map((num) =>
                        <Square id={isItTheLastQuare(mix[mix.indexOf(num)])} onClick={squareClick} value={mix[mix.indexOf(num)]} isDisabled={!props.gameState} imageLink={props.boardImageState ? props.selectedImage[num] : ""} imgTitle="image" />
                    )
                }
            </div>
            <div className="boardrow">
                {
                    (mix.slice(8, 12)).map((num) =>
                        <Square id={isItTheLastQuare(mix[mix.indexOf(num)])} onClick={squareClick} value={mix[mix.indexOf(num)]} isDisabled={!props.gameState} imageLink={props.boardImageState ? props.selectedImage[num] : ""} imgTitle="image" />
                    )
                }
            </div>
            <div className="boardrow">
                {
                    (mix.slice(12, 16)).map((num) =>
                        <Square id={isItTheLastQuare(mix[mix.indexOf(num)])} onClick={squareClick} value={mix[mix.indexOf(num)]} isDisabled={!props.gameState} imageLink={props.boardImageState ? props.selectedImage[num] : ""} imgTitle="image" />
                    )
                }
            </div>
        </div>
        <br />
        <button className='button' id='startGameButton' onClick={startGame}>start!</button>
        <button className='button' id='changeImageButton' onClick={() => props.removeImg()} >Remove image</button>
        <ToastContainer />
    </div>
}
