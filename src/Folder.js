import Task from './Task';
import './Folder.css';
import {useState} from "react";
// const subCollectionName = "tasks"

function Folder(props) {
    // used for determining the status of editing the tasks
    const [editFolder,setEditFolder] = useState(false);
    // used to determine the direction of chevron button and whether tasks are shown
    const [showTasks, setShowTasks] = useState(true);

    // Adding a new task
    function addNewTask() {
        props.addNewTask(props.folder.id);
    }

    // Changing the status of edit folder when the edit button is clicked
    function handleClickEditBtn() {
        setEditFolder(!editFolder);
    }

    //Toggles the chevron direction and task shown
    function handleClickChevronBtn() {
        setShowTasks(!showTasks);

    }

    // Editing the name of the folder
    function handleChangeEditBtn(newFolderName) {
        props.setFolderProperty(props.folder.id, "folderName", newFolderName)
    }

    return <div>
        <ul>
            <li className={"folder"}>
                {editFolder ?
                    <div>
                        <input id={"edit-folder-input"}type={"text"} value={props.folder.folderName}
                               onChange={(e) => handleChangeEditBtn(e.target.value)}/>
                    </div>:
                    <div className={"folderName"}>{props.folder.folderName}</div>
                }
                <button className={"edit-folder-btn"} onClick={handleClickEditBtn}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className={"new-task"} onClick={addNewTask}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                {(showTasks && (props.folder.tasks.length !== 0)) ?
                <button className="drop-down-btn" onClick={handleClickChevronBtn}>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>:
                    <button className="drop-down-btn" onClick={handleClickChevronBtn}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                }
                {(showTasks && (props.folder.tasks.length !== 0)) ?
                    <ul className={"task-container"}>
                    {props.folder.tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task key={task.id} task={task} folder={props.folder} setTaskProperty={props.setTaskProperty}
                              setFolderProperty={props.setFolderProperty}/>: null)}
                </ul> : null}
            </li>
        </ul>
    </div>
}

export default Folder;