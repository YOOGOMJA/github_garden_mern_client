import React, { useState } from 'react';

import { MdDashboard, MdSettings, MdInfo, MdFace, MdQueue, MdMenu } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import Logo from "../Logo";
import './SideMenu.scss';
import { NavLink } from 'react-router-dom';

import project_info from '../../../package.json';

const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <>
            <div className="sidemenu">
                <button type="button" className="sidemenu-collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MdMenu />
                </button>
                <a className="logo" href="/">
                    <Logo />
                </a>
                {/* 버튼 위치 */}
                <div className={"sidemenu-wrapper " + (isCollapsed ? "" : " not-collapsed")}>
                    <ul className="menu">
                        <li >
                            <NavLink exact={true} activeClassName="active" to="/" onClick={e => { if (isCollapsed) { setIsCollapsed(false); } }}>
                                <MdDashboard />
                                <p className="nav-link-alt">대시보드</p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="active" to="/users" onClick={e => { if (isCollapsed) { setIsCollapsed(false); } }}>
                                <MdFace />
                                <p className="nav-link-alt">정원사 목록</p>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="active" to="/register" onClick={e => { if (isCollapsed) { setIsCollapsed(false); } }}>
                                <MdQueue />
                                <p className="nav-link-alt">정원사 추가</p>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="config">
                        <li>
                            <NavLink activeClassName="active" to="/info" onClick={e => { if (isCollapsed) { setIsCollapsed(false); } }}>
                                <MdInfo />
                            </NavLink>
                        </li>
                        <li>
                            <a href={project_info.repository.url} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/settings" onClick={e => { if (isCollapsed) { setIsCollapsed(false); } }}>
                                <MdSettings />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={ "sidemenu-cover" + (!isCollapsed ? " " : " active") }  onClick={ e=>setIsCollapsed(false) } ></div>
        </>
    );
}

export default SideMenu;   