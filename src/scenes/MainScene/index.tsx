import React, { CSSProperties, useEffect } from 'react'
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

const MainScene = (props: any) => {
    const { summary, all_attendances, languages , popular_repo , hottest_repo, all_attendances_by_dates } = useSelector((state: RootState) => state.analytics);
    const { users_participated_latest_challenge } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSummaryThunk());
        dispatch(getAllAttendancesThunk());
        dispatch(getLanguagesPopularityThunk());
        dispatch(getUsersParticipatedLatestChallengeThunk());
        dispatch(getHottestRepositoryThunk());
        dispatch(getPopularRepositoryThunk());
        dispatch(getAllAttendancesByDatesThunk());
    }, [dispatch]);

    return (
        <div className="contents">
            <div className="header">
                <h1>
                    안녕하세요! <b>정원사 프로젝트</b>입니다!
                </h1>
            </div>
            <Jumbotron summary={summary.data} error={summary.error} loading={summary.loading} />
            {/* 영역을 둘로 나눔 */}
            <div className="flex-2 mt">
                <div className="flex-item">
                    <AttendanceRatesRank attendances={all_attendances.data} />
                </div>
                <div className="flex-item">
                    <AttendanceByDay attendances={ all_attendances_by_dates.data }/>
                </div>
            </div>
            {/* 영역을 셋으로 나눔 */}
            <div className="flex-3 mt">
                <div className="flex-item">
                    <LanguageUsage languages={languages.data} error={languages.error} loading={languages.loading} />
                </div>
                <div className="flex-item" style={styles.columns}>
                    <PopularRepositories repo={popular_repo.data} />
                    <HottestRepository repo={hottest_repo.data} />
                </div>
                <div className="flex-item" style={{ flex: 3 }}>
                    <AttendentList users={users_participated_latest_challenge.data} />
                </div>
            </div>
            <div className="mt">
                <AllAttendanceChart attendances={all_attendances.data} />
            </div>
        </div>
    );
}

const styles: { [name: string]: React.CSSProperties } = {
    columns: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        // height: '100%',
    }
}

export default MainScene;