import React, { useState } from "react";
import "./index.css";

const STAGES_NAMES= ['Backlog', 'To Do', 'Ongoing', 'Done'];

const  KanbanBoard  = () => {
  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },
  ])

  // new task name
  const [taskName, setTaskName] = useState('')

  // Add task to Array
  const handlerNewTask = (name) => {
    setTasks((state) => [{name, stage: 0} , ...state])
    setTaskName('')
  }
  // mode task up
  const handlerNextStage = (name) => {
      let taskindex = tasks.findIndex((task) => {
          return task.name === name
      })
      if(taskindex > -1){
        let task = tasks[taskindex];
        if(task.stage < 3) {
          setTasks((state) => [ ...tasks.slice(0, taskindex), {...task, stage: task.stage + 1}, ...tasks.slice(taskindex + 1)])
        }
      }
  }
  const handlerPrevStage = (name) => {
    let taskindex = tasks.findIndex((task) => {
        return task.name === name
    })
    if(taskindex > -1){
      let task = tasks[taskindex];
      if(task.stage > 0) {
        setTasks((state) => [ ...tasks.slice(0, taskindex), {...task, stage: task.stage - 1}, ...tasks.slice(taskindex + 1)])
      }
    }
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
                                        <button onClick={()=> handlerPrevStage(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button onClick={() => handlerNextStage(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
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