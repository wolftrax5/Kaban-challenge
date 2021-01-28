export const STAGES_NAMES= ['Backlog', 'To Do', 'Ongoing', 'Done'];

export const getTasksByStage = (tasks) => {
 // set tasks no every Stage
 let stagesTasks = [];
    
 for (let i = 0; i < STAGES_NAMES.length; ++i) {
   stagesTasks.push([]);
 }
 for (let task of tasks) {
   const stageId = task.stage;
   stagesTasks[stageId].push(task);
 }
 return stagesTasks
}