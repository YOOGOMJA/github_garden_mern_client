import React, { useState } from 'react';
import { GoPulse, GoVerified, GoFlame } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';
import ChallengeInterface from '../../../api/interfaces/Challenge';
import moment from 'moment';

import { getChallengesByUserThunk } from '../../../modules/challenges';
import { RootState } from '../../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFromChallenge } from '../../../api/challenge';
import { getLatestChallengeAttendancesByUserThunk } from '../../../modules/analytics';

interface ParticipatedChallengeItem {
    data: ChallengeInterface;

}

enum DATE_STATE {
    SCHEDULED,
    PROCEEDING,
    FINISHED,
}

const ParticipatedChallengeItem = (props: ParticipatedChallengeItem) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isRequested, setIsRequested] = useState(false);
    const fn = {
        calcDate: (start_dt: string, finish_dt: string) => {
            const mStartDt = moment(start_dt);
            const mFinishDt = moment(finish_dt);
            const mNow = moment();
            let _state = DATE_STATE.SCHEDULED;

            if (mNow.diff(mFinishDt) > 0) {
                // 만료된 경우 
                _state = DATE_STATE.FINISHED;
            }
            else if (mNow.diff(mFinishDt) <= 0 && mNow.diff(mStartDt) > 0) {
                // 진행중인 경우 
                _state = DATE_STATE.PROCEEDING;
            }
            else {
                _state = DATE_STATE.SCHEDULED;
            }

            return {
                frm_start_dt: mStartDt.format('YYYY-MM-DD'),
                frm_finish_dt: mFinishDt.format('YYYY-MM-DD'),
                state: _state
            };
        },
        delete: async (challenge_id: string, user_name: string | undefined) => {
            if (isRequested) { alert('요청중입니다'); return; }
            if(user_name){
                if (window.confirm("이 도전을 취소할까요?")) {
                    setIsRequested(true);
                    await deleteUserFromChallenge(challenge_id, user_name);
                    setIsRequested(false);
                    dispatch(getChallengesByUserThunk(user_name));
                    dispatch(getLatestChallengeAttendancesByUserThunk(user_name));
                }
            }
            else{
                alert('잘못된 요청입니다');
            }
        }
    }
    const ui = {
        class: (start_dt: string, finish_dt: string) => {
            const calc = fn.calcDate(start_dt, finish_dt);
            let defaultClass = "challenge-card-container";
            switch (calc.state) {
                case DATE_STATE.SCHEDULED:
                    return defaultClass + " scheduled";
                case DATE_STATE.PROCEEDING:
                    return defaultClass + " active";
                case DATE_STATE.FINISHED:
                    return defaultClass + " finished";
                default:
                    return defaultClass;
            }
        },
        state: (start_dt: string, finish_dt: string) => {
            const calc = fn.calcDate(start_dt, finish_dt);
            switch (calc.state) {
                case DATE_STATE.SCHEDULED:
                    return <p className="info"><GoPulse />진행 예정</p>;
                case DATE_STATE.PROCEEDING:
                    return <p className="info"><GoFlame />진행중</p>;
                case DATE_STATE.FINISHED:
                    return <p className="info"><GoVerified />종료됨</p>;
                default:
                    return <></>;
            }
        },
        date: (start_dt: string, finish_dt: string) => {
            const calc = fn.calcDate(start_dt, finish_dt);
            return <p className="date">{calc.frm_start_dt} - {calc.frm_finish_dt}</p>
        },
        delete: (start_dt: string, finish_dt: string, challenge_id: string, user_name: string | undefined) => {
            const calc = fn.calcDate(start_dt, finish_dt);
            if (calc.state !== DATE_STATE.FINISHED) {
                return (<button 
                        className="card-delete" 
                        type="button" 
                        onClick={() => fn.delete(challenge_id, user_name)} >
                    <MdDeleteForever />
                    <p>취소</p>
                </button>);
            } else { return (<></>); }
        }
    }
    return (
        <div className={ui.class(props.data.start_dt, props.data.finish_dt)}>
            <p className="title">{props.data.title}</p>
            {ui.date(props.data.start_dt, props.data.finish_dt)}
            <div className="desc-wrapper">
                {ui.state(props.data.start_dt, props.data.finish_dt)}
                {ui.delete(props.data.start_dt, props.data.finish_dt, props.data.id, user.data?.data.login.toString())}
            </div>
        </div>);
}

export default ParticipatedChallengeItem;