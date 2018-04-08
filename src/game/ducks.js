
const PLAYER_UPDATE = 'UPDATE_PLAYER';
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const SET_REVEALED = 'SET_REVEALED_CARD';
const PLAYER_JOINED = 'PLAYER_JOINED_GAME';
const STORY_CARD_MOVED = 'CARD_MOVED';
const STORY_DECK_UPDATED = 'STORY_DECK_UPDATED';
const END_TURN = 'END_TURN';
const CHANGE_PHASE = 'CHANGE_PHASE';
const CHANGE_PLAYER = 'CHANGE_PLAYER';
const INVALID_EVENT = 'INVALID_EVENT';
const JOIN_SUCCESS = 'JOIN_SUCCESS';
const GAME_UPDATE = 'GAME_STATE_UPDATE';
const PHASE_CHANGE = 'PHASE_CHANGE';
const REVEAL_STORY = 'REVEAL_STORY';
const ERROR = 'ERROR';

/**TODO:
 * animations
 * handle adventure card movement
 * quests, tourneys and events!
 */
const inititalState = {
    players: [{id: 0, shield: 10}],
    revealedCard: {},
    over: false,
    started: false,
    storyDeck: [],
    adventureDeck: [],
    currentPhase: 'StartTurn',
    currentTurn: -1,
    currentPlayer: 0,

};




export default function gameReducer(state = inititalState, action) {
    
    switch (action.type) {
        case PLAYER_UPDATE:
            return Object.assign({}, state, {
                players: action.player
            });
        
        case START_GAME:
            return Object.assign({}, state, {
                started: true
            });
        
        case END_GAME:
            return Object.assign({}, state, {
                over: true
            });
        
        case SET_REVEALED:
            return Object.assign({}, state, {
                revealedCard: action.revealedCard
            }); 
        
        case PLAYER_JOINED:
            if (state.players.length > 3) return state;
            return Object.assign({}, state, {
                players: state.players.concat(state.player)
            });
        
        case STORY_DECK_UPDATED:
            return Object.assign({}, state, {
                storyDeck: action.storyDeck
            });
        
        case CHANGE_PHASE:
            return Object.assign({}, state, {
                phase: action.phase
            }); 
        
        case END_TURN:
            return Object.assign({}, state, {
                currentPlayer: action.currentPlayer,
                currentTurn: action.currentPlayer,
                phase: 'StartTurn'
            }) 
        
        case CHANGE_PLAYER:
            return Object.assign({}, state, {
                currentPlayer: action.currentPlayer
            })   
        case INVALID_EVENT:
            return Object.assign({}, state, {
                
            }) 
        case JOIN_SUCCESS:
            
        case GAME_UPDATE:
        
        case PHASE_CHANGE:
        
        case REVEAL_STORY:
        
        case ERROR: 
            
    }

    return state;
}