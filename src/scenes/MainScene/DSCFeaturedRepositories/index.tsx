import React, { CSSProperties } from 'react';
import { Card } from '../../../components';
import Colors from '../../../components/Colors.json';

const index = ()=>{
    return(<div style={ styles.container }>
        <Card title="DSC에서 진행중인 저장소" desc="현재 DSC에서 진행중인 프로젝트의 저장소입니다">
            <div style={ styles.wrapper }>
                <div style={ itemStyles.container }>
                    <p style={{...itemStyles.text, ...itemStyles.owner} }>dsk-shamyook/</p>
                    <p style={{...itemStyles.text, ...itemStyles.title} }>github-farm-mern</p>
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
        // height:'100%',
    },
    wrapper: {
        // marginTop: '1em',
    }
}

const itemStyles:{[name:string]: CSSProperties} = {
    text: {
        margin: 0,
        padding: 0,
        color:'#fff',
    },
    title: {
        fontSize:'1.3em',
        fontWeight:600,
    },
    desc: {
        fontSize:'.9em',
    },
    owner:{
        fontSize:'.7em',
    },
    container: {
        backgroundColor: Colors.blue,
        minHeight:'100px',
        borderRadius: '10px',
        padding: '12px 25px',
        // width:'30%',
        marginBottom:'20px',
        boxShadow:"2px 2px 3px 0px" + Colors.shadow,
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
        fontWeight:800,
        fontSize:'2.5em',
    },
    factorDesc:{
        fontSize:'.8em',
    }
}

export default index;