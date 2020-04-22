import React, { CSSProperties, FunctionComponent } from 'react';

import Colors from '../Colors.json';

type CardProps = {
    title: string,
    desc?:string,
}

const index: FunctionComponent<CardProps> = props => {
    return (
        <div style={styles.container}>
            <p style={ styles.title  }>
                {props.title}
            </p>
            <p style={ styles.desc }>{props.desc}</p>
            <div style={ styles.wrapper }>
                {props.children}
            </div>
        </div>
    );
}

const styles: { [name: string]: CSSProperties } = {
    title:{
        margin:0,
        padding:0,
        color:Colors.card.title,
        fontSize:'1.5em',
        paddingTop:'15px',
    },
    container: {
        // width:'fit-content'
        // backgroundColor:'#fff',
        backgroundColor:Colors.card.background,
        // minHeight:'50px',
        boxShadow:"2px 2px 3px 0px" + Colors.shadow,
        padding: '0px 20px',
        marginRight: '30px',
        borderRadius:'10px',
        height:'100%'
    },
    wrapper: {
        // borderTop:'1px solid #4c5365',
        // marginTop:'10px',
        paddingTop:'10px',
        // paddingBottom:'15px',
        // backgroundColor:'red',
        // height:'300px',
    },
    desc: {
        margin:0,
        padding:0,
        color:Colors.text.sub,
        fontSize:'.8em',
        marginTop:'.3em',
        marginBottom:"1em"
    }
}

export default index;