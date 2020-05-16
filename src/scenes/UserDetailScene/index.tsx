import React, { useEffect, useState } from 'react'
import { CommonStyles } from '../../styles';
import "./index.scss";

import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoThunk } from '../../modules/user';
import { getAllChallengesThunk, getChallengesByUserThunk } from '../../modules/challenges';
import { getLatestChallengeAttendancesByUserThunk } from '../../modules/analytics';
import { getRepositoriesByUserThunk } from '../../modules/repositories';
import { RootState } from '../../modules';

import { GoPulse, GoVerified } from 'react-icons/go';
import {IoIosCloseCircle } from 'react-icons/io';

import UserDetailHeader from './UserDetailHeader';


// TODO : 사용자 정보 
// TODO : 사용자가 가지고 있는 repo
// TODO : 사용자가 진행한 REPO
// TODO : 사용자의 출석 정보 

const UserDetailScene = (props: any) => {
    const { user_name } = useParams();
    const history = useHistory();

    const { user } = useSelector((state: RootState) => state.user);
    const { all_challenges } = useSelector((state: RootState) => state.challenge);
    const { repos_by_user } = useSelector((state: RootState) => state.repository);
    const { latest_challenge_attendances_by_user } = useSelector((state: RootState) => state.analytics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfoThunk(user_name || ""));
        dispatch(getAllChallengesThunk());
        dispatch(getChallengesByUserThunk(user_name || ""));
        dispatch(getRepositoriesByUserThunk(user_name || ""));
        dispatch(getLatestChallengeAttendancesByUserThunk(user_name || ""));
    }, [dispatch, user_name]);

    useEffect(() => {
        if (user.error) {
            if (user.error.message.indexOf("404") >= 0) {
                history.push("./404-not-found");
            }
            else {
                alert("오류가 발생했습니다");
                history.push("../");
            }
        }
    }, [history, user.error]);

    useEffect(() => {
        if (user.data) {
            if (user.data.code !== 1) {
                alert("오류가 발생했습니다");
                history.push("/");
            }
        }
    }, [history, user.data, user.loading]);

    return (<div className="user-content-container">
        <UserDetailHeader user={user.data?.data} />
        <div className="content-container">
            {/* <div className="content-wrapper">

            <p>{user.data?.data.login}</p>
            <p>{user.data?.data.name}</p>
            <p>{user.data?.data.bio}</p>
            <p>{user.data?.data.email}</p>
            <p>{user.data?.data.html_url}</p>
            <p>{user.data?.data.company}</p>
            <p>{user.data?.data.blog}</p>
            <div>
                {all_challenges.data?.data.map(item => { return <p>{item.title}</p> })}
            </div>
            <div>
                {repos_by_user.data?.data.map(repo => { return <p>{repo.name}</p> })}
                {repos_by_user.data?.data.map(repo => { return <p>{repo.name}</p> })}
                {repos_by_user.data?.data.map(repo => { return <p>{repo.name}</p> })}
            </div>
            <div>
                {
                    (() => {
                        if (latest_challenge_attendances_by_user.data) {
                            if (latest_challenge_attendances_by_user.data.data) {
                                return <p>참석률 : {latest_challenge_attendances_by_user.data.data[0].attendances_rate}</p>
                            }
                        }
                    })()
                }
            </div>
            </div> */}
            <div className="content-wrapper">
                <div className="header">
                    <h2>
                        참여한 도전 기간
                    </h2>
                </div>
                <div className="wrapper">
                    <div className="card-list">
                        <div className="challenge-card-container active">
                            <p className="title">도전 기간 제목</p>
                            <p className="date">2020-03-01 - 2020-05-01</p>
                            <p className="info"><GoPulse/>진행중</p>
                            <button className="card-delete" type="button">
                                <IoIosCloseCircle/>
                            </button>
                        </div>

                        <div className="challenge-card-container finished">
                            <p className="title">도전 기간 제목</p>
                            <p className="date">2020-03-01 - 2020-05-01</p>
                            <p className="info"><GoVerified/>종료됨</p>
                        </div>

                        <div className="challenge-card-container finished">
                            <p className="title">도전 기간 제목</p>
                            <p className="date">2020-03-01 - 2020-05-01</p>
                            <p className="info"><GoVerified/>종료됨</p>
                        </div>

                        <div className="challenge-card-container finished">
                            <p className="title">도전 기간 제목</p>
                            <p className="date">2020-03-01 - 2020-05-01</p>
                            <p className="info"><GoVerified/>종료됨</p>
                        </div>

                        <div className="challenge-card-container finished">
                            <p className="title">도전 기간 제목</p>
                            <p className="date">2020-03-01 - 2020-05-01</p>
                            <p className="info"><GoVerified/>종료됨</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>);
}

export default UserDetailScene;