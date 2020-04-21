import React from 'react';

import { MdDashboard, MdSettings, MdInfo, MdFace,MdQueue } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import Logo from "../../../components/Logo";
import './SideMenu.scss';

const index = () => {
    return (
        <div className="sidemenu">
            <a className="logo" href="/">
                <Logo width={ 45 } height={45}/>
            </a>
            {/* 버튼 위치 */}
            <ul className="menu">
                <li >
                    <a className="active" href="#1">
                        <MdDashboard />
                    </a>
                </li>

                <li>
                    <a  href="#1">
                        <MdFace />
                    </a>
                </li>

                <li>
                    <a  href="#1">
                        <MdQueue />
                    </a>
                </li>
            </ul>
            <ul className="config">
                <li>
                    <a href="#info"><MdInfo/></a>
                </li>
                <li>
                    <a href="https://github.com/yoogomja/git-farm-mern"><FaGithub /></a>
                </li>
                <li>
                    <a href="#setting" ><MdSettings /></a>
                </li>
            </ul>
        </div>
    );
}

const styles: { [name: string]: React.CSSProperties } = {

}

export default index;   