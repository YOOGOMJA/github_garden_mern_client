import React, { CSSProperties } from 'react';
import { Card } from '../../../components';

const index = ()=>{
    return(<div style={ styles.container }>
        <Card title="요즘 힙한 저장소">
            <div style={ styles.wrapper }>
                <div style={ itemStyles.container }>
                    <p style={{...itemStyles.text, ...itemStyles.owner} }>YOOGOMJA/</p>
                    <p style={{...itemStyles.text, ...itemStyles.title} }>github-farm-mern</p>
                    <p style={{...itemStyles.text, ...itemStyles.desc} }>정원사 프로젝트 mern stack 개발</p>
                    <div style={ itemStyles.factorContainer}>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>412</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>커밋</p>
                        </div>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>20</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>참여자</p>
                        </div>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>3</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>Star</p>
                        </div>
                    </div>
                </div>
                <div style={ itemStyles.container }>
                    <p style={{...itemStyles.text, ...itemStyles.owner} }>YOOGOMJA/</p>
                    <p style={{...itemStyles.text, ...itemStyles.title} }>github-farm-mern</p>
                    <p style={{...itemStyles.text, ...itemStyles.desc} }>정원사 프로젝트 mern stack 개발</p>
                    <div style={ itemStyles.factorContainer}>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>412</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>커밋</p>
                        </div>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>20</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>참여자</p>
                        </div>
                        <div style={ itemStyles.factorItemContainer }>
                            <p style={ {...itemStyles.text, ...itemStyles.factorTitle} }>3</p>
                            <p style={ {...itemStyles.text, ...itemStyles.factorDesc} }>Star</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>);    
}

const styles:{ [name:string]: CSSProperties } = {
    container: {
        
    },
    wrapper: {
        marginTop: '2em',
        height:'400px',
        overflowY:'auto',
    }
}

const itemStyles:{[name:string]: CSSProperties} = {
    text: {
        margin: 0,
        padding: 0,
        color:'#fff',
    },
    title: {
        fontSize:'1.5em',
        fontWeight:600,
    },
    desc: {
        fontSize:'.9em',
    },
    owner:{
        fontSize:'.9em',
    },
    container: {
        backgroundColor: "#27ae60",
        minHeight:'100px',
        borderRadius: '20px',
        padding: '15px 25px',
        // width:'30%',
        marginBottom:'30px',
    },
    factorContainer: {
        display:'flex',
        flexDirection:'row',
    },
    factorItemContainer:{
        flex:6,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        
    },
    factorTitle:{
        margin: '10px 0',
        fontWeight:800,
        fontSize:'3em',
    },
    factorDesc:{
        fontSize:'.8em',
    }
}

export default index;