import React from 'react'
import "./MainScene.scss";

import SideMenu from './SideMenu';
import Jumbotron from './Jumbotron';
import { MdDateRange } from 'react-icons/md';

import AttendanceByDay from './AttendanceByDay';
import AttendanceRatesRank from './AttendanceRatesRank';
import LanguageUsage from './LanguageUsage';
import PopularRepositories from './PopularRepositories';
import AttendentList from './AttendentList';

import Logo from '../../components/Logo';

const index = () => {
    return (
        <div className="main-container">
            <SideMenu />
            <div className="contents">
                <div className="header">
                    <h1>
                        안녕하세요! <b>정원사 프로젝트</b>입니다!
                    </h1>
                </div>
                <Jumbotron />
                {/* 영역을 둘로 나눔 */}
                <div className="flex-2 mt">
                    <div className="flex-item">
                        <AttendanceRatesRank/>
                    </div>
                    <div className="flex-item">
                        <AttendanceByDay/>
                    </div>
                </div>
                {/* 영역을 셋으로 나눔 */}
                <div className="flex-3 mt">
                    <div className="flex-item">
                        <LanguageUsage />
                    </div>
                    <div className="flex-item">
                        <PopularRepositories/>
                    </div>
                    <div className="flex-item">
                        <AttendentList/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: { [name: string]: React.CSSProperties } = {

}

export default index;