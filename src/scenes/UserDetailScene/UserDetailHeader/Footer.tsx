import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../../modules';
import * as UserAPI from '../../../api/user';
import { clearUserInfoThunk, getUsersInfoThunk, getUserInfoThunk } from '../../../modules/user';

import { MdDeleteForever, MdRefresh } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';

const UserDetailFooter = () => {
    const { data } = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [fetchLoading, setFetchLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const fn = {
        delete: async () => {
            if(deleteLoading){ window.alert("삭제 중입니다"); return; }
            if(fetchLoading){ window.alert("데이터 갱신 중입니다"); return; }
            if (window.confirm("모든 활동 내역이 삭제됩니다. 정말로 모두 삭제할까요?")) {
                if (data && data.data) {
                    setDeleteLoading(true);
                    const result = await UserAPI.deleteUser(data.data.login.toString());
                    setDeleteLoading(false);
                    if (result.code > 0) {
                        dispatch(clearUserInfoThunk());
                        dispatch(getUsersInfoThunk());
                        history.push("/users");
                    }
                    else {
                        window.alert("오류가 발생했습니다.");
                    }
                }
            }
        },
        fetch: async () => {
            if(fetchLoading){ window.alert("불러오는 중입니다"); return; }
            if(deleteLoading){ window.alert("삭제 처리 중입니다"); return; }
            if (window.confirm("사용자님의 정보를 갱신할까요?")) {
                if (data && data.data) {
                    
                    setFetchLoading(true);
                    const result = await UserAPI.fetchUserInfo(data.data.login.toString());
                    setFetchLoading(false);
                    if (result.code > 0) {
                        dispatch(getUserInfoThunk(data.data.login.toString()));
                    }
                }
            }
        }
    }
    // 가져오기 
    return (<div className="header-content-footer">
        <button type="button" className="btn fetch" onClick={fn.fetch} >
            {
                !fetchLoading ?
                    <> <MdRefresh /> <p>사용자 정보 갱신</p></> :
                    <> <AiOutlineLoading className="indicator" /></>
            }
        </button>
        <button type="button" className="btn remove" onClick={fn.delete} >
            {
                !deleteLoading ?
                    <><MdDeleteForever /> <p>사용자 삭제</p> </> :
                    <> <AiOutlineLoading className="indicator" /></>
            }
        </button>
    </div>);
}

export default UserDetailFooter;
