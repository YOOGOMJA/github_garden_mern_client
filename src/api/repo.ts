import axios from 'axios';
import GitFarmResponseInterface from './interfaces/GitFarmResponse';
import { RepositoryWithUser, RepositoryWithoutUser, RepositoryDetailWithUser, RepositoryDetailWithoutUser } from './interfaces/Repository';
import { getUrl } from './tools/host';

export async function getRepositoriesByUser(user_name:string){
    const res = await axios.get<RepositoriesByUserResponse>(
        getUrl(`api/repos/users/${user_name}`)
    );
    return res.data;
}

export interface RepositoriesByUserResponse extends GitFarmResponseInterface{
    data : [ RepositoryWithUser ]
}