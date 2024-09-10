export const getTeamPlayers = (teamID, players) => {
    const teamPlayers = players.filter(player => player.TeamID === teamID)

    const positionOrder = {
        GK: 1,
        DF: 2,
        MF: 3,
        FW: 4
    };
    
    return teamPlayers.sort((a, b) => {
        const posA = positionOrder[a.Position] || 999;
        const posB = positionOrder[b.Position] || 999;
        return posA - posB;

    });
};