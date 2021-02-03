import React, {useContext, useEffect} from 'react';
import {UserListContext} from "./UserListContext";
import {UserContext} from "./UserContext";

export const UserList = (props) => {
    const user = useContext(UserContext);
    let [userList, setUserList] = useContext(UserListContext);

    const handleMenuChange = () => {
        props.parentGetUserCallback(document.getElementById("userListMenu").value)
    };

    useEffect(() => {
        setUserList(userList);
    }, [userList]);

    return (
        <div>
            <select className="select" onChange={() => handleMenuChange()} id="userListMenu">
                {userList.map(element => {
                    if (element === user.state.username.split("@")[0]) {
                        return (
                            <option selected="selected" value={element}> {element} </option>
                        )
                    } else {
                        return (
                            <option value={element}> {element} </option>
                        )
                    }
                })}>
            </select>
        </div>
    )
};
