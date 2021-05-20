import {Router} from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar} from "react-bootstrap";
import './App.css';
import Authors from "./views/Authors"
import NewAuthor from "./views/NewAuthor"
import EditAuthor from "./views/EditAuthor"

function App() {
  return (
      <Container>
        <Navbar className="justify-content-center" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand >Favorite Authors</Navbar.Brand>
        </Navbar>  
  
        <Router>
            <Authors path="/" />
            <NewAuthor path="/new" />
            <EditAuthor path="/edit/:id" />
            {/* <Product path="/:id" />
            <UpdateProduct path="/update/:id" /> */}
        </Router> 
    </Container>
  );
}

export default App;
