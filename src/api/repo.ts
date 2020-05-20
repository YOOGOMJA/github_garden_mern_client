import axios from 'axios';
import GitFarmResponseInterface from './interfaces/GitFarmResponse';
import { RepositoryWithUser } from './interfaces/Repository';

const REACT_API_HOST = process.env.REACT_APP_API_HOST;

export async function getRepositoriesByUser(user_name:string){
    const res = await axios.get<RepositoriesByUserResponse>(
        `${REACT_API_HOST}/api/repos/users/${user_name}`
    );
    return res.data;
}

export interface RepositoriesByUserResponse extends GitFarmResponseInterface{
    data : [ RepositoryWithUser ]
}