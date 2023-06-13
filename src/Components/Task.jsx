import { useContext, useState } from "react";
import { ListContext } from "../App";

export function Task(props){

   const [complete,setCompleted] = useState(props.checked);
   const [content,setContent] = useState(props.task);
   const {tasks,updateTaskList} = useContext(ListContext);

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

    return (
        <div>
            <label style={ {textDecoration: complete ? 'line-through' : 'none'} }>
               {content}
                <input type="checkbox" checked={complete} onChange={handleCheckBoxClicked} />
            </label>
            <p>{props.desc}</p>
        </div>
    );
};