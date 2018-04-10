const INVALID_EVENT = 'INVALID_EVENT';
const GAME_UPDATE = 'GAME_STATE_UPDATE';
const PHASE = 'PHASE_CHANGE';
const ERROR = 'ERROR';

/**TODO:
 * animations
 * handle adventure card movement
 * quests, tourneys and events!
 */
const inititalState = {

    players: [{ id: 0, shield: 10 }, { id: 0, shield: 10 }, { id: 0, shield: 10 }, { id: 0, shield: 10 }],
    playerId: -1,
    revealedCard: {},
    over: false,
    started: false,
    storyDeck: [],
    adventureDeck: [],
    currentPhase: 'StartTurn',
    currentTurn: -1,
    currentPlayer: 0,
    currentQuest: {}
};

export default function gameReducer(state = inititalState, action) {
    
    switch (action.type) {
        case PHASE:
            return Object.assign({}, state, {
                phase: action.phase
            })

        case GAME_UPDATE:
            const data = JSON.parse(action.data)   
            return Object.assign({}, state, {
                players: data.players,
                revealedCard: data.revealedCard,
                over: data.over,
                started: data.started,
                storyDeck: data.storyDeck,
                adventureDeck: data.adventureDeck,
                currentPhase: data.currentPhase,
                currentTurn: data.currentTurn,
                currentPlayer: data.currentPlayer,
                currentQuest: data.currentQuest
            })

        case ERROR: 
        return Object.assign({}, state, {
            //popup declaring an error
        }) 

        case INVALID_EVENT:
        return Object.assign({}, state, {
                //popup declaring an invalid event
            }) 
    }

    return state;
}