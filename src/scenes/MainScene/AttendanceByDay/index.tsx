/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useState, useEffect } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AllAttendancesByDates } from '../../../api/analytics';
import moment from 'moment';

interface AttendanceByDayProps {
    attendances : AllAttendancesByDates| null,
}

const AttendanceByDay = (props:AttendanceByDayProps)=>{
    const initialOptions:any = {
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
                data:[]
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
    }
}

export default AttendanceByDay;