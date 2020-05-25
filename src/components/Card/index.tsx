import React, {  FunctionComponent } from 'react';
import './Card.scss';

type CardProps = {
    title: string,
    desc?:string,
}

const index: FunctionComponent<CardProps> = props => {
    return (
        <div className='_card-container'>
            <p className="title">
                {props.title}
            </p>
            <p className="desc">{props.desc}</p>
            <div className="wrapper">
                {props.children}
            </div>
        </div>
    );
}


export default index;