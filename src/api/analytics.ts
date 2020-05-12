import axios from 'axios';
import GitFarmResponseInterface from './interfaces/GitFarmResponse';
import UserInfoInterface  from './interfaces/UserInfo';

const REACT_API_HOST = "http://localhost:4000";

export async function getSummary(){
    const res = await axios.get<Summary>(
        `${REACT_API_HOST}/api/analysis/summary`
    );
    return res.data;
}

export async function getAllAttendances(){
    const res = await axios.get<AllAttendances>(
        `${REACT_API_HOST}/api/analysis/attendances`
    );
    return res.data;
}

export async function getLanguagesPopularity(){
    const res = await axios.get<Languages>(
        `${REACT_API_HOST}/api/analysis/languages`
    );
    return res.data;
}

interface SummaryInterface{
    // 현재 저장된 저장소 수 
    repo_cnt: Number,
    // 사용자 수 
    user_cnt: Number,
    // 모든 커밋의 갯수 
    commit_cnt : Number,
    // 현재까지 진행된 일자 
    challenge_duration : Number,
}

interface AllAttendancesInterface{
    // 사용자의 정보 
    info : UserInfoInterface,
    // 모든 참여 횟수 
    attendances_count : Number,
    // 참여율
    attendances_rate: Number,
    // 일자별 참여 정보 
    attendances: {[date: string]: Number},
}

interface LanguagePopularityInterface{
    _id: { language_name : string },
    rate : Number,
    rate_percentage: Number,
}

export interface Summary extends GitFarmResponseInterface{
    data: SummaryInterface
}

export interface AllAttendances extends GitFarmResponseInterface{
    data: [AllAttendancesInterface]
}

export interface Languages extends GitFarmResponseInterface{
    data: [LanguagePopularityInterface]
}