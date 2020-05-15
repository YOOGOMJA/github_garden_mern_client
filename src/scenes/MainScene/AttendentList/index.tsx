import React, { CSSProperties } from 'react';
import { Card } from '../../../components';
import { UsersInfo } from '../../../api/user';
import UserInfoInterface from '../../../api/interfaces/UserInfo';
import { Link } from 'react-router-dom';

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
            <div style={styles.wrapper}>
                {
                    (() => {
                        if (props.users && props.users.data) {
                            return props.users.data.map(user => {
                                return (<div key={ user.id.toString() } style={styles.itemContainer}>
                                    <div style={styles.avatarWrapper}>
                                        {/* 아이콘 */}
                                        <img style={ styles.avatar } src={ getUserAvatarUrl(user).toString() } alt={ user.login + " github avatar image" }/>
                                    </div>
                                    <div style={styles.descWrapper}>
                                        {/* 설명부 */}
                                        <p style={styles.username}>{user.name}</p>
                                        <p style={styles.displayName}>{user.login}</p>
                                    </div>
                                    <div style={styles.linkWrapper}>
                                        {/* <a style={styles.link} target="_blank" rel="noopener noreferrer" href={user.html_url.toString()}>보기</a> */}
                                        <Link style={ styles.link } to={ `/users/${user.login}` }>보기</Link>
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

const styles: { [name: string]: CSSProperties } = {
    wrapper: {
        height: '440px',
        overflowY: 'auto',
        marginBottom: '20px',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '15px',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        paddingBottom: '15px',
    },
    avatarWrapper: {
        // flex: 1,
        display:"flex",
        width:`${avatar_size}px`,
        height:`${avatar_size}px`,
        justifyContent:'center',
        alignContent:'center',
        overflow:'hidden',
        borderRadius:'50%',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
    },
    avatar:{
        width:`${avatar_size}px`,
        height:`${avatar_size}px`,
    },
    username: {
        fontSize: '1.3em',
        margin: 0,
        padding: 0,
        color: "#fff",
    },
    displayName: {
        fontSize: '.8em',
        margin: 0,
        padding: 0,
        color: "#fff",
    },
    descWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10px',
        flex: 3,
    },
    linkWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    link: {
        textDecoration: 'none',
        fontSize: '.9em',
        color: 'white',
        padding: '5px 15px',
        backgroundColor: '#27ae60',
        height: 'fit-content',
        borderRadius: '5px',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
    }
}

export default index;