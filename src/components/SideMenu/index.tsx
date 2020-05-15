import React from 'react';

import { MdDashboard, MdSettings, MdInfo, MdFace,MdQueue } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import Logo from "../Logo";
import './SideMenu.scss';
import { NavLink } from 'react-router-dom';

const index = () => {
    return (
        <div className="sidemenu">
            <a className="logo" href="/">
                <Logo width={ 45 } height={45}/>
            </a>
            {/* 버튼 위치 */}
            <ul className="menu">
                <li >
                    <NavLink exact={true} activeClassName="active" to="/">
                        <MdDashboard />
                    </NavLink>
                </li>

                <li>
                    <NavLink activeClassName="active" to="/users">
                        <MdFace />
                    </NavLink>
                </li>

                <li>
                    <NavLink activeClassName="active" to="/register">
                        <MdQueue />
                    </NavLink>
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
                    <NavLink activeClassName="active" to="/settings">
                        <MdSettings />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

const styles: { [name: string]: React.CSSProperties } = {

}

export default index;   