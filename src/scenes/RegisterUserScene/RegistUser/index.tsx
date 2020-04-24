import React, { CSSProperties, useState } from 'react';
import Colors from '../../../components/Colors.json';
import { Link } from 'react-router-dom';

interface RegisterUserProps{
    style? : { [name: string] : CSSProperties },
}

const RegistUser = (props:RegisterUserProps) => {
    const INPUT_MODE_FORM = "INPUT_MODE_FORM";
    const INPUT_MODE_RESULT = "INPUT_MODE_RESULT";
    const [errorMesg, setErrorMesg] = useState("");
    const [inputMode, setInputMode] = useState(INPUT_MODE_FORM);
    
    const ui = {
        // 에러 메시지가 있는 경우 에러 메시지 태그를 생성
        getErrorMesg: ()=>{
            if(errorMesg){
                return <p style={ styles.error }>에러입니다</p>
            }
        },
        getForm: ()=>{
            if(inputMode === INPUT_MODE_FORM){
                return <div style={ styles.wrapper }>
                    <input type="text" placeholder="github 유저 계정을 입력해주세요" style={ styles.input } />
                    <button type="button" style={ styles.btn }>등록</button>
                </div>;
            }
            else{
                return <div style={ styles.resultWrapper }>
                    <p style={ styles.resultSubText }>어서오세요!</p>
                    <p style={ styles.resultText } >입력하신 '<b style={ styles.resultTextHighlight}>YOOGOMJA</b>'가 등록되었습니다!</p>
                    <Link to="/" style={ styles.resultLink }>내 정보 확인하러 가기</Link>
                </div>;
            }
        },
    }

    return (<div style={ {...props.style, ...styles.container} }>
        { ui.getErrorMesg() }
        { ui.getForm() }
    </div>);
}

const styles:{ [name: string] : CSSProperties } = {
    container : {
        margin: '150px 0',
        maxWidth:'800px',
    },
    wrapper:{
        display:'flex',
        flexDirection:'row',
    },
    input:{
        flex:9,
        border:0,
        backgroundColor:'#0000',
        fontSize:'3em',
        fontWeight:100,
        borderBottom:'1px solid ' + Colors.text.highlight,
        color:Colors.text.default,
    },
    btn:{
        flex:2,
        border: 0,
        backgroundColor:'#0000',
        color: Colors.text.highlight,
        fontWeight:100,
        fontSize:'3em',
        cursor:'pointer',
    },
    error:{
        margin:0,
        padding:0,
        fontWeight:100,
        color:Colors.red,
        fontSize:'1.5em',
    },
    resultWrapper:{
        display:'flex',
        flexDirection:'column',
    },
    resultSubText:{
        fontWeight:100,
        fontSize:'2em',
        color: '#fff',
        margin : 0,
        padding:0,
    },
    resultText: {
        fontSize:'2.5em',
        fontWeight:100,
        color:'#fff',
        margin : 0,
        padding:0,
    },
    resultTextHighlight:{
        fontWeight:800,
        color:Colors.text.highlight,
        margin : 0,
        padding:0,
    },
    resultLink:{
        fontWeight:100,
        fontSize:'1.5em',
        textDecoration:'none',
        color:Colors.text.highlight,
        margin : 0,
        padding:0,
    },
}

export default RegistUser;