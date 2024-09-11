import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPlayersRecords } from "../queries/dataQuery";
import { assignPositions } from "../scripts/positions";

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
    };

    const playersLineups = (teamPlayers) => {
        return teamPlayers.filter(player => {
            const record = playersRecords.find(record => record.PlayerID === player.ID)
            if (!record) {
                return false;
            }

            return record.fromMinutes == 0
        });
    };

    const getPlayersLineups = (teamPlayers) => {
        return playersLineups(teamPlayers);
    };

    const aTeamPlayersLineups = getPlayersLineups(matchDetails.aTeam.players);
    const bTeamPlayersLineups = getPlayersLineups(matchDetails.bTeam.players);

    const getAssignedPosition = (teamPlayerLinups, positionKey) => {
        const playerPosition = teamPlayerLinups.filter(player => player.Position === positionKey);
        return assignPositions(playerPosition, positionKey);
    }

    const positions = {
        keeper: 'GK',
        defender: 'DF',
        midfielder: 'MF',
        forward: 'FW',
    }

    const aTeamPlayers = {
        keeper: aTeamPlayersLineups.filter(player => player.Position === positions.keeper),
        defender: getAssignedPosition(aTeamPlayersLineups, positions.defender),
        midfielder: getAssignedPosition(aTeamPlayersLineups, positions.midfielder),
        forward: getAssignedPosition(aTeamPlayersLineups, positions.forward),
    }
    const bTeamPlayers = {
        keeper: bTeamPlayersLineups.filter(player => player.Position === positions.keeper),
        defender: getAssignedPosition(bTeamPlayersLineups, positions.defender),
        midfielder: getAssignedPosition(bTeamPlayersLineups, positions.midfielder),
        forward: getAssignedPosition(bTeamPlayersLineups, positions.forward),
    }

    return (
        <div className="page">
            <div className="match-info">
                <h1>Match Details</h1>
                <div className="details-date">{matchDetails.date}</div>
                <div className="match-details-team">
                    <div className="teams-details">
                        <ul className="teams-info">
                            <li>No.</li>
                            <li>Player</li>
                            <li>Pos.</li>
                        </ul>
                        <ul className="details-players-list">{aTeamPlayersLineups.map((player, ID) => (
                            <li className="teams-info" key={ID}>
                                <div>{player.TeamNumber}</div>
                                <div>{player.FullName}</div>
                                <div className={`${player.Position}`}>{player.Position}</div>
                            </li>
                        ))}
                        </ul>
                    </div>
                    <div>
                        <button
                            className="team-click"
                            onClick={() => teamClickHandler(matchDetails.aTeam.id)}>{matchDetails.aTeam.name}
                        </button>

                        <div className="score-details">
                            {matchDetails.aTeam.score}
                        </div>
                        <div className="field" >
                            <ul className="a-players">
                                {aTeamPlayers.keeper.map((player, id) => (
                                    <li className={`${player.positions}`} key={id}>{player.Position}</li>
                                ))}
                            </ul>
                            <ul className="defenders-list a-players">
                                {aTeamPlayers.defender.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
                                ))}
                            </ul>
                            <ul className="midfielders-list a-players">
                                {aTeamPlayers.midfielder.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
                                ))}
                            </ul>
                            <ul
                                className="forwards-list a-players">
                                {aTeamPlayers.forward.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
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
                            <ul className="b-players">
                                {bTeamPlayers.keeper.map((player, id) => (
                                    <li className={`${player.positions}`} key={id}>{player.Position}</li>
                                ))}
                            </ul>
                            <ul className="defenders-list b-players">
                                {bTeamPlayers.defender.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
                                ))}
                            </ul>

                            <ul className="midfielders-list b-players">
                                {bTeamPlayers.midfielder.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
                                ))}
                            </ul>
                            <ul className="forwards-list b-players">
                                {bTeamPlayers.forward.map((player, id) => (
                                    <li className={`${player.positionType}`} key={id}>{player.positionType}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="match-details-team">
                        <div className="teams-details">
                            <ul className="teams-info">
                                <li>No.</li>
                                <li>Player</li>
                                <li>Pos.</li>
                            </ul>
                            <ul className="details-players-list">{bTeamPlayersLineups.map((player, ID) => (
                                <li className="teams-info" key={ID}>
                                    <div>{player.TeamNumber}</div>
                                    <div>{player.FullName}</div>
                                    <div className={`${player.Position}`}>{player.Position}</div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}


