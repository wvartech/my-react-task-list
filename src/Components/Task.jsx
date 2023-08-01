import { useContext, useState } from "react";
import { ListContext } from "../App";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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

    function renderElement() {
        if (editing) {
          return (
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>Task:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleButtonEditDone}>
                  Done
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div className={`card ${complete ? 'bg-light' : ''}`}>
              <div className="card-body">
                <div className="form-group">
                  <label
                    style={{
                      textDecoration: complete ? 'line-through' : 'none'
                    }}
                  >
                    {taskTitle}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={complete}
                      onChange={handleCheckBoxClicked}
                    />
                  </label>
                  <button className="btn btn-danger" onClick={handleButtonDelete}>
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                    Edit
                  </button>
                </div>
                <p>{content}</p>
              </div>
            </div>
          );
        }
      }


    return (
        renderElement()
    )
};
