import React, { CSSProperties, FunctionComponent } from 'react';
import Title from './Title';

type CardProps = {
    title: string,
}

const index: FunctionComponent<CardProps> = props => {
    return (
        <div style={styles.container}>
            <Title text={props.title} />
            <div style={ styles.wrapper }>
                {props.children}
            </div>
        </div>
    );
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        backgroundColor:'#fff',
        minHeight:'200px',
        boxShadow:"rgba(0, 0, 0, .2) 2px 2px 3px 0px",
        padding: '10px 10px',
        marginRight: '10px',
    },
    wrapper: {
        marginTop:'10px',
        backgroundColor:'red',
        height:'300px',
    }
}

export default index;