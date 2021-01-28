import React, { useState } from "react";
import "./index.css";
import {getTasksByStage, STAGES_NAMES} from '../../utils/tasks'


const  KanbanBoard  = () => {
  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 },
    { name: '2', stage: 0 },
  ])
  // new task name
  const [taskName, setTaskName] = useState('')

  const handlerInputName = (e) => {
    setTaskName(e.target.value)
    setError('')
  }
  const [error, setError] = useState('')
  // Add task to Array
  const handlerNewTask = (name) => {
    if(!name.trim()){
      setError('Pls Type the name of Taks')
      return
    }

    if(tasks.some(task =>task.name === name)){
      setError('That task already exists')
      return
    }
    setTasks((state) => [{name, stage: 0} , ...state])
    setTaskName('')
    setError('')
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
  // Remove Task
  const handlerRemoveTask = (name) => {
    let newTasks = tasks.filter((task) => task.name !== name)
    setTasks((state) => [...newTasks])
  }

  let stagesTasks = getTasksByStage(tasks);

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <div>
          <input 
          id="create-task-input" 
          onChange={handlerInputName}
          value={taskName}
          type="text" 
          className="large" 
          placeholder="New task name" 
          data-testid="create-task-input"/>
          <span className='input_error'>{error}</span>
        </div>
        <button 
        disabled={!taskName.trim()}
        type="submit" 
        className="ml-30" 
        data-testid="create-task-button" 
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
                                        <button disabled={task.stage === 0} onClick={()=> handlerPrevStage(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button disabled={task.stage === 3} onClick={() => handlerNextStage(task.name)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                        <button onClick={()=> handlerRemoveTask(task.name)} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
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