import { useContext, useState } from "react";
import { ListContext } from "../App";
import { useEffect } from "react";

export function Task(props){

   const [complete,setCompleted] = useState(props.checked);
   const {tasks,updateTaskList,removeTask,updateTask} = useContext(ListContext);
   const [content,setContent] = useState(tasks[tasks.findIndex(task => task.id === props.id)].desc);
   const [taskTitle,setTaskTitle] = useState(tasks[tasks.findIndex(task => task.id === props.id)].task);
   const [editing,setEditing] = useState(false);

   useEffect(() => {
    const index = tasks.findIndex(task => task.id === props.id);
    if (index !== -1) {
      const task = tasks[index];
      setCompleted(task.checked);
      setContent(task.desc);
      setTaskTitle(task.task);
    }
  }, [tasks, props.id]);
   

    function handleCheckBoxClicked(){
        let updatedTaskList = [...tasks];
        const index = updatedTaskList.findIndex(task => task.id === props.id);
        let editedElement = {...updatedTaskList[index]};
        editedElement.checked = !complete;
        updatedTaskList[index] = editedElement;

        updateTaskList(updatedTaskList);
        console.log(updatedTaskList);
        setCompleted(!complete);
    }

    function handleButtonDelete(){
        removeTask(props.id);
    }  
    
    function handleButtonEditDone(){        
        const index = tasks.findIndex(task => task.id === props.id);
        let editedElementData = {...tasks[index]};
        editedElementData.task = taskTitle;
        editedElementData.desc = content;
        updateTask(props.id, editedElementData);
        setEditing(false);
    }

    function renderElement(){

        if (editing){
            return (
                <div>
                <label> Task:
                    <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value) }/>
                </label>                
                <label> Description:
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value) }/>
                </label>
                <button onClick={handleButtonEditDone}>Done</button>

            </div>
            )
        }else{
            return (
                <div>
                <label style={ {textDecoration: complete ? 'line-through' : 'none'} }>
                   {taskTitle}
                    <input type="checkbox" checked={complete} onChange={handleCheckBoxClicked} />
                    <button onClick={handleButtonDelete}>Delete</button>
                    <button onClick={() => setEditing(true) }>Edit</button>
                </label>
                <p>{content}</p>
            </div>
            )
        }        
    }


    return (
        renderElement()
    )
};
