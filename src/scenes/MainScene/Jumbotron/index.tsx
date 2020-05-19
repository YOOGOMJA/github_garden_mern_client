/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Summary } from '../../../api/analytics';

interface JumbotronInterface {
    summary : Summary | null,
    loading: boolean,
    error : Error | null,
};

const Jumbotron = (props:JumbotronInterface) => {
    return (
        <>
            {/* 현재 상황 */}
            <div className="jumbotron">
                {/* 현재 진행중인 도전 내용 */}
                <div className="jumbotron-item challenges">
                    <p className="title">{props.summary?.data.current_challenge.title}<span role="img">🌱</span></p>
                    <div className="jumbotron-item-body">
                        <p className="desc">완료까지</p>
                        <p className="count">{ props.summary ? props.summary.data.current_challenge.left_days : 0 }</p>
                        <p className="desc">일</p>
                    </div>
                </div>
                {/* 진행중인 정원사 일정 수 */}
                <div className="jumbotron-item projects">
                    <p className="title">등록된 저장소💻</p>
                    {/* <MdDateRange/> */}
                    <div className="jumbotron-item-body">
                        <p className="count">{ props.summary ? props.summary.data.repo_cnt : 0 }</p>
                        <p className="desc">건</p>
                    </div>
                </div>
                {/* 참여중인 정원사 수 */}
                <div className="jumbotron-item participants">
                    <p className="title">참여중인 정원사👩‍💻</p>
                    <div className="jumbotron-item-body">
                        <p className="count">{ props.summary ? props.summary.data.user_cnt : 0 }</p>
                        <p className="desc">명</p>
                    </div>
                </div>
                {/* 모든 커밋 수 */}
                <div className="jumbotron-item commits">
                    <p className="title">현재까지 기록된 커밋🌱</p>
                    <div className="jumbotron-item-body">
                        <p className="count">{ props.summary ? props.summary.data.commit_cnt : 0 }</p>
                        <p className="desc">건</p>
                    </div>
                </div>
                {/* 모든 진행일수 */}
                <div className="jumbotron-item period">
                    <p className="title">다 같이 도전한 기간🌈</p>
                    <div className="jumbotron-item-body">
                        <p className="count">{ props.summary ? props.summary.data.challenge_duration : 0 }</p>
                        <p className="desc">일</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Jumbotron;