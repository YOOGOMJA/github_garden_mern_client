/* eslint-disable react-hooks/exhaustive-deps */
import React, { CSSProperties, useEffect, useState } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AllAttendances } from '../../../api/analytics';

import { HighChartsTheme_Dark } from '../../../components/HighChartsTheme';

interface AttendanceRatesRankProps {
    attendances: AllAttendances | null,
}

const AttendanceRatesRank = (props: AttendanceRatesRankProps) => {
    const initialOptions: any = {
        ...HighChartsTheme_Dark,
        yAxis : {
            ...HighChartsTheme_Dark.yAxis,
            max : 100,
        },
        series: [
            {
                name: "정원사 별 출석률",
                colorByPoint: true,
                tooltip: { pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:.2f}%</b><br/>' },
                data: []
            },
        ]
    };

    const [chartOptions, setChartOptions] = useState(initialOptions);

    useEffect(() => {
        if (props.attendances && props.attendances.data) {
            let rates: any = [];
            let all_rates = 0;
            let count = 0;
            if (props.attendances.data.length > 10) { props.attendances.data.slice(0, 9); }
            props.attendances.data.forEach(attendance => {
                rates.push({
                    name: attendance.info.name !== null ? attendance.info.name : attendance.info.login,
                    y: attendance.attendances_rate
                });
                all_rates += parseFloat(attendance.attendances_rate.toString());
                count += 1;
            });
            all_rates = all_rates / count;
            const options = { ...initialOptions };
            options.series[0].data = rates;
            options.series.push({
                name: '전체 평균',
                type: 'line',
                tooltip: { headerFormat: '', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y:.2f}%</b><br/>' },
                data: (() => {
                    let array = [];
                    for (let i = 0; i < count; i++) {
                        array.push({ y: all_rates })
                    }
                    return array;
                })()
            });
            setChartOptions(options);
            // setChartOptions(HighChartsTheme_Dark);
        }
        else {
            setChartOptions(initialOptions);
            // setChartOptions(HighChartsTheme_Dark);
        }

        return () => {
            setChartOptions(initialOptions);
        }
    }, [props.attendances]);

    return (<div style={styles.container}>
        <Card title="정원사 참여율" desc="높은 참여율을 보이는 정원사분들입니다">
            {/* CARD BODY */}
            <div style={styles.wrapper}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </Card>
    </div>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        height: '100%',
    },
    wrapper: {
        marginTop: '2em',
        // overflowX:'auto',
    }
}

export default AttendanceRatesRank;