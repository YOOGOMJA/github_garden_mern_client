import React, { CSSProperties, useState } from 'react';
import Colors from '../../components/Colors.json';
import HeaderImg from '../../components/HeaderImg';



const Index = () => {
    const [ errorMesg, setErrorMesg ] = useState("오류입니다");
    // setErrorMesg("");
    return (<div style={styles.container}>
        <div style={ stHeader.container }>
            <h2 style={ { ...styles.text, ...stHeader.subTitle } }>안녕하세요!</h2>
            <h1 style={ { ...styles.text, ...stHeader.title } }>
                <b style={{ ...styles.text, ...stHeader.highlight }}>정원사 프로젝트</b>
                에 어서오세요!
            </h1>
            <p style={ { ...styles.text, ...stHeader.desc } }>처음오셨나요? github 계정명을 입력해주시면 참여할 수 있습니다!</p>
            {/* <HeaderImg/> */}
            <div style={ stHeader.inputContainer }>
                {
                    (()=>{
                        if(errorMesg !== ""){
                            return <p style={{ ...styles.text, ...stHeader.error }}>{errorMesg}</p>
                        }
                    })()
                }
                <div style={ stHeader.inputWrapper }>
                    <input style={ stHeader.input } type="text" placeholder="github 계정명을 입력해주세요"/>
                    <button style={ stHeader.inputBtn } type="button">등록</button>
                </div>
            </div>
            
        </div>
    </div>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        marginLeft:'80px',
        padding : '50px 50px 0 50px',
    },
    text: {
        color:Colors.text.default,
        margin:0,
        padding:0,
    }
}

const stHeader: { [name:string]: CSSProperties } = {
    container : {
        // marginTop:'50px',
    },
    subTitle:{
        fontSize:'3em',
        fontWeight:100,
    },
    desc: {
        marginTop:'1em',
        marginBottom:'1.5em',
        fontSize:'1.5em',
        fontWeight:100,
        // textAlign:'center',
    },
    error:{
        fontWeight:100,
        color:Colors.red,
        fontSize:'1.5em',
    },
    title: {
        fontSize:'4.5em',
        fontWeight:100,
        color:Colors.text.default,
        lineHeight:'1em',
    },
    highlight:{
        lineHeight:'1em',
        color:Colors.text.highlight,
    },
    inputContainer:{
        margin:'150px 0',
        maxWidth:'800px',
    },
    inputWrapper:{
        display:'flex',
        flexDirection:'row',
    },
    input:{
        border:0,
        backgroundColor:'rgba(0,0,0,0)',
        fontSize:'3em',
        fontWeight:100,
        width:'100%',
        borderBottom:'1px solid #fff',
        color:Colors.text.highlight,
        flex:9
    },
    inputBtn:{
        flex:2,
        border:0,
        color:Colors.text.highlight,
        backgroundColor:'#0000',
        fontWeight:100,
        fontSize:'3em',
        borderTopRightRadius:'10px',
        borderBottomRightRadius:'10px',
        cursor:'pointer',
    }
}

export default Index;
