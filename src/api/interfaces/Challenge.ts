import UserInfo from './UserInfo'

export default interface ChallengeInterface{
    id : string,
    start_dt : string,
    finish_dt: string,
    title : string,
    created_at: string,
    is_featured: Boolean,
    participants: [UserInfo]
};

export interface ChallengeUpdateInterface {
    start_dt?: Date,
    finish_dt?: Date,
    title?: string,
}