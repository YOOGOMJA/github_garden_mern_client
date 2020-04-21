import React, { CSSProperties } from 'react';

interface CardTitleProps {
    text: string,
}

const Title = (props:CardTitleProps) => {
    return (
        <p style={ styles.title  }>
            {props.text}
        </p>
    );
}

const styles:{ [name:string]:CSSProperties } = {
    title: {
        fontSize:'1.5em',
        margin:0,
        padding:0,
        fontWeight:'initial',
        color:'#27ae60',
    }
}

export default Title;