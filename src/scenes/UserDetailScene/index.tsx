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
import ParticipatedChallengeList from './ParticipatedChallengeList';
import LatestAttendanceChart from './LatestAttendanceChart';
import ContributedReposList from './ContributedReposList';

// TODO : 사용자 정보 
// TODO : 사용자가 가지고 있는 repo
// TODO : 사용자가 진행한 REPO
// TODO : 사용자의 출석 정보 

const UserDetailScene = (props: any) => {
    const { user_name } = useParams();
    const history = useHistory();

    const { user } = useSelector((state: RootState) => state.user);
    const { all_challenges, challenges_by_user } = useSelector((state: RootState) => state.challenge);
    const { repos_by_user } = useSelector((state: RootState) => state.repository);
    const { latest_challenge_attendances_by_user } = useSelector((state: RootState) => state.analytics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfoThunk(user_name || ""));
        dispatch(getAllChallengesThunk());
        dispatch(getChallengesByUserThunk(user_name || ""));
        dispatch(getRepositoriesByUserThunk(user_name || ""));
        dispatch(getLatestChallengeAttendancesByUserThunk(user_name || ""));
        dispatch(getChallengesByUserThunk(user_name || ""));
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
            <div className="content-wrapper">
                <div className="header">
                    <h2>
                        참여한 도전 기간
                    </h2>
                </div>
                <div className="wrapper">
                    <ParticipatedChallengeList user_challenges={ challenges_by_user.data?.data } />
                </div>
            </div>
            <div className="content-wrapper">
                <div className="header">
                    <h2>
                        도전 기간 활동 현황
                    </h2>
                </div>
                <div className="wrapper">
                    {/* 차트 */}
                    <LatestAttendanceChart data={ latest_challenge_attendances_by_user.data }/>
                </div>
            </div>
            <div className="content-wrapper">
                <div className="header">
                    <h2>참여한 저장소들</h2>
                </div>
                <div className="wrapper">
                    <ContributedReposList data={ repos_by_user.data }/>
                </div>
            </div>
        </div>

    </div>);
}

export default UserDetailScene;