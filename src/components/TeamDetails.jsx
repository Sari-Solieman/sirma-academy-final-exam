import { fetchTeams, fetchPlayers } from '../queries/dataQuery'
import { useQuery } from "@tanstack/react-query";


export default function TeamDetails() {
    const { data: players, isLoading: playersLoading, error: playersError } = useQuery({
        queryKey: ['players'],
        queryFn: fetchPlayers,
    });

    const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
    });

    if (playersLoading || teamsLoading) return <div>Loading...</div>;
    if (playersError) return <div>Error fetching players: {playersError.message}</div>;
    if (teamsError) return <div>Error fetching teams: {teamsError.message}</div>;


    const getPlayersForTeam = (teamID) => {

        const positionOrder = {
            GK: 1,
            DF: 2,
            MF: 3,
            FW: 4
        };

        return players
            .filter(player => player.TeamID === teamID)
            .sort((a, b) => {
                const posA = positionOrder[a.Position] || 999;
                const posB = positionOrder[b.Position] || 999;
                return posA - posB;
            });
    };

    return (
        <div>
            <h2>Teams and Players</h2>
            {teams.map((team, index) => (
                <div key={index}>
                    <h3>{team.Name}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Player</th>
                                <th>Pos.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPlayersForTeam(team.ID).map((player, playerIndex) => (
                                <tr key={playerIndex}>
                                    <td>{player.TeamNumber}</td>
                                    <td>{player.FullName}</td>
                                    <td>{player.Position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
