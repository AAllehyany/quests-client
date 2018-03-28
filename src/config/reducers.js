import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import Game from '../game';

const game = Game.reducer;


export default combineReducers({
    routing: routerReducer,
    game
});