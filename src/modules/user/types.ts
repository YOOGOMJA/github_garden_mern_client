import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import GitFarmResponse from '../../api/interfaces/GitFarmResponse';
import { UserInfo, UsersInfo } from "../../api/user";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
    user : {
        loading : boolean,
        error : Error | null,
        data : UserInfo | null,
    },
    users: {
        loading: boolean,
        error: Error | null,
        data: UsersInfo | null,
    },
    post_user : {
        loading:boolean,
        error : Error | null,
        data: GitFarmResponse | null,
    },
    searched_users :{
        loading: boolean,
        error : Error | null,
        data : UsersInfo | null,
    },
    users_participated_latest_challenge : {
        loading : boolean,
        error : Error | null,
        data : UsersInfo | null,
    }
};
