import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';


function decks(state = {}, action) {
    console.log('In reducer: state', state)
    console.log('In reducer action', action)

    switch (action.type) {
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            return{
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    questions: state[action.deck.title].questions.concat(action.card)
                }
            }
        default:
            return state
    }
}

export default decks;