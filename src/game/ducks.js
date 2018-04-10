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
    players: [{ id: 0, shield: 10 }],
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
        case "PHASE_CHANGE":
            return Object.assign({}, state, {
                phase: action.phase
            })

        case GAME_UPDATE:
            return Object.assgn({}, state, {
                players: action.data.players,
                revealedCard: action.data.revealedCard,
                over: action.data.over,
                started: action.data.started,
                storyDeck: action.data.storyDeck,
                adventureDeck: action.data.adventureDeck,
                currentPhase: action.data.currentPhase,
                currentTurn: action.data.currentTurn,
                currentPlayer: action.data.currentPlayer,
                currentQuest: action.data.currentQuest
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