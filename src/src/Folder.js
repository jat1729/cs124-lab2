import Task from './Task';
import './Folder.css';

function Folder(props) {
    return <div>
        <ul>
            <li className={"categories"}>
                {props.folder}
                <button className="drop-down-btn"><i className="fa-solid fa-chevron-right"></i></button>
                <ul>
                    {props.tasks.map((task) =>
                        <Task task={task} onTaskChanged={props.onTaskChanged} taskList={props.tasks} folderId={props.id}/>)}
                </ul>
            </li>
        </ul>
    </div>
}

export default Folder;