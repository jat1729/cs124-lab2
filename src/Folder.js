import Task from './Task';
import './Folder.css';
import {useState} from "react";
import {collection, query, orderBy} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";


function Folder(props) {
    // used for determining the status of editing the tasks
    const [editFolder,setEditFolder] = useState(false);
    // used to determine the direction of chevron button and whether tasks are shown
    const [showTasks, setShowTasks] = useState(true);
    // query for tasks collection
    // retrieving the list of tasks
    let tasksQuery = query(collection(props.db, "folders",props.folder.id,"tasks"));
    if (props.folder.sort === "ascending") {
        tasksQuery = query(collection(props.db, "folders",props.folder.id,"tasks"), orderBy("priority"));
    } else if (props.folder.sort === "descending") {
        tasksQuery = query(collection(props.db, "folders",props.folder.id,"tasks"), orderBy("name"));
    }
    const [tasks, loading, error] = useCollectionData(tasksQuery);

    props.storeTasks(props.folder.id, tasks);

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

    function handleChangePriorityBtn() {
        if (props.folder.sort === "ascending") {
            props.setFolderProperty(props.folder.id, "sort", "descending");
        } else if (props.folder.sort === "descending") {
            props.setFolderProperty(props.folder.id, "sort", "unsorted");
        } else {
            props.setFolderProperty(props.folder.id, "sort", "ascending");
        }
    }

    let sort_btn;
    if (props.folder.sort === "ascending") {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className="fa-solid fa-arrow-up-short-wide"></i></button>;
    } else if (props.folder.sort === "descending") {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className="fa-solid fa-align-justify"></i></button>;
    } else {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className="fa-solid fa-arrow-down-wide-short"></i></button>;
    }

    // Error and Loading check
    if (loading) {
        return "loading..";
    }

    if (error) {
        return "error..";
    }
    return <div>
        <ul>
            <li className={"folder"}>
                {sort_btn}
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
                {(showTasks && (tasks.length !== 0)) ?
                <button className="drop-down-btn" onClick={handleClickChevronBtn}>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>:
                    <button className="drop-down-btn" onClick={handleClickChevronBtn}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                }
                {(showTasks && (tasks.length !== 0)) ?
                    <ul className={"task-container"}>
                    {tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task key={task.id} task={task} folder={props.folder} setTaskProperty={props.setTaskProperty}
                              setFolderProperty={props.setFolderProperty} priority={task.priority}/>: null)}
                </ul> : null}
            </li>
        </ul>
    </div>
}

export default Folder;