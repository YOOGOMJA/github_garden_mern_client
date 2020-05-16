import React, { useEffect, useState } from 'react';
import { getLatestChallengeThunk, getAllChallengesThunk } from '../../modules/challenges/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules/';
import moment from 'moment';

import { IoIosAddCircle } from 'react-icons/io';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./index.scss";
import ChallengeDetail from './ChallengeDetail';

const SettingScene = () => {
    enum inputModeEnum { EDIT, ADD, HIDE };

    const { latest_challenge, all_challenges } = useSelector((state: RootState) => state.challenge);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState();
    const [selectedChallengeId, setSelectedChallengeId] = useState("");
    const [inputMode, setInputMode] = useState(inputModeEnum.ADD);

    useEffect(() => {
        dispatch(getLatestChallengeThunk());
        dispatch(getAllChallengesThunk());
    }, []);

    const ui = {
        getDateString: (start_dt: string | undefined, finish_dt: string | undefined) => {
            if (start_dt && finish_dt) {
                const mStartDt = moment(start_dt);
                const mFinishDt = moment(finish_dt);
                return `${mStartDt.format("YYYY-MM-DD")} - ${mFinishDt.format("YYYY-MM-DD")}`;
            }
            else {
                return "";
            }
        },
        getActiveClass: (id: string) => {
            if (selectedChallengeId === id) {
                return "active";
            }
            else {
                return "";
            }
        },
        selectChallenge: (id: string) => {
            setSelectedChallengeId(id);
            setInputMode(inputModeEnum.EDIT);
        },
        addChalenge: () => {
            setSelectedChallengeId("");
            setInputMode(inputModeEnum.ADD);
        },
        onCancel: ()=>{
            setSelectedChallengeId("");
            setInputMode(inputModeEnum.HIDE);
        }
    }

    return (<div className="contents settings">
        {/* 현재 진행중인 프로젝트 목록 */}
        <div className="header-container">
            <h1>
                프로젝트 관리 🛠
            </h1>
            <p>새로운 도전 기간을 추가하거나, 편집 혹은 삭제합니다</p>
        </div>
        <div className="content-container">
            <div className="challenge-list">
                {all_challenges.data?.data.map((item, idx) => {
                    return (
                        <div className={"challenge-container " + ui.getActiveClass(item.id)} key={item.id} onClick={() => ui.selectChallenge(item.id)} >
                            <p className="title">{item.title}</p>
                            <p className="date">
                                {
                                    ui.getDateString(item.start_dt, item.finish_dt)
                                }
                            </p>
                            <p className="desc">현재 참가자 수 : {item.participants.length}</p>
                        </div>
                    );
                })}
                <div className="challenge-container insert" onClick={ui.addChalenge}>
                    <IoIosAddCircle />
                </div>
            </div>
            
        </div>
        {/* 프로젝트 추가하기 */}
        <ChallengeDetail 
            mode={inputMode} 
            challenge={all_challenges.data?.data.find(challenge => challenge.id === selectedChallengeId)}
            onCancel={ ui.onCancel } 
        />
    </div>);
}

export default SettingScene;
