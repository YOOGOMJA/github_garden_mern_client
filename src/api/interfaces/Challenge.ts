import UserInfo from './UserInfo'

export default interface ChallengeInterface{
    id : string,
    start_dt : string,
    finish_dt: string,
    title : string,
    created_at: string,
    participants: [UserInfo]
};

export interface ChallengeUpdateInterface {
    start_dt?: string,
    finish_dt?: string,
    title?: string,
}