
const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RESTAURANT_RESULTS':
            return {
                ...state,
                restaurantResults: action.results,
            };
        case 'SET_RECIPE_RESULTS':
            return {
                ...state,
                recipeResults: action.results,
            };
        default:
            return state;
    }
};
export default searchReducer;
