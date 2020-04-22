import React, { CSSProperties } from 'react';
import img from './header-images-2.svg';

interface HeaderImgProps{
    className? : string,
    style? : any,
}

const index = (props:HeaderImgProps) =>{
    return (
        <img src={img} className={ props.className || "" } style={ props.style || {} } />
    );
}

export default index;