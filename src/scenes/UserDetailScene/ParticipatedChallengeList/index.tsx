import React from 'react';
import ParticipatedChallengeItem from './ParticipatedChallengeItem';
import ChallengeInterface from '../../../api/interfaces/Challenge';
interface ParticipatedChallengeListPropsInterface 
{
    user_challenges?: [ChallengeInterface],
}

const ParticipatedChallengeList = (props:ParticipatedChallengeListPropsInterface) => {

    if(props.user_challenges){
        return (<div className="card-list">
            {
                props.user_challenges.map((item, key)=>{
                    return <ParticipatedChallengeItem key={ key } data={ item }/>
                
                })
            }
        </div>);
    }
    else{
        return (
            <></>
        );
    }
}

export default ParticipatedChallengeList;