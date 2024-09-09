import { useLocation } from "react-router-dom";

export default function MatchDetails() {
    const location = useLocation();
    const { matchDetails } = location.state;

    return (
        <div>
            <h1>Match Details</h1>
            <p>{matchDetails.date}</p>
            <h2>{matchDetails.aTeam.name} vs {matchDetails.bTeam.name}</h2>
            <p>Score: {matchDetails.aTeam.score} - {matchDetails.bTeam.score}</p>

            <h3>{matchDetails.aTeam.name} Players</h3>
            <ul>
                {matchDetails.aTeam.players.map(player => (
                    <li key={player.ID}>
                        {player.TeamNumber} 
                        {player.FullName} 
                        {player.Position} </li>
                ))}
            </ul>

            <h3>{matchDetails.bTeam.name} Players</h3>
            <ul>
                {matchDetails.bTeam.players.map(player => (
                    <li key={player.ID}>
                    {player.TeamNumber} 
                    {player.FullName} 
                    {player.Position} </li>
                ))}
            </ul>
        </div>
    );
}