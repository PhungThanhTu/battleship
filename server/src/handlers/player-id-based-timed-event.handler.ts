import { EventSubscription } from "../shared/events/event";
import { setTimeout } from "timers";

export class PlayerIdBasedTimedEventHandler {
    private playerIdToTimerMap: Map<string, Map<string, number>>;

    constructor () {
        this.playerIdToTimerMap = new Map();
    }

    registerEventTimer(playerId: string, subscription: EventSubscription, delayInMiliseconds: number) {
        const { event, handle } = subscription;
        console.log('registered event for player ', playerId, ' event ', subscription.event);
        const timerId = setTimeout((data) => { 
            handle(data);
        }, delayInMiliseconds);
        if (this.getTimer(playerId, event)) {
            this.cancelTimer(playerId, event);
        }
        
        if (!this.playerIdToTimerMap.get(playerId)) this.playerIdToTimerMap.set(playerId, new Map());
        this.playerIdToTimerMap.get(playerId)?.set(event, timerId);
        console.log(timerId); 
    }

    getTimer(playerId: string, event: string) {
        return this.playerIdToTimerMap.get(playerId)?.get(event);
    }

    async cancelTimer(playerId: string, event: string) {
        console.log('canceled event for player ', playerId, ' event ', event);

        const timer = this.getTimer(playerId, event);
        console.log(timer);
        if (timer)
        {
            clearTimeout(timer);
            this.playerIdToTimerMap.get(playerId)?.delete(event);
        }
    }
} 