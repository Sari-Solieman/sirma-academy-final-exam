export const parseScore = (score) => {
    const scoreParts = score.split('-');
    const aTeamScore = scoreParts[0]?.trim();
    const bTeamScore = scoreParts[1]?.trim();

    return { aTeamScore, bTeamScore };
};