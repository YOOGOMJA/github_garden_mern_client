import UserInfo from './UserInfo';

export interface RepositoryWithoutUser{
    contributor: [string],
    id : string,
    name: string,
    languages: [RepositoryLanguage]
}

export interface RepositoryLanguage {
    name : string,
    rate : number,
}

export interface RepositoryWithUser{ 
    contributor: [ UserInfo ],
    id: string,
    name : string,
    languages: [RepositoryLanguage]
}

export interface RepositoryDetailWithoutUser {
    commit_cnt : number,
    repo : RepositoryWithoutUser
}

export interface RepositoryDetailWithUser{
    commit_cnt : number,
    repo : RepositoryWithUser,
}