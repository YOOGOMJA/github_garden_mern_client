import React, { CSSProperties, useState, useEffect } from 'react';
import moment from 'moment';
import './animations.scss';
import { Card } from '../../../components';
import Colors from '../../../components/Colors.json';
import { AllAttendances } from '../../../api/analytics';

interface AllAttendanceChartProps {
    attendances: AllAttendances | null,
}

const AllAttendanceChart = (props: AllAttendanceChartProps) => {
    let initialDates: moment.Moment[] = [];
    const [displayDates, setDisplayDates] = useState(initialDates);

    useEffect(() => {
        if(props.attendances && props.attendances != null && props.attendances.data.length > 0 ){
            let newDates: moment.Moment[] = [];
            Object.keys(props.attendances.data[0].attendances).forEach(key=>{
                newDates.push(moment(key));
            });
            setDisplayDates(newDates);
        }
    }, [props.attendances]);

    const getDateFormat = (date:moment.Moment)=>{
        return date.format("MM/DD");
    }

    const getRank = (rank:number)=>{
        if(rank === 1){ return '🏅'; }
        else if(rank === 2){ return '🥈'; }
        else if(rank === 3){ return '🥉'; }
        else { return rank; }
    }
    
    return (<Card title="출석부" desc="오늘까지 진행된 모든 진행상황을 봅니다">
        <div style={styles.container}>
            <div style={styles.headerWrapper}>
                <table style={styles.headerTable}>
                    <thead>
                        <tr >
                            <th style={{ ...styles.headerTitleEssential, width: '50px' }}>순위</th>
                            <th style={{ ...styles.headerTitleEssential, width: '200px' }}>정원사</th>
                            <th style={{ ...styles.headerTitleEssential, width: '100px' }}>출석률</th>
                            {
                                displayDates.map((item, idx) => {
                                    if (moment.isMoment(item)) {
                                        return <th key={idx.toString()} style={styles.headerTitle}>{getDateFormat(item)}</th>
                                    }
                                    else { return <></>; }
                                })
                            }
                        </tr>
                    </thead>
                </table>
            </div>
            <div style={styles.contentWrapper}>
                <table className="attendenceChartBody" style={styles.headerTable}>
                    <tbody>
                        {
                            props.attendances ? props.attendances.data.map((attendance, idx) =>{    
                                return (
                                    <tr key={attendance.info.id.toString()}>
                                        <td style={{ ...styles.column, ...styles.columnEssential, width: '50px' }}>{getRank(idx + 1)}</td>
                                        <td style={{ ...styles.column, ...styles.columnEssential, width: '200px' }}>{attendance.info.name !== null ? attendance.info.name : attendance.info.login}</td>
                                        <td style={{ ...styles.column, ...styles.columnEssential, width: '100px' }}>{attendance.attendances_rate.toFixed(2) + "%"}</td>
                                        {
                                            Object.keys(attendance.attendances).map(key=>{
                                                return <td style={styles.column} key={key}>{ attendance.attendances[key] > 0 ? '⭐️' : '-' }</td>
                                            })
                                        }
                                    </tr>
                                );
                            }) : <></>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </Card>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

        overflowX: 'auto',
        width: '100%',
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom:'10px',
    },
    headerWrapper: {
        width: 'fit-content',
    },
    headerTable: {
        width: 'max-content',
        borderCollapse: 'collapse',
        border: '1px solid' + Colors.table.border,
    },
    headerTitleEssential: {
        width: '100px',
        fontWeight: 800,
        color: '#fff',
        border: '1px solid' + Colors.table.border,
    },
    headerTitle: {
        width: '50px',
        fontWeight: 400,
        color: '#fff',
        border: '1px solid' + Colors.table.border,
    },
    contentWrapper: {
        marginBottom: '20px',
        width: 'fit-content',
    },
    column: {
        width: '50px',
        fontWeight: 400,
        color: '#fff',
        border: '1px solid' + Colors.table.border,
        textAlign: 'center',
    }
};

export default AllAttendanceChart;