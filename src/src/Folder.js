import Task from './Task';
import './Folder.css';

function Folder(props) {
    // const [showTasks, setShowTasks] = useState(true);
    // function toggleDropDownBtn() {
    //     setShowTasks(!showTasks);
    // }
    return <div>
        <ul>
            <li className={"categories"}>
                {props.folder}
                <button className={"new-task"}><i className="fa-solid fa-plus"></i></button>
                <button className="drop-down-btn"><i className="fa-solid fa-chevron-right"></i></button>
                <ul className={"task-container"}>
                    {props.tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task task={task} onTaskChanged={props.onTaskChanged} onTaskCompleted={props.onTaskCompleted} taskList={props.tasks} folderId={props.id}/>: null)}
                </ul>
            </li>
        </ul>
    </div>
}

export default Folder;