import React from 'react';
import '../../stylesheets/button.css'
const Button = props => {
    return(
        <div id="main-button" onClick={props.onClick}>Create {props.treeType} Tree</div>
    )
}

export default Button;