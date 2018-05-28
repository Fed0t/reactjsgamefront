import React from "react";
import {Link} from "react-router";
import  {Message} from 'semantic-ui-react';

import MenuComponent from './MenuComponent';

export const Header = (props) => {
    return (
        <div>
            <MenuComponent/>
        </div>
    )
}