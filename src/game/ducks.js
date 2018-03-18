
const inititalState = {
    players: [],
    revealedCard: {},
    over: false,
    started: false,
    storyDeck: [],
    adventureDeck: []
};


export default function gameReducer(state = inititalState, action) {
    return inititalState;
}