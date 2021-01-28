import React from 'react';

export const Task = ({task, arrowClick, deleteClick}) => {
    return (
        <li className="slide-up-fade-in" >
            <div className="li-content layout-row justify-content-between align-items-center">
                <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                <div className="icons">
                <button disabled={task.stage === 0} onClick={()=> arrowClick(task.name, 'left')} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                    <i className="material-icons">arrow_back</i>
                </button>
                <button disabled={task.stage === 3} onClick={() => arrowClick(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                    <i className="material-icons">arrow_forward</i>
                </button>
                <button onClick={()=> deleteClick(task.name)} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                    <i className="material-icons">delete</i>
                </button>
                </div>
            </div>
        </li>
    )
}
