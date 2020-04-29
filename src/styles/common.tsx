import React, { CSSProperties } from 'react';
import Colors from '../components/Colors.json';

const CommonStyles :{ [name:string] : CSSProperties } = {
    container: {
        marginLeft:'80px',
        padding:'50px 50px 0 50px',
    },
    text: {
        margin: 0,
        padding: 0,
        color:Colors.text.default,
    }
}

export default CommonStyles;