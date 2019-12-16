import React, {useContext} from 'react';
import Categories from '../Categories'
import {NavigationBar} from "./NavigationBar";
import {UpdatingFields} from '../UpdatingFields';
import {DeleteUser} from "./DeleteUser";

export const Content = () => {

    return (
            <>
               <NavigationBar/>
               <Categories/>
               <UpdatingFields />
               <DeleteUser />
           </>

    )

};
