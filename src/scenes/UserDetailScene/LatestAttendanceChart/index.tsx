/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { LatestChallengeAttendancesByUserReponse } from '../../../api/analytics';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './LatestAttendanceChart.scss';

import { HighChartsTheme_Dark } from '../../../components/HighChartsTheme';

interface LatestAttendanceChartProps {
    data: LatestChallengeAttendancesByUserReponse | null
}

const LatestAttendanceChart = (props: LatestAttendanceChartProps) => {
    const initialOptions:any = {
        ...HighChartsTheme_Dark,
        chart : {
            ...HighChartsTheme_Dark.chart,
            type : "line",
            
        },
        xAxis:{
            ...HighChartsTheme_Dark.xAxis,
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
            _options.series[0].title = "일별 출석률";
            _options.series[0].tooltip = {pointFormat : '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} 건</b><br/>'};
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