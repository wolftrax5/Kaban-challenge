import React, { useState } from "react";
import "./index.css";

import { getTasksByStage, STAGES_NAMES } from "../../utils/tasks";
import { Task } from '../Task'
import { TaskList } from '../TaskList'
const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
    { name: "task", stage: 0 },
  ]);
  // new task name
  const [taskName, setTaskName] = useState("");

  const handlerInputName = (e) => {
    setTaskName(e.target.value);
    setError("");
  };
  const [error, setError] = useState("");
  // Add task to Array
  const handlerNewTask = (name) => {
    if (!name.trim()) {
      setError("Pls Type the name of Taks");
      return;
    }

    if (tasks.some((task) => task.name === name)) {
      setError("That task already exists");
      return;
    }
    setTasks((state) => [{ name, stage: 0 }, ...state]);
    setTaskName("");
    setError("");
  };
  // mode task up
  const handleNextStage = (name, direction) => {
    let taskindex = tasks.findIndex((task) => {
      return task.name === name;
    });
    if (taskindex < 0) {
      return;
    }
    let task = tasks[taskindex];
    const newStageIndex =
      direction === "left" ? task.stage - 1 : task.stage + 1;
    if (newStageIndex >= STAGES_NAMES.length || newStageIndex < 0) {
      return;
    }
    setTasks((state) => [
      ...tasks.slice(0, taskindex),
      { ...task, stage: newStageIndex },
      ...tasks.slice(taskindex + 1),
    ]);
  };
  // Remove Task
  const handlerRemoveTask = (name) => {
    let newTasks = tasks.filter((task) => task.name !== name);
    setTasks((state) => [...newTasks]);
  };

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
            data-testid="create-task-input"
          />
          <span className="input_error">{error}</span>
        </div>
        <button
          disabled={!taskName.trim()}
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={() => handlerNewTask(taskName)}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <TaskList name={STAGES_NAMES[i]} key={i} index={i}>
                  {tasks.map((task, index) => {
                    return (
                      <Task 
                        task={task} 
                        key={`${i}${index}`}
                        onArrowClick={handleNextStage} 
                        onDeleteClick={handlerRemoveTask}
                      />
                    );
                  })}
            </TaskList>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
