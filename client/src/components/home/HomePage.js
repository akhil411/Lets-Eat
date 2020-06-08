import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
    return (
        <div className="page-content">
            <div className="jumbotron"></div>
            <div className="recipe-selection">
                <div className="recipe-selection-content d-flex flex-row justify-content-center align-items-center flex-wrap">
                    <Carousel pause={false}>
                        <Carousel.Item>
                            <h3>Popular Recipe Categories</h3>
                            <Link to="/recipes"><button className="login-button modal-call-button"><span>Search Recipe </span></button></Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3>Our Newest Recipes</h3>
                            <Link to="/recipes"><button className="login-button modal-call-button"><span>Search Recipe </span></button></Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3>Recipes by Ingredient</h3>
                            <Link to="/recipes"><button className="login-button modal-call-button"><span>Search Recipe </span></button></Link>
                        </Carousel.Item>
                    </Carousel>
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
                    <Carousel pause={false} className="restaurant-carousel">
                        <Carousel.Item>
                            <h3>Best Restaurants Nearby</h3>
                            <Link to="/restaurants"><button className="login-button modal-call-button"><span>Search Restaurants </span></button></Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3>Explore dining options</h3>
                            <Link to="/restaurants"><button className="login-button modal-call-button"><span>Search Restaurants </span></button></Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3>Budget and Variety of Cuisines</h3>
                            <Link to="/restaurants"><button className="login-button modal-call-button"><span>Search Restaurants </span></button></Link>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
