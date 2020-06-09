export const getNews = () => ({
    type: 'GET_NEWS',
});

export const loginUser = (userData) => ({
    type: 'LOGIN_USER',
    userData
});

export const logOutUser = () => ({
    type: 'LOGOUT_USER',
});

export const setCurrentUser = (json) => ({
    type: 'SET_CURRENT_USER',
    json
});

export const setRestaurantResults = (results) => ({
    type: 'SET_RESTAURANT_RESULTS',
    results
});

export const setRecipeResults = (results) => ({
    type: 'SET_RECIPE_RESULTS',
    results
});