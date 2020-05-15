import axios from 'axios';
import GitFarmResponseInterface from './interfaces/GitFarmResponse';
import ChallengeInterface, { ChallengeUpdateInterface } from './interfaces/Challenge';

const REACT_API_HOST = 'http://localhost:4000';

// 여태 개설된 모든 도전 종류
export async function getAllChallenges(){
    const res = await axios.get<AllChallengesResponse>(
        // getUrl('api/challenges/')
        `${REACT_API_HOST}/api/challenges`
    );
    return res.data;
}

// 특정 사용자의 도전 결과를 가져옴 
export async function getChallengesByUser(user_name:string){
    const res = await axios.get<ChallengesByUserResponse>(
        `${REACT_API_HOST}/api/challenges/users/${user_name}`
    );
    return res.data;
}

// 가장 최근 도전을 가져옴
export async function getLatestChallenge(){
    const res = await axios.get<LatestChallengeResponse>(
        `${REACT_API_HOST}/api/challenges/latest`
    );
    return res.data;
}

// 특정 사용자를 해당 도전에 추가함
export async function postUserToChallenge(user_name:string, challenge_id:string){
    const res = await axios.post<GitFarmResponseInterface>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}/users/${user_name}`
    );
    return res.data;
}

export async function putChallenge(challenge_id: string, options:ChallengeUpdateInterface){
    const res = await axios.put<GitFarmResponseInterface>(
        `${REACT_API_HOST}/api/challenges/${challenge_id}`,
        options
    );
    return res.data;
}

export interface AllChallengesResponse extends GitFarmResponseInterface{
    data : [ChallengeInterface]
}

export interface ChallengesByUserResponse extends GitFarmResponseInterface{
    data : [ChallengeInterface]
}

export interface LatestChallengeResponse extends GitFarmResponseInterface{
    data : ChallengeInterface,
}