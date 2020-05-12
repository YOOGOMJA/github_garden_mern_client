import React, { CSSProperties, useEffect } from 'react'
import "./MainScene.scss";
import './highcharts-additional.scss';

import Jumbotron from './Jumbotron';

import AttendanceByDay from './AttendanceByDay';
import AttendanceRatesRank from './AttendanceRatesRank';
import LanguageUsage from './LanguageUsage';
import PopularRepositories from './PopularRepositories';
import AttendentList from './AttendentList';
import DSCFeaturedRepositories from './DSCFeaturedRepositories';
import AllAttendenceChart from './AllAttendenceChart';

import { useDispatch, useSelector } from 'react-redux';
import { getSummaryThunk, getAllAttendancesThunk } from '../../modules/analytics';
import { RootState } from '../../modules';

const MainScene = (props: any) => {
    const { summary, all_attendances } = useSelector((state:RootState)=>state.analytics);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getSummaryThunk());
        dispatch(getAllAttendancesThunk());
    },[dispatch]);
    
    return (
        <div className="contents">
            <div className="header">
                <h1>
                    안녕하세요! <b>정원사 프로젝트</b>입니다!
                </h1>
            </div>
            <Jumbotron summary={ summary.data } error={summary.error} loading={ summary.loading }/>
            {/* 영역을 둘로 나눔 */}
            <div className="flex-2 mt">
                <div className="flex-item">
                    <AttendanceRatesRank />
                </div>
                <div className="flex-item">
                    <AttendanceByDay />
                </div>
            </div>
            {/* 영역을 셋으로 나눔 */}
            <div className="flex-3 mt">
                <div className="flex-item">
                    <LanguageUsage />
                </div>
                <div className="flex-item" style={styles.columns}>
                    <PopularRepositories />
                    <DSCFeaturedRepositories />
                </div>
                <div className="flex-item" style={{ flex: 3 }}>
                    <AttendentList />
                </div>
            </div>
            <div className="mt">
                <AllAttendenceChart />
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