import React, { CSSProperties } from 'react';

import { AiOutlineLoading } from 'react-icons/ai';
import './indicator.scss';
interface IndicatorProps {
    style? : {[name:string] :CSSProperties},
    className? : string,
    iconStyle?:{[name:string]:CSSProperties},
}
const Indicator = (props:IndicatorProps)=>{
    return (
        <span className={ "_github_farm_mern_client_indicator " + props.className } style={props.style}>
            <AiOutlineLoading style={props.iconStyle} />
        </span>
    );
}

export default Indicator;