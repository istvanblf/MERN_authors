import React, { useState } from "react";
import { Container, Button, Form } from 'react-bootstrap';

import { navigate } from "@reach/router";
import axios from "axios";

const NewAuthor = (props) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState("");


    const handleNewAuthorSubmit = (event) => {
        event.preventDefault();

    const newAuthor = {
        name: name,
    };

    axios
        .post("http://localhost:8000/api/authors/", newAuthor)
        .then((res) => {
            console.log("new Author response:", res);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.response?.data?.errors?.name?.message)
            // console.log("Error msg at submission:" + err.response.data?.errors?.message);
            setErrors(err.response?.data?.errors?.name?.message);
            console.log(err.response);
        });
    };

return (
    <Container>
        <div className="w-100 p-4 rounded mx-auto shadow">
            <h3 className="text-center">New Author</h3>
            <Form onSubmit ={(e) => {
                    handleNewAuthorSubmit(e);
                }}> 
                    <Form.Group controlId="formBasicLabel">
                        <Form.Label>Name</Form.Label>
                        {errors && (
                        <span className="text-danger">
                        {" "}
                        - {errors}
                        </span>
                        
                    )}
                        <Form.Control onChange={(e)=> {
                            setName(e.target.value)
                        }}
                        type="text" placeholder="Author's name" value={name}/>
                        <Form.Text className="text-muted" >
                        Must be min 3 characters long
                        </Form.Text>
                    </Form.Group>
                    <Button className="ml-4" variant="warning" size="sm" type="submit">
                        Submit
                    </Button>
                    <Button onClick={(event) => {
                        navigate("/");
                        }}
                        className="ml-4" variant="warning" size="sm">
                        Cancel
                    </Button>
                </Form>
        </div>   
    </Container>
    )
};

export default NewAuthor;
