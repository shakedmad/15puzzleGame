import {useState, useEffect } from 'react';
import {Table, Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './leaderBoard.css';

export default function LeaderBoard(props) {   
    const [allPlayers, setAllPlayers] = useState([]); // setting when a new player is added to de data

    function sort(data) {
        if (data){
            let sortedData = data.sort(timeStrComparison);
            for(let i = 0 ; i < sortedData.length; i++) {
                sortedData[i].rank = i+1;
            }
            setAllPlayers(sortedData);
        }
    }

    function timeStrComparison(obj1, obj2) {
        const time1ToArr = obj1.time.split(":");
        const time2ToArr = obj2.time.split(":");
        const minDigit1 = parseInt(time1ToArr[0])
        const secondsDigit1 = parseInt(time1ToArr[1])
        const minDigit2 = parseInt(time2ToArr[0])
        const secondsDigit2 = parseInt(time2ToArr[1])

        const result = minDigit1 - minDigit2;
        return result != 0 ? result : secondsDigit1 - secondsDigit2;
    }
    
    useEffect(() => {
        sort(props.playerToData);
    },[props.playerToData])

    return <Container className='tableContainer' >
        <Col  md={{offset:0.5, span: 10}}>
        <Table className="leaderBoard" striped hover size="sm" >
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    allPlayers.map((player) => 
                        <tr key={player?.name}>
                            <td>{player?.rank}</td>
                            <td>{player?.name}</td>
                            <td>{player?.time}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        </Col>
        </Container>
}