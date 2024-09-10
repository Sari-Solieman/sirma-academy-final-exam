import { useParams } from 'react-router-dom';
import { fetchPlayers, fetchTeams } from '../queries/dataQuery'
import { useQuery } from "@tanstack/react-query";


export default function TeamDetails() {

    const { teamID } = useParams();

    const { data: players, isLoading: playersLoading, error: playersError } = useQuery({
        queryKey: ['players'],
        queryFn: fetchPlayers,
    });

    const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
    })

    if (playersLoading || teamsLoading) return <div>Loading...</div>;
    if (playersError) return <div>Error fetching players: {playersError.message}</div>;
    if (teamsError) return <div>Error fetching teams: {teamsError.message}</div>;

    const team = teams.find(team => team.ID === teamID);

    const fillteredPlayers = players
        .filter(player => player.TeamID === teamID)
        .sort((a, b) => {
            const positionOrder = {
                GK: 1,
                DF: 2,
                MF: 3,
                FW: 4
            }
            const posA = positionOrder[a.Position] || 999;
            const posB = positionOrder[b.Position] || 999;
            return posA - posB
        })


    return (
        <div className='teams-details'>
            <h1>Team Details</h1>
            <h2>{team ? team.Name : 'Unknown Team'}</h2>
            <ul className='players-list'>
                {fillteredPlayers.map((player) => (
                    <li className='teams-info' key={player.ID}>
                        <div>{player.TeamNumber}</div>
                        <div>{player.FullName}</div>
                        <div>{player.Position}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
};