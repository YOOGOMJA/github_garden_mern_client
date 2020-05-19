import React, { useEffect, useState } from 'react';
import { LatestChallengeAttendancesByUserReponse } from '../../../api/analytics';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './LatestAttendanceChart.scss';

interface LatestAttendanceChartProps {
    data: LatestChallengeAttendancesByUserReponse | null
}

const LatestAttendanceChart = (props: LatestAttendanceChartProps) => {
    // console.log(props.data);
    const initialOptions:any = {
        title: undefined,
        chart:{
            type: "line",
        },
        xAxis:{
            type:"category",
        },
        series:[{
            name : "커밋 수",
            data : [],
        }]
    };
    const [ chartOptions, setChartOptions ] = useState();
    useEffect(()=>{
        if(props.data && props.data.code > 0 && props.data.data.length > 0){
            // 데이터 있음 
            let _series = [];
            for(let [date, commits] of Object.entries(props.data.data[0].attendances)){
                _series.push({
                    name : moment(date).format("MM/DD"),
                    y : commits
                });
            }
            let _options = { ...initialOptions };
            _options.series[0].data = _series;
            setChartOptions(_options);
        }

        return ()=>{
            setChartOptions(initialOptions);
        }
    },[props.data]);
    if (null) {
        return (
            <div className="attendance-chart-container">
                <div className="chart-alt">
                    <p className="chart-alt-text">데이터 없음</p>
                    <p className="chart-alt-desc">사용자 정보 갱신 후 새로 고침해주세요</p>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="attendance-chart-container">
                <HighchartsReact
                    highcharts={ Highcharts }
                    options={ chartOptions }
                />
            </div>
        );
    }
    
}

export default LatestAttendanceChart;