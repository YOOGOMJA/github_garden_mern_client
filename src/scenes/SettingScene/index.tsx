import React, {useEffect, useState} from 'react';
import { getLatestChallengeThunk, getAllChallengesThunk } from '../../modules/challenges/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules/';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const SettingScene = ()=>{
    const { latest_challenge } = useSelector((state:RootState)=>state.challenge);
    const dispatch = useDispatch();
    const [ startDate, setStartDate ] = useState();
    
    useEffect(() => {
        dispatch(getLatestChallengeThunk());
    }, []);

    useEffect(() => {
        console.log(latest_challenge);
    }, [latest_challenge])
    return (<div className="contents">
        {/* 현재 진행중인 프로젝트 목록 */}
        <div className="header-container">
            <h1>
                프로젝트 관리
            </h1>
            <p>새로운 도전 기간을 추가하거나, 편집 혹은 삭제합니다</p>
        </div>
        {/* 프로젝트 추가하기 */}
        <DatePicker  
            selected={ startDate }
            onChange={ (date)=>{  console.log(date); setStartDate(date); } }
        />
    </div>);
}

export default SettingScene;
