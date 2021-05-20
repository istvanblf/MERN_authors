import React, { useState, useEffect } from "react";
import { Container, Button, Form } from 'react-bootstrap';

import { navigate } from "@reach/router";
import axios from "axios";

const EditAuthor = (props) => {
    console.log("PROPS:", props.id);

    const [name, setName] = useState("");
    const [errors, setErrors] = useState("");


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors/" + props.id)
            .then((res) => {
                setName(res.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id]);

        const handleEditAuthorSubmit = (event) => {
            event.preventDefault();

        const editedAuthor = {
            name,
        };


        axios
            .put(
            "http://localhost:8000/api/authors/" + props.id,
            editedAuthor
            )
            .then((res) => {
            console.log("EditAuthor response:", res);
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
            <h3 className="text-center">Edit Author</h3>
            <Form onSubmit ={(e) => {
                    handleEditAuthorSubmit(e);
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
                        type="text" value={name}/>
                        <Form.Text className="text-muted" >
                        Must be min 3 characters long
                        </Form.Text>
                    </Form.Group>
                    <Button className="ml-4" variant="warning" size="sm" type="submit">
                        Update
                    </Button>
                    <Button onClick={(event) => {
                        navigate("/");
                        }}
                        className="ml-4" variant="secondary" size="sm">
                        Cancel
                    </Button>
                </Form>
        </div>   
    </Container>
    )
};

export default EditAuthor;
