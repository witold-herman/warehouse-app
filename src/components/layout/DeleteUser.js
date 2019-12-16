import React from 'react';
import admin from 'firebase-admin';

export const DeleteUser = () => {

    const getUserData = () => {
        admin.auth().getUserByEmail('warehouse@test.com')
            .then(function(userRecord) {
                console.log('User data: ', userRecord.toJSON());
            })
            .catch(error => {
                console.log('Failed. ', error)
            })
    };

    return(
        <span>
            Fetch user data
        </span>
    )
};
