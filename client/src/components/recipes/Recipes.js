import React, { useState } from 'react';
import { Button, Form, Spinner, Accordion, Card } from 'react-bootstrap';
import axios from "axios";

export default function Recipes() {
    const [searchitem, setsearchitem] = useState("");
    const [loading, setloading] = useState(false);
    const [searchresults, setsearchresults] = useState("");
    const [errors, setErrors] = useState({});

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
        if (!formIsValid()) return;
        setloading(!loading);
        var recipeUrl = "https://api.edamam.com/search?q=" + searchitem + "&app_id=cc84332e&app_key=7305bef5a7c92a751b9bfdf0b0ef0c63&from=0&to=15";
        setsearchitem("");
        axios
            .get(recipeUrl)
            .then((response) => {
                setloading(false);
                if (response.data.hits.length !== 0) {
                    setsearchresults(response.data.hits);
                    console.log(response.data.hits);
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
                <h3>Search for your favourite Recipe</h3>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
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
                <Accordion >
                    {(searchresults) ? (
                        searchresults.map((result, i) => (
                            <Card >
                                <Card.Header>
                                    <Accordion.Toggle className="card-header-click" as={Card.Header} variant="link" eventKey={i}>
                                    <img src={result.recipe.image} className="recipe-results-image" alt="recipe"></img>
                        </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i} className="accordion-collapse">
                                    <Card.Body>
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
