import React from 'react';

const index = () => {
    return (
        <>
            {/* 현재 상황 */}
            <div className="jumbotron">
                {/* 진행중인 정원사 일정 수 */}
                <div className="jumbotron-item projects">
                    <p className="title">등록된 프로젝트💻</p>
                    {/* <MdDateRange/> */}
                    <div className="jumbotron-item-body">
                        <p className="count">2</p>
                        <p className="desc">건</p>
                    </div>

                </div>
                {/* 참여중인 정원사 수 */}
                <div className="jumbotron-item participants">
                    <p className="title">참여중인 정원사👩‍💻</p>
                    <div className="jumbotron-item-body">
                        <p className="count">21</p>
                        <p className="desc">명</p>
                    </div>
                </div>
                {/* 모든 커밋 수 */}
                <div className="jumbotron-item commits">
                    <p className="title">현재까지 기록된 커밋🌱</p>
                    <div className="jumbotron-item-body">
                        <p className="count">1,212</p>
                        <p className="desc">건</p>
                    </div>
                </div>
                {/* 모든 진행일수 */}
                <div className="jumbotron-item period">
                    <p className="title">다 같이 도전한 기간🌈</p>
                    <div className="jumbotron-item-body">
                        <p className="count">32</p>
                        <p className="desc">일</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;