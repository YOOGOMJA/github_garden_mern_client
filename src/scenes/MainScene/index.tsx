import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect';
import "./MainScene.scss";
import './highcharts-additional.scss';

import Jumbotron from './Jumbotron';
import AttendanceByDay from './AttendanceByDay';
import AttendanceRatesRank from './AttendanceRatesRank';
import LanguageUsage from './LanguageUsage';
import PopularRepositories from './PopularRepositories';
import AttendentList from './AttendentList';
import HottestRepository from './HottestRepository';
import AllAttendanceChart from './AllAttendanceChart';

import { useDispatch, useSelector } from 'react-redux';
import {
    getSummaryThunk,
    getAllAttendancesThunk,
    getLanguagesPopularityThunk,
    getHottestRepositoryThunk,
    getPopularRepositoryThunk,
    getAllAttendancesByDatesThunk,
}
    from '../../modules/analytics';
import { getUsersParticipatedLatestChallengeThunk } from '../../modules/user';
import { RootState } from '../../modules';
import { isNullOrUndefined } from 'util';
import { useHistory } from 'react-router-dom';

const MainScene = (props: any) => {
    const { summary, all_attendances, languages, popular_repo, hottest_repo, all_attendances_by_dates } = useSelector((state: RootState) => state.analytics);
    const { users_participated_latest_challenge } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSummaryThunk());
        dispatch(getAllAttendancesThunk());
        dispatch(getLanguagesPopularityThunk());
        dispatch(getUsersParticipatedLatestChallengeThunk());
        dispatch(getHottestRepositoryThunk());
        dispatch(getPopularRepositoryThunk());
        dispatch(getAllAttendancesByDatesThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!isNullOrUndefined(summary) && !isNullOrUndefined(summary.data)) {
            if (summary.data.data.current_challenge.title === "") {
                alert('생성된 도전기간이 없습니다. 도전 기간을 먼저 생성해주세요');
                history.push('/settings');
            }
        }
    }, [summary, summary.data]);
    return (
        <div className="contents">
            <div className="header">
                <h1>
                    안녕하세요!<br className="line-break" /><b>정원사 프로젝트</b>입니다!
                </h1>
            </div>
            <Jumbotron summary={summary.data} error={summary.error} loading={summary.loading} />
            {/* 영역을 둘로 나눔 */}
            <div className="flex-items flex-2">
                <div className="flex-item">
                    <AttendanceRatesRank attendances={all_attendances.data} />
                </div>
                <div className="flex-item">
                    <AttendanceByDay attendances={all_attendances_by_dates.data} />
                </div>
            </div>
            {/* 영역을 셋으로 나눔 */}
            <div className="flex-items flex-3">
                <div className="flex-item">
                    <LanguageUsage languages={languages.data} error={languages.error} loading={languages.loading} />
                </div>
                {
                    isMobile ? (
                        <>
                            <div className="flex-item" >
                                <PopularRepositories repo={popular_repo.data} />
                            </div>
                            <div className="flex-item" >
                                <HottestRepository repo={hottest_repo.data} />
                            </div>
                        </>
                    ) :
                        (
                            <div className="flex-item" >
                                <PopularRepositories repo={popular_repo.data} />
                                <HottestRepository repo={hottest_repo.data} />
                            </div>
                        )
                }

                <div className="flex-item" style={{ flex: 3 }}>
                    <AttendentList users={users_participated_latest_challenge.data} />
                </div>
            </div>
            {
                !isMobile ?
                <div className="flex-items">
                    <div className="flex-item">
                        <AllAttendanceChart attendances={all_attendances.data} />
                    </div>
                </div> :
                <></>
            }
        </div>
    );
}


export default MainScene;