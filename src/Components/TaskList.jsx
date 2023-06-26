import { useContext } from "react";
import { Task } from "./Task";
import { ListContext } from "../App";
import { useState } from "react";

export default function TaskList(props){
    const tasks = props.tasks;
    const {addTask} = useContext(ListContext)

    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");
    const d = new Date();
    let time = d.getTime();

    function onCreateTaskClicked(){
        event.preventDefault();
        const inputData = {id:time, task:task, desc:description, checked:false};
        addTask(inputData);

    }

    return (
        <>
        <div>
            <form onSubmit={onCreateTaskClicked}>
                <label> Task:
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value) }/>
                </label>                
                <label> Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value) }/>
                </label>
                <input type="submit" value="Create Task" />
            </form>
        </div>
        <div>
           { tasks.map((task,index) => (
              <Task key={index} id={task.id} task={task.task} desc={task.desc} checked={task.checked}/>
            )
            )
            }
        </div>

        </>
    );

};