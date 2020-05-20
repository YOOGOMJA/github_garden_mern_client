import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import ChallengeInterface from '../../api/interfaces/Challenge';
import { deleteChallenge, putChallengeFeatured } from '../../api/challenge';
import { getAllChallengesThunk } from '../../modules/challenges';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ChallengeAPI } from '../../api';

enum inputModeEnum { EDIT, ADD, HIDE };

interface ChallengeDetail {
    challenge?: ChallengeInterface,
    mode: inputModeEnum,
    onCancel: Function,
}

const ChallengeDetail = (props: ChallengeDetail) => {
    const [titleError, setTitleError] = useState("");
    const [dateError, setDateError] = useState("");
    const [challengeTitle, setChallengeTitle] = useState("");
    const [selectedFinishDt, setSelectedFinishDt] = useState(new Date());
    const [selectedStartDt, setSelectedStartDt] = useState(new Date());
    const [ isRequested , setIsRequested ] = useState(false);

    const dispatch = useDispatch();

    const ui = {
        featuredBtn : (challenge : ChallengeInterface| undefined)=>{
            if(challenge !== undefined){
                return (
                    <button className={ "btn " + (!challenge.is_featured ? "featured" : 'not-featured') } type="button" onClick={ ()=>fn.submit.featured(challenge.id, !challenge.is_featured) }>
                        { !challenge.is_featured ? '인증 처리' : '미인증 처리'  }
                    </button>
                );
            }
            else{
                return (<></>);
            }
        }
    }

    const fn = {
        init: (challenge?: ChallengeInterface) => {
            if (challenge) {
                setSelectedStartDt((moment(challenge.start_dt).toDate()));
                setSelectedFinishDt((moment(challenge.finish_dt).toDate()));
                setChallengeTitle(challenge.title);
            }
            else {
                const nowDate = moment();
                const nextDate = nowDate.clone().add("day", 1);
                setChallengeTitle("");
                setSelectedStartDt(nowDate.toDate());
                setSelectedFinishDt(nextDate.toDate());
            }
        },
        cancel: () => {
            if (props.onCancel) {
                // 데이터들 초기화
                props.onCancel();
            }
        },
        valid: (title: string, start_dt: Date, finish_dt: Date): boolean => {
            let hasError = false;

            if (title === "") {
                setTitleError("제목은 공백일 수 없습니다");
                hasError = true;
            }
            else if (title.length > 30) {
                setTitleError("제목은 30자를 넘을 수 없습니다");
                hasError = true;
            }
            else { setTitleError(""); }

            const mStartDt = moment(start_dt);
            const mFinishDt = moment(finish_dt);
            const diff = mStartDt.diff(mFinishDt);
            if (diff > 0) {
                setDateError("시작일은 종료일보다 이전이어야 합니다");
                hasError = true;
            }
            else if (diff === 0) {
                setDateError("시작일과 종료일은 같을 수 없습니다");
                hasError = true;
            }
            else {
                setDateError("");
            }

            return !hasError;
        },
        submit: {
            add: async (title: string, start_dt: Date, finish_dt: Date) => {
                if(isRequested){ window.alert("요청 중 입니다"); return; }
                if (fn.valid(title, start_dt, finish_dt)) {
                    if(window.confirm("도전 기간을 추가할까요?")){
                        setIsRequested(true);
                        const result = await ChallengeAPI.postChallenge({
                            title: title,
                            start_dt: start_dt, 
                            finish_dt: finish_dt
                        });
                        setIsRequested(false);
                        if(result.code > 0){
                            
                            dispatch(getAllChallengesThunk());
                            fn.init();
                            props.onCancel();
                            window.alert("추가되었습니다");
                            
                        }
                        else{
                            window.alert(result.message);
                        }
                    }
                }
            },
            update: async (challenge_id:string|undefined,title: string, start_dt: Date, finish_dt: Date) => {
                if(isRequested){ window.alert("요청 중 입니다"); return; }
                if(challenge_id){
                    if (fn.valid(title, start_dt, finish_dt)) {
                        if(window.confirm("도전 기간을 수정할까요?")){
                            setIsRequested(true);
                            const result = await ChallengeAPI.putChallenge(challenge_id,{
                                title: title,
                                start_dt: start_dt,
                                finish_dt: finish_dt,
                            });
                            setIsRequested(false);
                            if(result.code > 0){
                                dispatch(getAllChallengesThunk());
                                window.alert("수정되었습니다");
                            }
                            else{
                                window.alert(result.message);
                            }
                        }
                    }
                }
                else{ window.alert("잘못된 요청입니다"); }
            },
            delete : async (challenge_id:string | undefined)=>{
                if(isRequested){ window.alert("요청 중 입니다"); return; }
                if(challenge_id){
                    if(window.confirm("해당 도전 기간을 정말 삭제할까요?")){
                        setIsRequested(true);
                        const result = await deleteChallenge(challenge_id);
                        setIsRequested(false);
                        if(result.code > 0){
                            setDateError("");
                            setTitleError("");
                            // 삭제됐으니, 선택 취소 처리
                            dispatch(getAllChallengesThunk());
                            props.onCancel();
                        }
                        else{
                            window.alert(result.message);
                        }
                    }
                }
            },
            featured : async (challenge_id:string | undefined, is_featured : Boolean)=>{
                if(isRequested){ window.alert('요청 중 입니다');return; }
                if(challenge_id){
                    if(window.confirm(is_featured ? '이 요청을 인증 처리 할까요?\n인증 처리 시, 모든 통계는 해당 프로젝트를 기준으로 합니다' : '이 요청을 미인증 처리할까요?')){
                        setIsRequested(true);
                        const result = await putChallengeFeatured(challenge_id, is_featured);
                        setIsRequested(false);
                        if(result.code > 0){
                            setDateError("");
                            setTitleError("");
                            // 삭제됐으니, 선택 취소 처리
                            dispatch(getAllChallengesThunk());
                            if(is_featured){
                                window.alert('이제 해당 프로젝트가 메인 정원사 프로젝트가 됩니다. 모든 통계는 해당 프로젝트를 기준으로 합니다');
                            }
                        }
                        else{
                            window.alert(result.error.message || `오류가 발생했습니다 : \n${result.error}`);
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (props.challenge) {
            setDateError("");
            setTitleError("");
            setChallengeTitle(props.challenge.title);
            setSelectedStartDt((moment(props.challenge.start_dt).toDate()));
            setSelectedFinishDt((moment(props.challenge.finish_dt).toDate()));
        }
        else {
            const nowDate = moment();
            const nextDate = nowDate.clone().add("day", 1);
            setDateError("");
            setTitleError("");
            setChallengeTitle("");
            setSelectedStartDt(nowDate.toDate());
            setSelectedFinishDt(nextDate.toDate());
        }
    }, [props, props.challenge]);

    if (props.mode === inputModeEnum.HIDE) {
        return <div className="challenge-info-container">
            <div className="info">
                <p className="title">선택된 도전 기간이 없습니다</p>
                <p className="desc">수정할 도전 기간을 선택하거나, 새로운 도전 기간을 추가해보세요</p>
            </div>
        </div>;
    }
    else {
        return (
            <div className="challenge-info-container">
                <h2>도전 기간
                    {props.mode === inputModeEnum.ADD ? " 추가" : " 상세 보기"}
                </h2>
                <div className="detail-container">
                    <div className="title-container">
                        <div className="info">
                            <span className="name">도전 기간 제목</span>
                            {
                                titleError ? <span className="error">{titleError}</span> : <></>
                            }
                        </div>
                        <input type="text" className="input" value={challengeTitle} onChange={e => { setChallengeTitle(e.target.value) }} />
                    </div>
                    <div className="dates-container">
                        <div className="date-container">
                            <div className="info">
                                <span className="name">도전 시작 일자</span>
                                {
                                    dateError ? <span className="error">{dateError}</span> : <></>
                                }
                            </div>
                            <DatePicker
                                selected={selectedStartDt}
                                onChange={date => { if (date) { setSelectedStartDt(date) } }}
                                className="input"
                            />
                        </div>
                        <div className="date-container">
                            <div className="info">
                                <span className="name">도전 종료 일자</span>
                                {
                                    dateError ? <span className="error">{dateError}</span> : <></>
                                }
                            </div>

                            <DatePicker
                                selected={selectedFinishDt}
                                onChange={date => { if (date) { setSelectedFinishDt(date) } }}
                                className="input"
                            />
                        </div>
                    </div>
                </div>
                <div className="btns-container">
                    {
                        props.mode === inputModeEnum.EDIT ?
                            <>
                                { ui.featuredBtn(props.challenge) }
                                <button
                                    className="btn add"
                                    onClick={
                                        () => {
                                            fn.submit.update(props.challenge?.id, challengeTitle, selectedStartDt, selectedFinishDt)
                                        }
                                    }>
                                    수정
                                </button>
                                <button className="btn delete" onClick={()=>{fn.submit.delete(props.challenge?.id)}}>
                                    삭제
                                </button>
                            </> :
                            <button
                                className="btn add"
                                onClick={
                                    () => {
                                        fn.submit.add(challengeTitle, selectedStartDt, selectedFinishDt)
                                    }
                                }>
                                추가
                        </button>
                    }
                    <button className="btn cancel" onClick={fn.cancel}>
                        취소
                    </button>
                </div>
            </div>
        );
    }
}

export default ChallengeDetail;