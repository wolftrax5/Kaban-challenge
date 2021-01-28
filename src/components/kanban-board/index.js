import React, { useState } from "react";
import "./index.css";

const STAGES_NAMES= ['Backlog', 'To Do', 'Ongoing', 'Done'];

const  KanbanBoard  = () => {
  const [tasks, setTask] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },
  ])

  // Add task to Array
  const handlerNewTask = (name) => {
    setTask((state) => [{name, stage: 0} , ...state]) 
  }
  // new task name
  const [taskName, setTaskName] = useState('')
  // mode task up
  const handlerForwardTask = (e) => {
  }
  // set tasks no every Stage
  let stagesTasks = [];
    
  for (let i = 0; i < STAGES_NAMES.length; ++i) {
    stagesTasks.push([]);
  }
  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }
  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        
        <input 
        id="create-task-input" 
        onChange={(e)=> setTaskName(e.target.value)}
        value={taskName}
        type="text" 
        className="large" 
        placeholder="New task name" 
        data-testid="create-task-input"/>

        <button type="submit" className="ml-30" data-testid="create-task-button" 
        onClick={() => handlerNewTask(taskName)}>Create task</button>
      </section>

      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{STAGES_NAMES[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <div className="li-content layout-row justify-content-between align-items-center">
                                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                      <div className="icons">
                                        <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button onClick={handlerForwardTask} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                        <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                          <i className="material-icons">delete</i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );

}

export default KanbanBoard