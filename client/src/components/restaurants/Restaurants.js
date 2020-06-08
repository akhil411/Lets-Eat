import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Accordion, Card } from 'react-bootstrap';
import axios from "axios";

export default function Recipes() {
    const [searchitem, setsearchitem] = useState("");
    const [loading, setloading] = useState(false);
    const [searchresults, setsearchresults] = useState("");
    const [errors, setErrors] = useState({});
    let restaurantQueryURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="' + searchitem + '"';

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            restaurantQueryURL += `&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
          });
    }, [handleSave]);

    function handleChange(event) {
        setsearchitem(event.target.value);
        setErrors("");
    }

    function formIsValid() {
        const errors = {};
        if (!searchitem) errors.name = "*Field is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        console.log(restaurantQueryURL)
        if (!formIsValid()) return;
        setloading(!loading);
        setsearchitem("");
        axios
            .get(restaurantQueryURL, { headers: { Authorization: 'Bearer QvfBaBpUXhWcP0fZX8iVke7H7mrncjHs0QNdG9IhTIZdkVtpUt4zwFXNgyK3O0JUiXq-aaXAvW-rWslz04lXssOsIeqoCQKyfTGPNgM5Qqk1aYGQD2PdUzq1zoV3XXYx' } })
            .then((response) => {
                setloading(false);
                if (response.data.businesses.length !== 0) {
                    console.log(response.data.businesses)
                    setsearchresults(response.data.businesses);
                } else {
                    const errors = {};
                    errors.results = "No results found! Check your search item";
                    setErrors(errors);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="page-content">
            <div className="recipe-page-container">
                <h3>Find a Restaurant Nearby</h3>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Restaurant Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="eg: Pizza, Italian, Burger..."
                            value={searchitem}
                            onChange={handleChange}
                        />
                        {errors.name ? <div className="form-error">{errors.name}</div> : null}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Search
                </Button>
                </Form>
                <div className="loader errors">
                    {(loading === true ? (<Spinner className="search-loader" animation="grow" />) : (null))}
                    {errors.results ? <div className="form-error">{errors.results}</div> : null}
                </div>
                <Accordion className="accordion-recipe accordion-restaurants">
                    {(searchresults) ? (
                        searchresults.map((result, i) => (
                            <Card key={i}>
                                <Card.Header>
                                    <Accordion.Toggle className="card-header-click" as={Card.Header} variant="link" eventKey={i}>
                                        <div className="accordion-header-contents d-flex flex-row flex-wrap justify-content-space-around p-4 mx-2 my-2 my-lg-1 text-center">
                                            <img src={result.image_url} className="recipe-results-image" alt="recipe"></img>
                                            <div className="accordion-text px-4">
                                                <h3>{result.name}</h3>
                                                <p>{result.location.city}</p>
                                                <p><strong>Rating: </strong>{result.rating}</p>
                                                <button className="recipe-button">More Details</button>
                                            </div>
                                        </div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i} className="accordion-collapse">
                                    <Card.Body>
                                    <p><strong>Category: </strong>{result.categories[0].title}</p>
                                    <p><strong>Location: </strong>{result.location.address1}, {result.location.city}</p>
                                    <p><strong>Contact: </strong>{result.phone}</p>
                                    <button className="recipe-button"><a href={result.url} target="_blank">Website</a></button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))
                    ) : null}
                </Accordion>
            </div>
        </div>
    )
}

