import React from 'react';
import { Card } from '../../../components';
import { UsersInfo } from '../../../api/user';
import UserInfoInterface from '../../../api/interfaces/UserInfo';
import { Link } from 'react-router-dom';

import './AttendentList.scss';

interface AttendentListProps {
    users: UsersInfo | null,
}
const avatar_size = 60;
const index = (props: AttendentListProps) => {
    
    const getUserAvatarUrl = (user:UserInfoInterface) =>{
        if(user.avartar_url && user.avartar_url !== ""){
            return user.avartar_url;
        }
        else{
            return `https://avatars1.githubusercontent.com/u/${user.id}?s=${avatar_size * 2}`;
        }
    }
    return (
        <Card title="참여중인 정원사들" desc="현재 정원사 프로젝트에 참여중인 정원사분들입니다">
            {/* 전체 감싸기 */}
            <div className="attendent-list-container">
                {
                    (() => {
                        if (props.users && props.users.data) {
                            return props.users.data.map(user => {
                                return (<div key={ user.id.toString() } className="attendent">
                                    <div className="attendent-avatar">
                                        {/* 아이콘 */}
                                        <img src={ getUserAvatarUrl(user).toString() } alt={ user.login + " github avatar image" }/>
                                    </div>
                                    <div className="attendent-desc">
                                        {/* 설명부 */}
                                        <p className="text user-name">{user.name}</p>
                                        <p className="text display-name">{user.login}</p>
                                    </div>
                                    <div className="attendent-link">
                                        <Link to={ `/users/${user.login}` }>보기</Link>
                                    </div>
                                </div>)
                            });
                        } else {
                            return <div>
                                <p>등록된 사용자가 없습니다</p>
                            </div>;
                        }

                    })()
                }
            </div>
        </Card>
    );
}



export default index;