import React from 'react';

import { MdDashboard, MdSettings, MdInfo, MdFace,MdQueue } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import Logo from "../Logo";
import './SideMenu.scss';
import { NavLink } from 'react-router-dom';

import project_info from '../../../package.json';

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
                    <NavLink activeClassName="active" to="/info">
                        <MdInfo />
                    </NavLink>
                </li>
                <li>
                    <a href={ project_info.repository.url } target="_blank" rel="noopener noreferrer"><FaGithub /></a>
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

export default index;   