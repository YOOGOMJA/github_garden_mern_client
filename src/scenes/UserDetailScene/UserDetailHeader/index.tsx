import React from 'react';
import * as libGithub from '../../../lib/github';
import UserInfoInterface from '../../../api/interfaces/UserInfo';

import { IoIosLink, IoIosMail } from 'react-icons/io';

interface UserDetailHeaderProps {
    user : UserInfoInterface | undefined | null
}
const UserDetailHeader = (props: UserDetailHeaderProps)=>{
    console.log(props.user?.email);

    const ui = {
        user_name : (user: UserInfoInterface | undefined | null)=>{
            if(user){
                if(user.name){
                    return (<div className="user-name">
                        <p className="title">
                            <a className="title" target="_blank" href={ `https://github.com/${user.login}` }>{ user.name }</a>
                        </p>
                        <p className="subtitle">@{ user.login }</p>
                    </div>);
                }
                else{
                    return (
                        <div className="user-name">
                            <a className="title" target="_blank" href={ `https://github.com/${user.login}` }>{ user.login }</a>
                        </div>
                    );
                }
            }
            else{
                return <></>;
            }
        },
        bio: (bio:string|String| undefined)=>{
            if(bio){ 
                return (<div className="bio">
                    { bio.split('\n').map( text=>{
                        return (<span>{ text }<br/></span>)
                    }) }
                </div>)
            }
            else { return <></>; }
        },
        link: (data:string | String | undefined)=>{
            if(data){
                return <div className="link-wrapper">
                    <p className="icon">
                        <IoIosLink/>
                    </p>
                    <a className="link" href={props.user?.blog + ""} target="_blank">{props.user?.blog}</a>
                </div>
            }
            else{ return <></>; }
        },
        mail: (data:string| String|undefined)=>{
            if(data){
                return <div className="link-wrapper">
                    <p className="icon"><IoIosMail/></p>
                    <a className="link" href={"mailto://" + props.user?.blog + ""} target="_blank">{props.user?.blog}</a>
                </div>
            }
            else{ return <></>; }
        }
    }
    return (
        <div className="header-container">
            <div className="header-content">
                <div className="avatar-container">
                    <img className="avatar" src={ libGithub.getAvatarURL(props.user, 200) }  alt=""/>
                </div>
                <div className="header-desc">
                    { ui.user_name(props.user) }
                    { ui.bio(props.user?.bio) }
                    {/* 홈페이지 정보 */}
                    { ui.link(props.user?.blog) }
                    {/* 이메일 정보 */}
                    { ui.mail(props.user?.email) }
                </div>
            </div>
        </div>
    );
}

export default UserDetailHeader;