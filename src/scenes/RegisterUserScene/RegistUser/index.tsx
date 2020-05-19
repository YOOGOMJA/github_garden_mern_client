import React, { CSSProperties, useState, useEffect } from 'react';
import Colors from '../../../components/Colors.json';
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
    const [insertedUserName, setInsertedUserName]= useState("");
    const [isRequested, setIsRequested] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post_user.error) {
            setErrorMesg("오류가 발생했습니다. 잠시 후 다시 시도해주세요");
        }
        else {
            setErrorMesg("");
            if(post_user.data){
                if(post_user.data.code < 0){
                    // 오류인 경우
                    if(post_user.data.code === -1){
                        setErrorMesg(post_user.data.message.toString());
                    }
                    else if(post_user.data.error && post_user.data.code === -2){
                        if(post_user.data.error.statusCode === 404){
                            setErrorMesg('존재하지 않는 사용자 입니다');
                        }
                        else{
                            setErrorMesg(`github 응답이 올바르지 않습니다 | ${post_user.data.error.message || post_user.data.error.code}`);
                        }
                    }
                    else{
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
        return ()=>{
            setErrorMesg("");
            setUserName("");
        }
    }, [post_user.error, post_user.data]);
    useEffect(()=>{
        setIsRequested(post_user.loading);
    },[post_user.loading]);
    useEffect(()=>{
        return function () {
            setInsertedUserName("");
            setErrorMesg("");
            setUserName("");
            setInputMode(INPUT_MODE_FORM);
            dispatch(clearPostUserInfoThunk());
        }
    },[]);

    
    const fn = {
        submit: () => {
            if(isRequested){ alert("이미 요청 중 입니다. 잠시만 기다려주세요."); return;}
            dispatch(postUserInfoThunk(userName.trim()));
        }
    }

    const ui = {
        // 에러 메시지가 있는 경우 에러 메시지 태그를 생성
        getForm: () => {
            if (inputMode === INPUT_MODE_FORM) {
                return <div style={styles.wrapper}>
                    <input type="text" placeholder="github 유저 계정을 입력해주세요" style={styles.input} value={ userName } onChange={ e=>setUserName(e.target.value) } onKeyPress={ e=>{if(e.which === 13 || e.keyCode === 13){ /*setUserName(e.currentTarget.value); fn.submit();*/ }} }/>
                    <button type="button" style={styles.btn} onClick={fn.submit}>
                        {
                            isRequested ? <Indicator/> : "등록"
                        }
                    </button>
                </div>;
            }
            else {
                return <div style={styles.resultWrapper}>
                    <p style={styles.resultSubText}>어서오세요!</p>
                    <p style={styles.resultText} >입력하신 '<b style={styles.resultTextHighlight}>{insertedUserName}</b>'가 등록되었습니다!</p>
                    <Link to={`users/${insertedUserName}`} style={styles.resultLink}>내 정보 확인하러 가기</Link>
                </div>;
            }
        },
    }

    return (<div style={{ ...props.style, ...styles.container }}>
        { errorMesg !== "" ? <p style={styles.error}>{errorMesg}</p> : <></> }
        {ui.getForm()}
    </div>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        margin: '150px 0',
        maxWidth: '800px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flex: 9,
        border: 0,
        backgroundColor: '#0000',
        fontSize: '3em',
        fontWeight: 100,
        borderBottom: '1px solid ' + Colors.text.highlight,
        color: Colors.text.default,
    },
    btn: {
        flex: 2,
        border: 0,
        backgroundColor: '#0000',
        color: Colors.text.highlight,
        fontWeight: 100,
        fontSize: '3em',
        cursor: 'pointer',
    },
    error: {
        margin: 0,
        padding: 0,
        fontWeight: 100,
        color: Colors.red,
        fontSize: '1.5em',
    },
    resultWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    resultSubText: {
        fontWeight: 100,
        fontSize: '2em',
        color: '#fff',
        margin: 0,
        padding: 0,
    },
    resultText: {
        fontSize: '2.5em',
        fontWeight: 100,
        color: '#fff',
        margin: 0,
        padding: 0,
    },
    resultTextHighlight: {
        fontWeight: 800,
        color: Colors.text.highlight,
        margin: 0,
        padding: 0,
    },
    resultLink: {
        fontWeight: 100,
        fontSize: '1.5em',
        textDecoration: 'none',
        color: Colors.text.highlight,
        margin: 0,
        padding: 0,
    },
}

export default RegistUser;