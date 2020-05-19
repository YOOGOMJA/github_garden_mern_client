import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ChallengeInterface from '../../../api/interfaces/Challenge';
import './UserList.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { getUsersInfoThunk } from '../../../modules/user';
import { getAllChallengesThunk } from '../../../modules/challenges';
import { postUserToChallenge, deleteUserFromChallenge } from '../../../api/challenge';

import UserItem from './UserItem';
import UserInfoInterface from '../../../api/interfaces/UserInfo';

interface UserListProps {
    challenge: ChallengeInterface | undefined,
}



const UserList = (props: UserListProps) => {
    const [isRequested, setIsRequested] = useState(false);
    const { users } = useSelector((state: RootState) => state.user);
    const intialNotParticipatedUsers: Array<UserInfoInterface> = [];
    const [notParticipatedUsers, setNotParticipatedUsers] = useState(intialNotParticipatedUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersInfoThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (props.challenge && users.data && users.data.status === "success") {
            // 데이터가 있는 경우에만 
            let _notParticipated: Array<UserInfoInterface> = [];
            users.data.data.forEach(item => {
                let found = false;
                if (props.challenge?.participants.find(participant => participant.login === item.login)) {
                    // 찾았을 때 (!== undefined) 발견 처리 함
                    found = true;
                }
                if (!found) { _notParticipated.push(item); }
            });
            setNotParticipatedUsers(_notParticipated);
        }
    }, [users.data, props.challenge]);

    const fn = {
        isExpired : (finish_dt: string | Date)=>{
            const _mFinishDt = moment(finish_dt);
            const _mNow = moment();
            if(_mNow.diff(_mFinishDt) > 0){
                return true;
            }
            else{
                return false;
            }
        },
        add : async (user: UserInfoInterface)=>{
            if(props.challenge !== undefined){
                if(fn.isExpired(props.challenge.finish_dt)){
                    window.alert("이미 완료된 일정은 수정할 수 없습니다");
                    return;
                }
                if(isRequested){ window.alert("이미 요청 중 입니다"); return; }
                setIsRequested(true);
                const result = await postUserToChallenge(user.login.toString(), props.challenge.id);
                setIsRequested(false);
                if(result.status === 'SUCCESS'){
                    dispatch(getUsersInfoThunk());
                    dispatch(getAllChallengesThunk());
                }
            }
        },
        del : async (user: UserInfoInterface)=>{
            if(props.challenge !== undefined){
                if(fn.isExpired(props.challenge.finish_dt)){
                    window.alert("이미 완료된 일정은 수정할 수 없습니다");
                    return;
                }
                if(isRequested){ window.alert("이미 요청 중 입니다"); return; }
                setIsRequested(true);
                const result = await deleteUserFromChallenge(props.challenge.id,user.login.toString());
                setIsRequested(false);
                if(result.code > 0){
                    dispatch(getUsersInfoThunk());
                    dispatch(getAllChallengesThunk());
                }
            }
        }
    }

    if (props.challenge) {
        return (<div className="setting-user-list-container">
            <div className="list-wrapper participated">
                <p className="header">참여한 정원사들</p>
                <div className="content-container">
                    {
                        props.challenge.participants.map(item => {
                            return <UserItem key={item.login.toString()} type="DEL" data={item} onClick={ fn.del }/>;
                        })
                    }
                </div>
            </div>
            <div className="list-wrapper not-participated">
                <p className="header">참여하지 않은 정원사들</p>
                <div className="content-container">
                    {
                        notParticipatedUsers.map(item => {
                            return <UserItem key={item.login.toString()} type="ADD" data={item} onClick={ fn.add }/>;
                        })
                    }
                </div>
            </div>
        </div>);
    }
    else {
        return (<></>);
    }
}

export default UserList;