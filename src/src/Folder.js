import Task from './Task';
import './Folder.css';

function Folder(props) {

    function addNewTask() {
        props.addNewTask(props.folder.id);
        console.log("task added", props.folder.id);
    }
    console.log(props.folder)
    return <div>
        <ul>
            <li className={"categories"}>
                {props.folder.folderName}
                <button className={"new-task"} onClick={addNewTask}><i className="fa-solid fa-plus"></i></button>
                <button className="drop-down-btn"><i className="fa-solid fa-chevron-right"></i></button>
                <ul className={"task-container"}>
                    {props.folder.tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task key={task.id} task={task} folder={props.folder} onTaskChanged={props.onTaskChanged}/>: null)}
                </ul>
            </li>
        </ul>
    </div>
}

export default Folder;