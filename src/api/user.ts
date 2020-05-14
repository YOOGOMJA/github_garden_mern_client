import axios from "axios";
import GitFarmResponseInterface from "./interfaces/GitFarmResponse";
import UserInfoInterface from './interfaces/UserInfo';
import { RepositoryWithUser } from "./interfaces/Repository";
import ChallengeInterface from "./interfaces/Challenge";
// const REACT_API_HOST = process.env.REACT_API_HOST || 'localhost:4000';
const REACT_API_HOST = 'http://localhost:4000';

export async function getUserInfo(user_name: string) {
    const response = await axios.get<UserInfo>(
        `${REACT_API_HOST}/api/users/${user_name}`
    );
    return response.data;
}

export async function getUsersInfo() {
    const response = await axios.get<UsersInfo>(`${REACT_API_HOST}/api/users`);
    return response.data;
}

export async function postUserInfo(user_name: string){
    const response = await axios.post<GitFarmResponseInterface>(
        `${REACT_API_HOST}/api/users/${user_name}`
    );
    return response.data;
}

export async function getUsersSearch(user_name:string){
    const reponse = await axios.get<UsersInfo>(
        `${REACT_API_HOST}/api/users/search`,
        {
            params: {
                user_name : user_name.trim()
            }
        }
    );
    return reponse.data;
}

export interface UsersInfo extends GitFarmResponseInterface{
    data: [UserInfoInterface]
}

export interface UserInfo extends GitFarmResponseInterface{
    data: UserInfoInterface
}
