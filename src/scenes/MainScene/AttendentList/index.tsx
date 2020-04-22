import React, { CSSProperties } from 'react';
import { Card } from '../../../components';

const index = () => {
    return (
        <Card title="참여중인 정원사들" desc="현재 정원사 프로젝트에 참여중인 정원사분들입니다">
            {/* 전체 감싸기 */}
            <div style={styles.wrapper}>
                {
                    (() => {
                        let arr = [];
                        for (let i = 0; i < 10; i++) {
                            arr.push(i);
                        }
                        return arr.map(() => {
                            return (<div style={styles.itemContainer}>
                                <div style={styles.iconWrapper}>
                                    {/* 아이콘 */}
                                </div>
                                <div style={styles.descWrapper}>
                                    {/* 설명부 */}
                                    <p style={styles.username}>KyeongSoo Yoo</p>
                                    <p style={styles.displayName}>YOOGOMJA</p>
                                </div>
                                <div style={styles.linkWrapper}>
                                    <a style={styles.link} href="#">보기</a>
                                </div>

                            </div>)
                        })
                    })()
                }
            </div>
        </Card>
    );
}

const styles: { [name: string]: CSSProperties } = {
    wrapper: {
        maxHeight: '440px',
        overflowY: 'auto',
        marginBottom:'20px',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '15px',
        borderBottom: '1px solid rgba(0,0,0,.1)',
        paddingBottom: '15px',
    },
    iconWrapper: {
        backgroundColor: '#ddd',
        flex: 1,

    },
    username: {
        fontSize: '1.3em',
        margin: 0,
        padding: 0,
        color: "#fff",
    },
    displayName: {
        fontSize: '.8em',
        margin: 0,
        padding: 0,
        color: "#fff",
    },
    descWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10px',
        flex: 3,
    },
    linkWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    link: {
        textDecoration: 'none',
        fontSize: '.9em',
        color: 'white',
        padding: '5px 15px',
        backgroundColor: '#27ae60',
        height: 'fit-content',
        borderRadius: '5px',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
    }
}

export default index;