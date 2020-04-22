import React, { CSSProperties } from 'react';
import moment from 'moment';
import './animations.scss';
import { Card } from '../../../components';
import Colors from '../../../components/Colors.json';

const index = () => {
    let people = [];
    let dates: moment.Moment[] | undefined = [];
    const currentDate = moment();

    for (var i = 1; i <= 14; i++) {
        dates.push(currentDate.clone().add('days', i));
        people.push({ name: 'person' + i, rank: i, attendence: i + 50 + "%" })
    }
    console.log(dates);
    return (<Card title="출석부" desc="오늘까지 진행된 모든 진행상황을 봅니다">
        <div style={styles.container}>
            <div style={styles.headerWrapper}>
                <table style={styles.headerTable}>
                    <tr >
                        <th style={{ ...styles.headerTitleEssential, width: '50px' }}>순위</th>
                        <th style={{ ...styles.headerTitleEssential, width: '100px' }}>정원사</th>
                        <th style={{ ...styles.headerTitleEssential, width: '50px' }}>출석률</th>
                        {
                            dates.map(item => {
                                return <th style={styles.headerTitle}>{item.format('MM/DD')}</th>
                            })
                        }
                    </tr>
                </table>
            </div>
            <div style={styles.contentWrapper}>
                <table className="attendenceChartBody" style={styles.headerTable}>
                    {
                        people.map((person, idx) => {
                            return (
                                <tr key={idx}>
                                    <td style={{ ...styles.column, ...styles.columnEssential, width: '50px' }}>{person.rank}</td>
                                    <td style={{ ...styles.column, ...styles.columnEssential, width: '100px' }}>{person.name}</td>
                                    <td style={{ ...styles.column, ...styles.columnEssential, width: '50px' }}>{person.attendence}</td>
                                    {
                                        dates !== undefined ? dates.map((item, idx2) => {
                                            return <td style={styles.column} key={idx2}>O</td>
                                        }) : ""
                                    }
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    </Card>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {

        display:'flex',
        alignItems:'center',
        flexDirection:'column',

        overflowX: 'auto',
        width: '100%',
        maxHeight: '500px',
        overflowY: 'hidden',
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
        height: '300px',
        width: 'max-content',
        overflowY: 'auto',
        overflowX:'hidden',
    },
    column: {
        width: '50px',
        fontWeight: 400,
        color: '#fff',
        border: '1px solid' + Colors.table.border,
        textAlign:'center',
    }
};

export default index;