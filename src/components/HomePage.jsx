import { useEffect, useState } from "react"
import parseDate from "../dataFormat";

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
    const parseScore = (score) => {
        const scoreParts = score.split('-');
        const aTeamScore = scoreParts[0]?.trim();
        const bTeamScore = scoreParts[1]?.trim();

        return { aTeamScore, bTeamScore };
    }


    const renderMatch = (match, index,) => {
        const { aTeamScore, bTeamScore } = parseScore(match.Score);
        return (

            <div className="match" key={index}>
                <div className="date">{match.Date}</div>
                <div className="team-score">
                    <div className="team">{getTeamName(match.ATeamID)}</div>
                    <div className="score">{aTeamScore}</div>
                </div>
                <div className="team-score">
                    <div className="team">{getTeamName(match.BTeamID)}</div>
                    <div className="score">{bTeamScore}</div>
                </div>
            </div>
        );

    }

    const groupMatchesByStage = () => {
        const groupStageEnd = parseDate('26-06-2024');
        const roundOf16End = parseDate('02-07-2024');
        const quarterFinalsEnd = parseDate('06-07-2024');
        const semiFinalsEnd = parseDate('10-07-2024');

        const groupStage = matches.filter(match => parseDate(match.Date) <= groupStageEnd);

        const roundOf16 = matches.filter(match => {
            const matchDate = parseDate(match.Date);
            return matchDate > groupStageEnd && matchDate <= roundOf16End
        });

        const quarterFinals = matches.filter(match => {
            const matchDate = parseDate(match.Date);
            return matchDate > roundOf16End && matchDate <= quarterFinalsEnd
        });

        const semiFinals = matches.filter(match => {
            const matchDate = parseDate(match.Date);
            return matchDate > quarterFinalsEnd && matchDate <= semiFinalsEnd
        });

        const final = matches.filter(match => parseDate(match.Date) > semiFinalsEnd);

        return { groupStage, roundOf16, quarterFinals, semiFinals, final };
    };



    const { groupStage, roundOf16, quarterFinals, semiFinals, final } = groupMatchesByStage();



    return (
        <div className="bracket-view">
            {<div className="group-stage">
                <h2>Group Stage</h2>
                <div className="bracket">
                    {groupStage.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match, index)}
                        </div>
                    ))}
                </div>
            </div>}
            <div>
                <h2>Round Of 16</h2>
                <div className="bracket">
                    {roundOf16.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match, index,)}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Quarter Finals</h2>
                <div className="qf-bracket">
                    {quarterFinals.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match, index,)}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Semi Finals</h2>
                <div className="sf-bracket">
                    {semiFinals.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match, index,)}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Final</h2>
                <div className="f-bracket">
                    {final.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match, index,)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};