import React, { CSSProperties, useState } from 'react';
import Colors from '../../components/Colors.json';
import RegistUser from './RegistUser';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';

const Index = () => {
    const { post_user } = useSelector((state:RootState)=>state.user);
    const [ errorMesg, setErrorMesg ] = useState("오류입니다");
    
    return (<div style={styles.container}>
        <div style={ stHeader.container }>
            <h2 style={ { ...styles.text, ...stHeader.subTitle } }>안녕하세요!</h2>
            <h1 style={ { ...styles.text, ...stHeader.title } }>
                <b style={{ ...styles.text, ...stHeader.highlight }}>정원사 프로젝트</b>
                에 어서오세요!
            </h1>
            <p style={ { ...styles.text, ...stHeader.desc } }>처음오셨나요? github 계정명을 입력해주시면 참여할 수 있습니다!</p>
           <RegistUser/> 
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
        borderBottom:'1px solid ' + Colors.text.highlight,
        color:Colors.text.default,
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
