import React, { CSSProperties } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options:any ={
    title: undefined,
    chart: {
        type: "pie"
    },
    // xAxis: {
    //     type:"category"
    // },
    // legend: undefined,
    series: [
        {
            name: "출석률",
            colorByPoint: true,
            data:[
                ...(()=>{
                    let people = [];
                    for(var i = 1 ; i <= 10; i++){
                        people.push({
                            name: 'Language' + i,
                            y : i,
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
        <Card title="사용된 언어">
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
        
    },
    wrapper: {
        marginTop: '2em',
    }
}

export default index;