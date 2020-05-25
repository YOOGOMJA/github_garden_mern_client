import React from 'react';
import RegistUser from './RegistUser';

import './RegisterUser.scss';

const Index = () => {
    return (<div className="register-user-container">
        <div className="register-user-header">
            <h2 className="text sub-title">안녕하세요!</h2>
            <h1 className="text title">
                <b className="text highlight">정원사 프로젝트</b>
                에 어서오세요!
            </h1>
            <p className="text desc">처음오셨나요? github 계정명을 입력해주시면 참여할 수 있습니다!</p>
           <RegistUser/> 
        </div>
    </div>);
}

export default Index;
