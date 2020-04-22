import React, { CSSProperties } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options:any ={
    title: undefined,
    chart: {
        type: "column"
    },
    xAxis: {
        type:"category"
    },
    series: [
        {
            name: "출석률",
            colorByPoint: true,
            data:[
                ...(()=>{
                    let people = [];
                    for(var i = 1 ; i <= 10; i++){
                        people.push({
                            name: 'person' + i,
                            y : i,
                        })    
                    }
                    return people;
                })()
            ]
        },
        {
            name: "평균",
            type:"line",
            data: [...(()=>{
                let people = [];
                for(var i = 1 ; i <= 10; i++){
                    people.push({
                        // name: 'person' + i,
                        y : 5,
                    })    
                }
                return people;
            })()]
        }
    ]
};

const index = ()=>{
    return(<div style={ styles.container }>
        <Card title="정원사 참여율" desc="높은 참여율을 보이는 정원사분들입니다">
            {/* CARD BODY */}
            <div style={ styles.wrapper }>
                <HighchartsReact
                    highcharts={ Highcharts }
                    options={ options }
                />
            </div>
        </Card>
    </div>);    
}

const styles:{ [name:string]: CSSProperties } = {
    container: {
        height:'100%',
    },
    wrapper: {
        marginTop: '2em',
    }
}

export default index;