import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="page-content">
            <div className="jumbotron"></div>
            <div className="recipe-selection">
                <div className="recipe-selection-content d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <h4>Search Recipes</h4>
                    <Link to="/recipes">
                        <img src="assets/images/recipes.png" alt="recipes logo"></img>
                    </Link>
                </div>
            </div>
            <div className="restaurant-selection">
                <div className="restaurant-selection-content d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <Link to="/restaurants">
                        <img src="assets/images/restaurants.jpg" alt="restaurants logo"></img>
                    </Link>
                    <h4>Search Restaurants</h4>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
