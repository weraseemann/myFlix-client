import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, moviesSearch,
    setMoviesSearch }) => {
    return (
        <Navbar
            expand="lg" className="bg-body-tertiary"
        >
            <Container>
                <Navbar.Brand as={Link} to="/">Nightflix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        {!user && (
                            <>

                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                            </>)}
                        {user && (
                            <>
                                <Nav>
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/profile">My profile</Nav.Link>
                                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <FormControl
                                        id="search-bar"
                                        className="me-3"
                                        type="search"
                                        value={moviesSearch}
                                        placement="start"
                                        placeholder="Search for a movie"
                                        aria-label="Search"
                                        onChange={(e) => setMoviesSearch(e.target.value)}
                                        style={{ backgroundColor: '#f8f9fa' }} // Light background color
                                    />

                                </Form>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavigationBar;