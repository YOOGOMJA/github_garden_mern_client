import React, { useState, useEffect } from 'react';
import { RepositoryWithUser, RepositoryLanguage } from '../../../api/interfaces/Repository';
import * as GithubLib from '../../../lib/github';
import { useHistory } from 'react-router';
const LanguageColors = require("language-colors");
interface ContributedRepoItemProps {
    data: RepositoryWithUser
};

const ContributedRepoItem = (props: ContributedRepoItemProps) => {
    const [repoName, setRepoName] = useState("");
    const [repoOwner, setRepoOwner] = useState("");
    const [numOfLanguages, setNumOfLanguages] = useState(0);
    const history = useHistory();
    useEffect(() => {
        const splited_repo_name = props.data.name.split("/");
        setRepoOwner(splited_repo_name[0] + "/");
        setRepoName(splited_repo_name[1]);
        let _counts = 0;
        props.data.languages.forEach(item => {
            _counts += item.rate;
        });
        setNumOfLanguages(_counts);
    }, [props.data]);

    const ui = {
        lanColorStyle: (name: string) => {
            let current_rgb = LanguageColors[name.toLowerCase()];
            if (name.toLowerCase() === "c++") { current_rgb = LanguageColors['cpp']; }
            if (current_rgb) {
                return { backgroundColor: current_rgb };
            }
            else { return {} }
        },
        lanPercentage: (rate: number, count: number) => {
            const percentage = ((rate / count) * 100).toFixed(2);
            return `${percentage}%`;
        },
        lanPercentageBar: (languages: [RepositoryLanguage], count: number) => {
            let gradient_items: any = [];
            let counts = 0;
            let current_percentage = languages.length <= 1 ? 100 : 0;
            languages.forEach(item => { counts += item.rate });

            languages.forEach(item => {
                if(item.name.toLowerCase() === "c++"){ item.name = "cpp"; }
                let _color = LanguageColors[item.name.toLowerCase()];
                if (!_color) { _color = [92, 102, 128]; }
                else { _color = LanguageColors[item.name.toLocaleLowerCase()].color; }
                gradient_items.push(
                    `rgba(${_color[0]},${_color[1]},${_color[2]},1) ${current_percentage}%`
                );
                current_percentage += ((item.rate / counts) * 100);
            });

            // 없으면 오류
            if (gradient_items.length === 1) {
                gradient_items.push(
                    gradient_items[0]
                );
            }

            let _style: any = {
                background: `linear-gradient(90deg , ${gradient_items.join(",")})`
            }

            return (
                <div className="languages-percentage-bar" style={_style}></div>
            );
        },
        lanPercentageBarStack: (languages: [RepositoryLanguage], count: number) => {
            return (
                <div className="languages-percentage-bar" >
                    {languages.map(item => {
                        const _styles : any = {
                            width : ui.lanPercentage(item.rate, count),
                            ...ui.lanColorStyle(item.name),
                        }
                        return <span key={item.name} className="language-percentage" style={_styles}></span>
                    })}
                </div>
            )
        }
    }

    const fn = {
        move: (name:String)=>{
            history.push(
                `/users/${name}`
            )
        }
    }

    return (
        <div className="repo-item">
            <div className="header">
                <p className="sub-title">{repoOwner}</p>
                <a className="title" href={`https://github.com/${props.data.name}`} target="_blank" rel="noopener noreferrer">{repoName}</a>
                <div className="languages">
                    {
                        props.data.languages.map((item, key) => {
                            return (<div key={key} className="language">
                                <span className="color" style={{ ...ui.lanColorStyle(item.name) }}></span>
                                <p className="name">{item.name}</p>
                                <p className="percentage">{ui.lanPercentage(item.rate, numOfLanguages)}</p>
                            </div>);
                        })
                    }
                </div>
                {
                    ui.lanPercentageBar(props.data.languages, numOfLanguages)
                }
            </div>
            <div className="content">
                <h3 className="title">참여한 정원사들</h3>
                <div className="users">

                    {
                        props.data.contributor.map(item => {
                            return (
                                <div key={item.login.toString()} className="user" onClick={()=>fn.move(item.login)}>
                                    <div className="avatar">
                                        <img src={GithubLib.getAvatarURL(item, 100)} alt="깃허브 이미지" />
                                    </div>
                                    <p className="name">
                                        {GithubLib.getUserName(item.login, item.name)}
                                    </p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default ContributedRepoItem;