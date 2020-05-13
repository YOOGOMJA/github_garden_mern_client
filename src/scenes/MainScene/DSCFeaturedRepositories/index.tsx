import React, { CSSProperties, useState, useEffect } from 'react';
import { Card } from '../../../components';
import Colors from '../../../components/Colors.json';
import { FeaturedRepository } from '../../../api/analytics';

interface FeaturedRepostoryProps {
    repo: FeaturedRepository | null,
}

const FeaturedRepositoryInfo = (props: FeaturedRepostoryProps) => {
    const [owner, setOwner] = useState("");
    const [repoName, setRepoName] = useState("");
    const [languageCnt, setLanguageCnt] = useState(0);
    useEffect(() => {
        if (props.repo !== null) {
            const name = props.repo.data.repo.name.split("/");
            
            setOwner(name[0] + "/");
            setRepoName(name[1]);
            setLanguageCnt(props.repo.data.repo.languages.length);
        }
    }, [props, props.repo]);
    return (<div style={styles.container}>
        <Card title="DSC에서 진행중인 저장소" desc="현재 DSC에서 진행중인 프로젝트의 저장소입니다">
            <div style={styles.wrapper}>
                <div style={itemStyles.container}>
                    <p style={{ ...itemStyles.text, ...itemStyles.owner }}>{owner}</p>
                    <p style={{ ...itemStyles.text, ...itemStyles.title }}>{repoName}</p>
                    <div style={itemStyles.factorContainer}>
                        <div style={itemStyles.factorItemContainer}>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorTitle }}>{props.repo?.data.commit_cnt}</p>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorDesc }}>커밋</p>
                        </div>
                        <div style={itemStyles.factorItemContainer}>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorTitle }}>{props.repo?.data.repo.contributor.length}</p>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorDesc }}>참여자</p>
                        </div>
                        <div style={itemStyles.factorItemContainer}>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorTitle }}>{languageCnt}</p>
                            <p style={{ ...itemStyles.text, ...itemStyles.factorDesc }}>사용된 언어</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        // height:'100%',
    },
    wrapper: {
        // marginTop: '1em',
    }
}

const itemStyles: { [name: string]: CSSProperties } = {
    text: {
        margin: 0,
        padding: 0,
        color: '#fff',
    },
    title: {
        fontSize: '1.3em',
        fontWeight: 600,
    },
    desc: {
        fontSize: '.9em',
    },
    owner: {
        fontSize: '.7em',
    },
    container: {
        backgroundColor: Colors.blue,
        minHeight: '100px',
        borderRadius: '10px',
        padding: '12px 25px',
        // width:'30%',
        marginBottom: '20px',
        boxShadow: "2px 2px 3px 0px" + Colors.shadow,
    },
    factorContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    factorItemContainer: {
        flex: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    factorTitle: {
        fontWeight: 800,
        fontSize: '2.5em',
    },
    factorDesc: {
        fontSize: '.8em',
    }
}

export default FeaturedRepositoryInfo;