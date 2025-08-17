export interface TurnManagerOptions {
    firstTurnPlayer?: string
}

export function createTurnManager(players: string[], options?: TurnManagerOptions) {
    return new TurnManagerImpl(players, options);
}

export type TurnManager = InstanceType <typeof TurnManagerImpl>

class TurnManagerImpl {
    private players: string[];
    private currentTurn: number;

    constructor(players: string[], options?: TurnManagerOptions) {
        this.players = players;
        const firstTurnPlayer = options?.firstTurnPlayer ?? "";
        let firstTurnIndex = players.findIndex(player => player === firstTurnPlayer);
        
        if (firstTurnIndex < 0) firstTurnIndex = this.generateRandomTurn();

        this.currentTurn = firstTurnIndex;
    }

    getPlayers() {
        return this.players;
    }

    getCurrentTurn() {
        return this.currentTurn;
    }

    goNextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    isPlayerTurn(playerId: string) {
        if (!this.players.includes(playerId)) throw new Error(`players does not contain ${playerId}, please initialize turn manager correctly`);
 
        return this.players[this.currentTurn] == playerId;
    }

    private generateRandomTurn() {
        return Math.floor(Math.random() * this.players.length);
    }
}