import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches, fetchTeams, fetchPlayers } from '../queries/dataQuery'
import { parseScore } from "../scripts/parseScore";
import { parseDate } from "../scripts/dateFormat"
import { getTeamPlayers } from "../scripts/teamPlayers";

export default function Matches() {

    const navigate = useNavigate();

    const { data: matches, isLoading: matchesLoading, error: matchesError } = useQuery({
        queryKey: ['matches'],
        queryFn: fetchMatches,
    });

    const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
    });

    const { data: players } = useQuery({
        queryKey: ['players'],
        queryFn: fetchPlayers,
    });

    if (matchesLoading || teamsLoading) return <div>Loading...</div>;
    if (matchesError) return <div>Error fetching matches: {matchesError.message}</div>;
    if (teamsError) return <div>Error fetching teams: {teamsError.message}</div>;

    const getTeamName = (teamID) => {
        const team = teams.find(team => team.ID === teamID);
        return team ? team.Name : 'Unknown';
    };




    const renderMatch = (match) => {
        const { aTeamScore, bTeamScore } = parseScore(match.Score);

        const matchClickHandler = () => {
            const matchDetails = {
                matchID: match.ID,
                date: match.Date,
                aTeam: {
                    id: match.ATeamID,
                    name: getTeamName(match.ATeamID),
                    players: getTeamPlayers(match.ATeamID, players),
                    score: aTeamScore,
                },
                bTeam: {
                    id: match.BTeamID,
                    name: getTeamName(match.BTeamID),
                    players: getTeamPlayers(match.BTeamID, players),
                    score: bTeamScore,
                },
            }
            navigate(`/MatchDetails/${match.ID}`, { state: { matchDetails } })
        }

        const aTeamStyle = aTeamScore > bTeamScore ? { fontWeight: 'bold' } : {};

        const bTeamStyle = bTeamScore > aTeamScore ? { fontWeight: 'bold' } : {};

        return (

            <div className="match" onClick={matchClickHandler}>
                <div className="date">{match.Date}</div>
                <div className="team-score">
                    <div className="team" style={aTeamStyle}>{getTeamName(match.ATeamID)}</div>
                    <div className="score" style={aTeamStyle}>{aTeamScore}</div>
                </div>
                <div className="team-score">
                    <div className="team" style={bTeamStyle}>{getTeamName(match.BTeamID)}</div>
                    <div className="score" style={bTeamStyle}>{bTeamScore}</div>
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
        <>
            <div className="page">
                <div>
                    <h2 className="grp-stage-h2">Group Stage</h2>
                    <div className="group-stage">
                        {groupStage.map((match, index) => (
                            <div key={index}>
                                {renderMatch(match)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bracket-view">
                    <div>
                        <h2>Round Of 16</h2>
                        <div className="bracket">
                            {roundOf16.map((match, index) => (
                                <div key={index}>
                                    {renderMatch(match)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="qf">
                        <h2>Quarter Finals</h2>
                        <div className="qf-bracket">
                            {quarterFinals.map((match, index) => (
                                <div key={index}>
                                    {renderMatch(match)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sf">
                        <h2>Semi Finals</h2>
                        <div className="sf-bracket">
                            {semiFinals.map((match, index) => (
                                <div key={index}>
                                    {renderMatch(match)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="f">
                        <h2>Final</h2>
                        <div className="f-bracket">
                            {final.map((match, index) => (
                                <div key={index}>
                                    {renderMatch(match)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};