/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useState, useEffect } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AllAttendancesByDates } from '../../../api/analytics';
import moment from 'moment';

import { HighChartsTheme_Dark } from '../../../components/HighChartsTheme';

interface AttendanceByDayProps {
    attendances : AllAttendancesByDates| null,
}

const AttendanceByDay = (props:AttendanceByDayProps)=>{
    const initialOptions:any = {
        ...HighChartsTheme_Dark,
        chart : {
            ...HighChartsTheme_Dark.chart,
            type : "line",
            // width:700,
        },
        xAxis : {
            ...HighChartsTheme_Dark.xAxis,
            type : "category",
            // scrollbar: {
            //     enabled: true
            // }
        },
        yAxis : {
            ...HighChartsTheme_Dark.yAxis,
            max : 100
        },
        series: [
            {
                name: "출석률",
                data:[],
                tooltip: { pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:.1f}%</b><br/>' },
            }
        ]
    };

    const [options , setOptions] = useState(initialOptions);
    useEffect(()=>{
        if(props.attendances && props.attendances.data){
            let data:any[] = [];
            props.attendances.data.forEach(date=>{
                data.push({
                    name : moment(date.date).format('MM/DD'),
                    y : date.rate
                });
            });
            let _options = { ...initialOptions };
            _options.series[0].data = data;
            setOptions(_options);   
        }
    },[props.attendances]);

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
        width:'100%',
        // overflowX:'auto',
    }
}

export default AttendanceByDay;