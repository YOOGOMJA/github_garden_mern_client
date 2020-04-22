import React, { CSSProperties } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options:any ={
    title: undefined,
    chart: {
        type: "line"
    },
    xAxis: {
        type:"category"
    },
    series: [
        {
            name: "출석률",
            // colorByPoint: true,
            data:[
                ...(()=>{
                    let people = [];
                    for(var i = 1 ; i <= 20; i++){
                        people.push({
                            name: 'Day ' + i,
                            y : i + ( i % 2 === 0 ? -1 : +1 ),
                        })    
                    }
                    return people;
                })()
            ]
        }
    ]
};

const index = ()=>{
    return(<div style={ styles.container }>
        <Card title="일별 출석률" desc="정원사분들의 일별 출석율 현황을 보여줍니다">
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