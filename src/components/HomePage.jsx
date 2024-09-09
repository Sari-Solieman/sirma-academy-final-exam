import parseDate from "../dataFormat";
import { useNavigate } from "react-router-dom";
import { parseScore } from "../parseScore";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches, fetchTeams } from '../queries/dataQuery'

export default function Matches() {

    const navigate = useNavigate();

    // Fetch matches using React Query
    const { data: matches, isLoading: matchesLoading, error: matchesError } = useQuery({
        queryKey: ['matches'],
        queryFn: fetchMatches,
    });

    // Fetch teams using React Query
    const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
        queryKey: ['teams'],
        queryFn: fetchTeams,
    });

    // Handle loading and error states
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
            navigate(`/match/${match.MatchID}`, { state: { match } })
        }
        return (

            <div className="match" onClick={matchClickHandler}>
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
                            {renderMatch(match)}
                        </div>
                    ))}
                </div>
            </div>}
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
            <div>
                <h2>Quarter Finals</h2>
                <div className="qf-bracket">
                    {quarterFinals.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match)}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Semi Finals</h2>
                <div className="sf-bracket">
                    {semiFinals.map((match, index) => (
                        <div key={index}>
                            {renderMatch(match)}
                        </div>
                    ))}
                </div>
            </div>
            <div>
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
    );
};