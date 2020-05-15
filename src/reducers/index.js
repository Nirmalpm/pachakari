import {combineReducers} from 'redux';
import category from './category';
import item from './item';
import signin from './signin';

const Reducers = combineReducers({
    category,
    item,
    signin
});

export default Reducers;