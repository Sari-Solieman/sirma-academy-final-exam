import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPlayersRecords } from "../queries/dataQuery";

export default function MatchDetails() {
    const location = useLocation();
    const { matchDetails } = location.state;
    const navigate = useNavigate();

    const { data: playersRecords, isLoading: recordsLoading, error: recordsError } = useQuery({
        queryKey: ['playerRecords'],
        queryFn: fetchPlayersRecords,
    });

    if (recordsLoading) return <div>Loading...</div>
    if (recordsError) return <div>Error fetching records:{recordsError.message}</div>

    const teamClickHandler = (teamID) => {

        navigate(`/TeamDetails/${teamID}`)
    }

    const playerWhoPlayed = (teamPlayers) => {
        return teamPlayers.filter(player => {
            const record = playersRecords.find(record => record.PlayerID === player.ID)
            if (!record) {
                return false;
            }

            return record.fromMinutes >= 0 || record.toMinutes > 0 || record.toMinutes === null

        });
    };

    const aTeamPlayers = matchDetails.aTeam.players;
    const aTeamPlayersWhoPlayed = playerWhoPlayed(aTeamPlayers);
    const bTeamPlayers = matchDetails.bTeam.players
    const bTeamPlayersWhoPlayed = playerWhoPlayed(bTeamPlayers);




    return (
        <div className="page">
            <div className="match-info">
                <h1>Match Details</h1>
                <p>{matchDetails.date}</p>
                <div className="match-details-team">
                    <div>
                        <button
                            className="team-click"
                            onClick={() => teamClickHandler(matchDetails.aTeam.id)}>{matchDetails.aTeam.name}
                        </button>

                        <div className="score-details">
                            {matchDetails.aTeam.score}
                        </div>
                        <div className="field" >
                            <ul className="played-players">{aTeamPlayersWhoPlayed.map((player) => (
                                <li key={player.ID}>{player.FullName}</li>
                            ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <button
                            className="team-click"
                            onClick={() => teamClickHandler(matchDetails.bTeam.id)}>{matchDetails.bTeam.name}
                        </button>

                        <div className="score-details">
                            {matchDetails.bTeam.score}
                        </div>

                        <div className="field">
                            <ul className="played-players">{bTeamPlayersWhoPlayed.map((player) => (
                                <li key={player.ID}>{player.FullName}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
}