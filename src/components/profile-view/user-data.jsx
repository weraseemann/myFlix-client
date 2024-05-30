import React from "react";

function UserData({ email, username }) {
    return (
        <>
            <p>User: {username} </p>
            <p>Email: {email} </p>
        </>
    )
}

export default UserData