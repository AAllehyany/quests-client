const INVALID_EVENT = 'INVALID_EVENT';
const GAME_UPDATE = 'GAME_STATE_UPDATE';
const CHEAT_UPDATE = 'CHEAT_UPDATE';
const PHASE = 'PHASE_CHANGE';
const ERROR = 'ERROR';
const ADD_ID = 'RECEIVE_ID'

/**TODO:
 * animations
 * handle adventure card movement
 * quests, tourneys and events!
 */
const inititalState = {

    players: [],
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
                currentPhase: data.phase,
                currentTurn: data.currentTurn,
                currentPlayer: data.currentPlayer,
                currentQuest: data.currentQuest
            })

        case CHEAT_UPDATE:
            console.log("WHAT A CHEATER\nPLEASE BAN HACKERS");
            break;

        case ERROR: 
            return Object.assign({}, state, {
                //popup declaring an error
        }) 

        case INVALID_EVENT:
            return Object.assign({}, state, {
                //popup declaring an invalid event
            }) 
        
        case ADD_ID:
            console.log(JSON.parse(action.data))
            return Object.assign({}, state, {
                playerId: JSON.parse(action.data)
            }) 
    }

    return state;
}