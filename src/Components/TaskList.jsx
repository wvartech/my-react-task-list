import { Task } from "./Task";

export default function TaskList(props){
    const tasks = props.tasks;

    return (
        <div>
           { tasks.map((task,index) => (
              <Task key={task.id} task={task.task} />
            )
            )
            }
        </div>
    );

};