import React, {useRef} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gameHeader.css';

export default function GameHeader(props){ 
    const inputRef = useRef(); 
    return <>
      <Row className='inputAndButton'>
        <Col md={{ span: 2, offset: 0 }} >
          <input ref={inputRef}  type='text' className="playerNameBox" placeholder="Your name:)))))))" />
        </Col>
        <Col md={5}>
          <button className='addToBoardButton' onClick={() => props.handleOnClick(inputRef.current.value)} type="button">add your name!</button>
        </Col>
      </Row>     
      <br/>
      <div className='current-player-text'>
        {inputRef.current?<h1>{inputRef.current.value?inputRef.current.value+" is playing✨": "👀👀" }</h1>:""}
      </div>
      <br/>
    </>
  };