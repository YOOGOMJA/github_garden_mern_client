import React, { useEffect, useState } from 'react'
import { CommonStyles } from '../../styles';
import "./index.scss";

import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoThunk } from '../../modules/user';
import { RootState } from '../../modules';

// TODO : 사용자 정보 
// TODO : 사용자가 가지고 있는 repo
// TODO : 사용자가 진행한 REPO
// TODO : 사용자의 출석 정보 

const UserDetailScene = (props :any)=>{  
    const { user_name } = useParams();
    const history = useHistory();

    const { user } = useSelector((state: RootState)=> state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfoThunk(user_name || ""));
    }, [dispatch, user_name]);

    useEffect(()=>{
        if(user.error){
            if(user.error.message.indexOf("404") >= 0){
                history.push("./404-not-found");
            }
            else{
                alert("오류가 발생했습니다");
                history.push("../");
            }
        }
    },[history, user.error]);

    useEffect(()=>{
        if(user.data){
            if(user.data.code !== 1){
                alert("오류가 발생했습니다");
                history.push("/");
            }
            else{
                // 데이터 가져오기 성공
                console.log(user.data.data);
            }
        }
    }, [history, user.data, user.loading]);

    return (<div style={ CommonStyles.container }>
        <p style={ CommonStyles.text }>
            User
        </p>
    </div>);
}

export default UserDetailScene;