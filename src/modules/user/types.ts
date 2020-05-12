import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { UserInfo } from "../../api/user";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
    user : {
        loading : boolean,
        error : Error | null,
        data : UserInfo | null,
    }
};