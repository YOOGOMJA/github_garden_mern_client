import React from 'react';
import UserInfoInterface from '../../../api/interfaces/UserInfo';
import { getAvatarURL, getUserName } from '../../../lib/github';

import {MdAddCircleOutline, MdRemoveCircleOutline} from 'react-icons/md';

interface UserItemProps{
    data : UserInfoInterface,
    onClick?(user:UserInfoInterface): any,
    type : "ADD" | "DEL",
}

const UserItem = (props:UserItemProps)=>{
    return (
        <div className="user-info" onClick={ ()=>{ if(props.onClick){ props.onClick(props.data) } } }>
            <div className="avatar">
                <div className="icon">{ props.type === "ADD" ? <MdAddCircleOutline/> : <MdRemoveCircleOutline/> }</div>
                <img src={ getAvatarURL(props.data, 80) } alt={ props.data.login + " 프로필 이미지" }/>
            </div>
            <div className="info">  
                <p>{ getUserName(props.data.login, props.data.name) }</p>
            </div>
        </div>
    );    
}

export default UserItem;