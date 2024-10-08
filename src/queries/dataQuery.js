export const fetchMatches = async () => {
    const matchResponse = await fetch('/data/matches.csv');
    if (!matchResponse.ok) throw new Error('Matches load error');

    const matchText = await matchResponse.text();
    const matchRow = matchText.split('\n').map(row => row.split(','));
    const firstMatch = matchRow[0].map(match => match.trim());
    const matchData = matchRow.slice(1).map(row => {
        const matches = {};
        firstMatch.forEach((match, index) => {
            matches[match] = row[index]?.trim();

        });
        return matches;
    });

    return matchData;

};

export const fetchTeams = async () => {
    const teamResponse = await fetch('/data/teams.csv');
    if (!teamResponse.ok) throw new Error('Teams load error');

    const teamText = await teamResponse.text();
    const teamRow = teamText.split('\n').map(row => row.split(','));
    const firstTeam = teamRow[0].map(match => match.trim());
    const teamData = teamRow.slice(1).map(row => {
        const teams = {};
        firstTeam.forEach((match, index) => {
            teams[match] = row[index]?.trim();

        });
        return teams;
    });

    return teamData;

};

export const fetchPlayers = async () => {
    const playerResponse = await fetch('/data/players.csv');
    if (!playerResponse.ok) throw new Error('Players load error');

    const playerText = await playerResponse.text();
    const playerRows = playerText.split('\n').map(row => row.split(','));
    const firstPlayer = playerRows[0];
    const playerData = playerRows.slice(1).map(row => {
        const players = {};
        firstPlayer.forEach((player, index) => {
            players[player.trim()] = row[index]?.trim();
        });

        return players;
    });

    return playerData;
};

export const fetchPlayersRecords = async () => {
    const playerRecordResponse = await fetch('/data/records.csv');
    if (!playerRecordResponse.ok) throw new Error('Players records load error')

    const playerRecordText = await playerRecordResponse.text();
    const playerRecordRows = playerRecordText.split('\n').map(row => row.split(','));
    const firstPlayerRecord = playerRecordRows[0];
    const playerRecordData = playerRecordRows.slice(1).map(row => {
        const playersRecords = {};
        firstPlayerRecord.forEach((record, index) => {
            playersRecords[record.trim()] = row[index]?.trim();
        });
        return playersRecords;
    });

    return playerRecordData
}
