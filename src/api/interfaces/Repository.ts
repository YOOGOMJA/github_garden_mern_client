import UserInfo from './UserInfo';

export interface RepositoryWithoutUser{
    contributor: [string],
    id : string,
    name: string,
    languages: [RepositoryLanguage],
    created_at: string,
    description : string,
    forks_count : number,
    hompage : string | null,
    license : Object | null,
    stargazers_count : number,
    watchers_count: number,
}

export interface RepositoryLanguage {
    name : string,
    rate : number,
}

export interface RepositoryWithUser{ 
    contributor: [ UserInfo ],
    id: string,
    name : string,
    languages: [RepositoryLanguage],
    created_at: string,
    description : string,
    forks_count : number,
    hompage : string | null,
    license : Object | null,
    stargazers_count : number,
    watchers_count: number,
}

export interface RepositoryDetailWithoutUser {
    commit_cnt : number,
    repo : RepositoryWithoutUser
}

export interface RepositoryDetailWithUser{
    commit_cnt : number,
    repo : RepositoryWithUser,
}