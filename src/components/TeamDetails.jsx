import React, { useState, useEffect } from 'react';

export default function TeamDetails() {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchTeamsData = async () => {
            try {
                const teamResponse = await fetch('/data/teams.csv'); 
                if (!teamResponse.ok) throw new Error('Teams CSV load error');

                const teamText = await teamResponse.text();
                const teamRows = teamText.split('\n').map(row => row.split(','));
                const teamHeaders = teamRows[0];
                const teamData = teamRows.slice(1).map(row => {
                    const obj = {};
                    teamHeaders.forEach((header, index) => {
                        obj[header.trim()] = row[index]?.trim();
                    });
                    return obj;
                });
                
                setTeams(teamData);

            } catch (error) {
                return('Error fetching teams CSV data:', error);
            }
        };

        const fetchPlayersData = async () => {
            try {
                const playerResponse = await fetch('/data/players.csv'); 
                if (!playerResponse.ok) throw new Error('Players CSV load error');

                const playerText = await playerResponse.text();
                const playerRows = playerText.split('\n').map(row => row.split(','));
                const playerHeaders = playerRows[0];
                const playerData = playerRows.slice(1).map(row => {
                    const obj = {};
                    playerHeaders.forEach((header, index) => {
                        obj[header.trim()] = row[index]?.trim();
                    });
                    return obj;
                });
                setPlayers(playerData);

            } catch (error) {
                return('Error fetching players CSV data:', error);
            }
        };

        fetchTeamsData();
        fetchPlayersData();
    }, []);

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
