import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{user.Username}</Card.Title>
                <Card.Text>{user.Email}</Card.Text>
                <Link to={`/users/${encodeURIComponent(user.id)}`}>
                </Link>
            </Card.Body>
        </Card>
    );
};

ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Email: PropTypes.string

    }).isRequired
};