import React, { useState, useEffect } from 'react';
import { CommonStyles } from '../../styles';
import "./UserListScene.scss";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { getUsersSearchThunk, clearUsersSearchThunk, getUsersInfoThunk } from '../../modules/user/thunks';
import { Link } from 'react-router-dom';
import AttendentList from '../MainScene/AttendentList';
import UserInfoInterface from '../../api/interfaces/UserInfo';

const UserListScene = () => {
    const { searched_users, users } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const avatar_size = 80;

    useEffect(() => {
        dispatch(getUsersInfoThunk());
        return () => {
            dispatch(clearUsersSearchThunk());
        }
    }, []);

    const getUserAvatarUrl = (user:UserInfoInterface) =>{
        if(user.avartar_url && user.avartar_url !== ""){
            return user.avartar_url;
        }
        else{
            return `https://avatars1.githubusercontent.com/u/${user.id}?s=${avatar_size * 2}`;
        }
        
    }

    const ui = {
        user: () => {
            if (users.data && users.data.data) {
                return users.data.data.map(user => {
                    console.log('render', user);
                    return (
                        <div className="user-container">
                            <div className="avatar-wrapper">
                                <img className="avatar" src={ getUserAvatarUrl(user).toString() } alt="사용자 깃허브 프로필 이미지" />
                            </div>
                            <div className="desc">
                                <p className="login">{user.login}</p>
                                <p className="user-name">{user.name}</p>
                                
                            </div>
                            <Link className="detail-btn" to={ `/users/${user.login}` }>보기</Link>
                        </div>
                    );
                });
            }
            else {
                return <></>;
            }
        }
    }

    return (<div className="content-container">
        <div className="header-wrapper">
            <h1 className="header-title">
                함께하는 정원사들
            </h1>
            <div className="header-content">
                <div className="search-wrapper">
                    <input className="search-input" type="text" />
                    <button className="search-btn" type="button">검색</button>
                </div>
            </div>
        </div>

        <div className="content-wrapper">
            { ui.user() }
        </div>
    </div>);
}

export default UserListScene;