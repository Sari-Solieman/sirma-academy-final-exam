import { useEffect, useState } from "react"

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const matchResponse = await fetch('/data/matches.csv');
                if (!matchResponse.ok) throw new Error('Matches csv load error');

                const matchText = await matchResponse.text();
                const matchRow = matchText.split('\n').map(row => row.split(','));
                const firstMatch = matchRow[0].map(match => match.trim());
                const matchData = matchRow.slice(1).map(row => {
                    const matches = {};
                    firstMatch.forEach((match, index) => {
                        matches[match] = row[index]?.trim();

                    });
                    return matches
                })
                setMatches(matchData)

            } catch (error) {
                return ('Error fetching matches data:', error)
            }
        };
        const fetchTeamData = async () => {
            try {
                const teamResponse = await fetch('/data/teams.csv');
                if (!teamResponse.ok) throw new Error('Teams csv load error');

                const teamText = await teamResponse.text();
                const teamRow = teamText.split('\n').map(row => row.split(','));
                const firstTeam = teamRow[0].map(match => match.trim());
                const teamData = teamRow.slice(1).map(row => {
                    const teams = {};
                    firstTeam.forEach((match, index) => {
                        teams[match] = row[index]?.trim();

                    });
                    return teams
                })
                setTeams(teamData)

            } catch (error) {
                return ('Error fetching matches data:', error)
            }
        };
        
        fetchMatchData();
        fetchTeamData();
    }, [])

    const getTeamName = (teamID) => {
        const team = teams.find(team => team.ID === teamID);
        return team ? team.Name : 'Unknown';
    };


    const renderMatch = (match, index) => (
        <div className="match" key={index}>
            <div className="team">{getTeamName(match.ATeamID)}</div>
            <div className="score">{match.Score}</div>
            <div className="team">{getTeamName(match.BTeamID)}</div>
            <div className="date">{match.Date}</div>
        </div>
    );


    return (
        <div className="bracket-container">
            <h2>Tournament Bracket</h2>
            <div className="bracket">
                {matches.map((match, index) => (
                    <div key={index} className={`round round-${index}`}>
                        {renderMatch(match, index)}
                    </div>
                ))}
            </div>
        </div>
    );


}
