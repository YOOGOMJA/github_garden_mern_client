import React from 'react';

import './ContributedReposList.scss';
import { RepositoriesByUserResponse } from '../../../api/repo';
import ContributedRepoItem from './ContributedRepoItem';

interface ContributedReposListProps {
    data : RepositoriesByUserResponse | null
}

const ContributedReposList = (props : ContributedReposListProps)=>{
    return (<div className="contributed-repos-container">
        <div className="repos">
            {
                props.data?.data.map((item, index)=>{
                    return <ContributedRepoItem key={item.name} data={ item } />
                })
            }
        </div>
    </div>);
}

export default ContributedReposList;