export function Task(props){

    return (
        <div>
            <label>
               {props.task}
                <input type="checkbox" checked={props.check}/>
            </label>
        </div>
    );
};