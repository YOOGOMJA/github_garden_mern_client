import UserInfoInterface from '../api/interfaces/UserInfo';

export const config = {
    avatar : {
        size : 150,
    },
    url : {
        LINK : "LINK",
        EMAIL : "EMAIL",
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

export const getURL = (url : string, type?:string)=>{
    type = type || config.url.LINK;
    let result = "";
    switch(type){
        case config.url.LINK:
            if(url.toLowerCase().indexOf("://") < 0){
                // 프로토콜 형태가 존재하지 않는 경우
                result = "http://" + url;
            }
            else{ result = url; }
            break;
        case config.url.EMAIL:
            result = "mailto://" + url
            break;
        default: 
            result = url;
            break;
    }
    return result;
}

export const getUserName = (login : string | String, name: string | String | undefined)=>{
    if(name && name.trim() !== ""){
        return name;
    }
    else{
        return login;
    }
}