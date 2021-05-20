import React, {useState, useEffect} from "react";
import { Container, Button, Table } from 'react-bootstrap';
import axios from "axios";
import { navigate } from "@reach/router";


const Authors = (props) => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/authors")
        .then((res) => {
            console.log("From API:", res);
            setAuthors(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const deleteAuthor = (authorToDelete) => {
        console.log(`${authorToDelete._id} to be deleted`);
        axios
            .delete(`http://localhost:8000/api/authors/${authorToDelete._id}`)
            .then((res) => {
                const filteredAuthors = authors.filter((auth) => {
                    return auth !== authorToDelete;
                });
                setAuthors(filteredAuthors);
            })
            .catch((err) => {
            console.log(err);
            });
        };

    return (
        <Container>
            <Button 
                onClick={(event) => {
                    navigate("/new");
                    }}
                    className="mt-2 mb-2" 
                    variant="primary" 
                    size="sm">New Author
            </Button>
            <h6>We have quotes by:</h6>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Available Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => {
                        return (
                        <tr key={author._id}>
                            <td>{author.name}</td>
                            <td>
                            <Button onClick={(event) => {
                                navigate(`/edit/${author._id}`);
                                }}
                            className="ml-4" variant="warning" size="sm">Edit</Button>{'    '}
                            <Button onClick={(e) => {
                                console.log("Event inside delete button", author)
                                deleteAuthor(author)
                                }}
                            className="ml-4" variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
        
};

export default Authors;
