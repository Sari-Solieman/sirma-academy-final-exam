export const assignPositions = (players, positionCategory) => {
    const totalPlayers = players.length;

    if (positionCategory === 'DF') {
        if (totalPlayers <= 3) {
            return players.map(player => ({ ...player, positionType: 'CB' }));
        } else if (totalPlayers === 4) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LB' };
                if (index === 3) return { ...player, positionType: 'RB' };
                return { ...player, positionType: 'CB' };
            });
        } else if (totalPlayers >= 5) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LWB' };
                if (index === 4) return { ...player, positionType: 'RWB' };
                return { ...player, positionType: 'CB' };
            });
        } else {
            return players.map(player => ({ ...player, positionType: 'DF' }));
        }
    }

    if (positionCategory === 'MF') {
        if (totalPlayers <= 3) {
            return players.map(player => ({ ...player, positionType: 'CM' }));
        } else if (totalPlayers === 4) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LM' };
                if (index === 3) return { ...player, positionType: 'RM' };
                return { ...player, positionType: 'CM' };
            });
        } else if (totalPlayers === 5) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LM' };
                if (index === 2) return { ...player, positionType: 'CDM' };
                if (index === 4) return { ...player, positionType: 'RM' };
                return { ...player, positionType: 'CM' };
            });
        } else {
            return players.map(player => ({ ...player, positionType: 'MF' }));
        }
    }

    if (positionCategory === 'FW') {
        if (totalPlayers === 4) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LW' };
                if (index === 3) return { ...player, positionType: 'RW' };
                return { ...player, positionType: 'CF' };
            });
        } else if (totalPlayers === 3) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LW' };
                if (index === 2) return { ...player, positionType: 'RW' };
                return { ...player, positionType: 'CF' };
            });
        } else if (totalPlayers === 2) {
            return players.map((player, index) => {
                if (index === 0) return { ...player, positionType: 'LF' };
                return { ...player, positionType: 'RF' };
            });
        } else if (totalPlayers === 1) {
            return players.map(player => ({ ...player, positionType: 'CF' }))
        }
        else {
            return players.map(player => ({ ...player, positionType: 'FW' }));
        }
    }

    return players.map(player => ({ ...player, positionType: positionCategory }));
};
