/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../modules';
import { postUserInfoThunk, clearPostUserInfoThunk } from '../../../modules/user/thunks';

import Indicator from '../../../components/Indicator';

interface RegisterUserProps {
    style?: { [name: string]: CSSProperties },
}

const RegistUser = (props: RegisterUserProps) => {
    const { post_user } = useSelector((state: RootState) => state.user);
    const INPUT_MODE_FORM = "INPUT_MODE_FORM";
    const INPUT_MODE_RESULT = "INPUT_MODE_RESULT";
    const [errorMesg, setErrorMesg] = useState("");
    const [inputMode, setInputMode] = useState(INPUT_MODE_FORM);
    const [userName, setUserName] = useState("");
    const [insertedUserName, setInsertedUserName] = useState("");
    const [isRequested, setIsRequested] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post_user.error) {
            setErrorMesg("오류가 발생했습니다. 잠시 후 다시 시도해주세요");
        }
        else {
            setErrorMesg("");
            if (post_user.data) {
                if (post_user.data.code < 0) {
                    // 오류인 경우
                    if (post_user.data.code === -1) {
                        setErrorMesg(post_user.data.message.toString());
                    }
                    else if (post_user.data.error && post_user.data.code === -2) {
                        if (post_user.data.error.statusCode === 404) {
                            setErrorMesg('존재하지 않는 사용자 입니다');
                        }
                        else {
                            setErrorMesg(`github 응답이 올바르지 않습니다 | ${post_user.data.error.message || post_user.data.error.code}`);
                        }
                    }
                    else {
                        setErrorMesg("데이터를 가져오는 중 오류가 발생했습니다");
                    }
                }
                else {
                    setInsertedUserName(userName);
                    setUserName("");
                    setInputMode(INPUT_MODE_RESULT);
                    // 정상인 경우
                }
            }
        }
        return () => {
            setErrorMesg("");
            setUserName("");
        }
    }, [post_user.error, post_user.data]);
    useEffect(() => {
        setIsRequested(post_user.loading);
    }, [post_user.loading]);
    useEffect(() => {
        return function () {
            setInsertedUserName("");
            setErrorMesg("");
            setUserName("");
            setInputMode(INPUT_MODE_FORM);
            dispatch(clearPostUserInfoThunk());
        }
    }, []);


    const fn = {
        submit: () => {
            if (isRequested) { alert("이미 요청 중 입니다. 잠시만 기다려주세요."); return; }
            dispatch(postUserInfoThunk(userName.trim()));
        }
    }

    const ui = {
        // 에러 메시지가 있는 경우 에러 메시지 태그를 생성
        getForm: () => {
            if (inputMode === INPUT_MODE_FORM) {
                return <div className="wrapper">
                    <div className="form" >
                        <input placeholder=" " type="text" className="input-user-name" value={userName} onChange={e => setUserName(e.target.value)} onKeyPress={e => { if (e.which === 13 || e.keyCode === 13) { /*setUserName(e.currentTarget.value); fn.submit();*/ } }} />
                        <label className="label-user-name">
                            <span>Github 계정명</span>
                        </label>
                    </div>
                    <button type="button" className="btn" onClick={fn.submit}>
                        {
                            isRequested ? <Indicator /> : "등록"
                        }
                    </button>
                </div>;
            }
            else {
                return <div className="wrapper result">
                    <p className="text sub-title">어서오세요!</p>
                    <p className="text title" >입력하신 '<b className="text highlight">{insertedUserName}</b>'가 등록되었습니다!</p>
                    <Link to={`users/${insertedUserName}`} className="text link">내 정보 확인하러 가기</Link>
                </div>;
            }
        },
    }

    return (<div className="register-user">
        {errorMesg !== "" ? <p className="text error">{errorMesg}</p> : <></>}
        {ui.getForm()}
    </div>);
}


export default RegistUser;