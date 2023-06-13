import { Task } from "./Task";

export default function TaskList(props){
    const tasks = props.tasks;

    return (
        <div>
           { tasks.map((task,index) => (
              <Task key={task.id} id={task.id} task={task.task} desc={task.desc} checked={task.checked}/>
            )
            )
            }
        </div>
    );

};