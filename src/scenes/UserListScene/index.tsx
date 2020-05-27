/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import "./UserListScene.scss";

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { clearUsersSearchThunk, getUsersInfoThunk, getUsersSearchThunk, clearUsersInfoThunk } from '../../modules/user/thunks';
import { Link } from 'react-router-dom';
import UserInfoInterface from '../../api/interfaces/UserInfo';

import AnimatedTextInput from '../../components/AnimatedTextInput';

const UserListScene = () => {
    const { users, searched_users } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const avatar_size = 80;

    const [ keyword, setKeyword ] = useState("");
    const [ isSearchMode , setIsSearchMode ] = useState(false);

    useEffect(() => {
        console.log('init');
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
        user: (_users?:[UserInfoInterface]) => {
            if(_users === null || _users === undefined){ console.log('empty'); return <></>; }
            else{
                return _users.map((user:UserInfoInterface) => {
                    return (
                        <div key={ user.id.toString() } className="user-container">
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
        }
    }

    const fn = {
        search : {
            excute : function(){
                if(keyword.trim().length > 0){
                    setIsSearchMode(true);
                    dispatch( getUsersSearchThunk(keyword) );
                    dispatch( clearUsersInfoThunk() );
                }
                else{
                    window.alert('검색어를 입력해주세요');
                }
            },
            cancel : function(){
                setIsSearchMode(false);
                setKeyword("");
                dispatch( getUsersInfoThunk() );
                dispatch( clearUsersSearchThunk() );
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
                    <AnimatedTextInput 
                        title="github 계정명"
                        value={ keyword } 
                        style={ { flex : 9 } }
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>)=>setKeyword(e.target.value) }
                        isDisabled={ isSearchMode }
                        />
                    {
                        !isSearchMode 
                        ? <button className="search-btn" type="button" onClick={fn.search.excute}>검색</button> 
                        : <button className="search-btn cancel" type='button' onClick={fn.search.cancel} >취소</button>
                    }
                </div>
            </div>
        </div>

        <div className="content-wrapper">
            { 
                !isSearchMode ? 
                ui.user(users.data?.data) :
                ui.user(searched_users.data?.data)
            }
        </div>
    </div>);
}

export default UserListScene;