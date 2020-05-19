import React from 'react';
import * as libGithub from '../../../lib/github';
import UserInfoInterface from '../../../api/interfaces/UserInfo';

import { IoIosLink, IoIosMail } from 'react-icons/io';

import Footer from './Footer';

interface UserDetailHeaderProps {
    user : UserInfoInterface | undefined | null
}
const UserDetailHeader = (props: UserDetailHeaderProps)=>{
    const ui = {
        user_name : (user: UserInfoInterface | undefined | null)=>{
            if(user){
                if(user.name){
                    return (<div className="user-name">
                        <p className="title">
                            <a className="title" target="_blank" href={ `https://github.com/${user.login}` } rel="noopener noreferrer">{ user.name }</a>
                        </p>
                        <p className="subtitle">@{ user.login }</p>
                    </div>);
                }
                else{
                    return (
                        <div className="user-name">
                            <p className="title">
                                <a className="title" target="_blank" href={ `https://github.com/${user.login}` } rel="noopener noreferrer">{ user.login }</a>
                            </p>
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
                    { bio.split('\n').map( (text, idx)=>{
                        return (<span key={ idx }>{ text }<br/></span>)
                    }) }
                </div>)
            }
            else { return <></>; }
        },
        link: (data:string | String | undefined)=>{
            if(data){
                const _real_url = libGithub.getURL(data.toString(), libGithub.config.url.LINK);
                return <div className="link-wrapper">
                    <p className="icon">
                        <IoIosLink/>
                    </p>
                    <a className="link" href={ _real_url } target="_blank" rel="noopener noreferrer">{ data }</a>
                </div>
            }
            else{ return <></>; }
        },
        mail: (data:string| String|undefined)=>{
            if(data){
                const _real_url = libGithub.getURL(data.toString(), libGithub.config.url.EMAIL);
                return <div className="link-wrapper">
                    <p className="icon"><IoIosMail/></p>
                    <a className="link" href={ _real_url } target="_blank" rel="noopener noreferrer">{ data }</a>
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
            <Footer/>
        </div>
    );
}

export default UserDetailHeader;