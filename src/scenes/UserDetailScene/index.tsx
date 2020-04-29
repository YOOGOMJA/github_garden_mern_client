import React, { useEffect, useState } from 'react'
import { CommonStyles } from '../../styles';
import { useParams, useHistory } from 'react-router';

const UserDetailScene = (props :any)=>{
    
    const { user_name } = useParams();
    const history = useHistory();

    useEffect(() => {
        if(user_name === "yoogomja"){
            console.log("matched");
        }
        else{
            console.log(history);
            history.push('./404-not-found');
        }
    }, []);

    return (<div style={ CommonStyles.container }>
        <p style={ CommonStyles.text }>
            detail
        </p>
    </div>);
}

export default UserDetailScene;