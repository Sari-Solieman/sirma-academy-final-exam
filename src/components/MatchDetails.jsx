import { useLocation, useNavigate } from "react-router-dom";

export default function MatchDetails() {
    const location = useLocation();
    const { matchDetails } = location.state;
    const navigate = useNavigate();

    const teamClickHandler = (teamID) => {

        navigate(`/TeamDetails/${teamID}`)
    }

    return (
        <div className="page">
            <div className="match-info">
                <h1>Match Details</h1>
                <p>{matchDetails.date}</p>
                <div className="match-details-team">
                    <div>
                        <button
                            className="team-click"
                            onClick={() => teamClickHandler(matchDetails.aTeam.id)}>{matchDetails.aTeam.name}
                        </button>

                        <div className="score-details">
                            {matchDetails.aTeam.score}
                        </div>

                        <img className="field" src="/assets/field.png" />
                    </div>

                    <div>
                        <button
                            className="team-click"
                            onClick={() => teamClickHandler(matchDetails.bTeam.id)}>{matchDetails.bTeam.name}
                        </button>


                        <div className="score-details">
                            {matchDetails.bTeam.score}
                        </div>

                        <img className="field" src="/assets/field.png" />
                    </div>
                </div>
            </div>
        </div>




    );
}