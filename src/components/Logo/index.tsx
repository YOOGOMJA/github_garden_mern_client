import React from 'react';
import logo from './logo.svg';

interface LogoProps {
    width?: Number,
    height?: Number,
}

const index = (props: LogoProps) => {
    return (
        <img alt="logo" src={logo} style={{ width: props.width + "px", height: props.height + "px" }} />
    );
}

export default index;