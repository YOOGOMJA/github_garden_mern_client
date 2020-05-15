import UserInfoInterface from '../api/interfaces/UserInfo';

export const config = {
    avatar : {
        size : 150,
    }
}
export const getAvatarURL = (user:UserInfoInterface | null | undefined, size?: number | null | undefined): string | undefined=> {
    if(user){
        if(user.avartar_url && user.avartar_url !== ""){
            return user.avartar_url.toString();
        }
        else{
            const _avatar_size = size || config.avatar.size;
            return `https://avatars1.githubusercontent.com/u/${user.id}?s=${_avatar_size * 2}`.toString();
        }
    }
    else{
        return undefined;
    }
}
