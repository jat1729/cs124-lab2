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
    let tasksQuery = ''
    if (props.folder.sort === "priority") {
        tasksQuery = query(collection(props.db, "folders", props.folder.id,"tasks"),
            orderBy("priority", "desc"));
    } else if (props.folder.sort === "name") {
        tasksQuery = query(collection(props.db, "folders", props.folder.id,"tasks"), orderBy("taskNameCaseInsesitive"));
    } else if (props.folder.sort === "unsorted"){
        tasksQuery = query(collection(props.db, "folders", props.folder.id,"tasks"));
    } else if (props.folder.sort === "reverse-name") {
        tasksQuery = query(collection(props.db, "folders", props.folder.id,"tasks"), orderBy("taskNameCaseInsesitive", "desc"));
    }
    const [tasks, loading, error] = useCollectionData(tasksQuery);
    console.log(tasks)
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
        if (props.folder.sort === "priority") {
            props.setFolderProperty(props.folder.id, "sort", "name");
        } else if (props.folder.sort === "unsorted") {
            props.setFolderProperty(props.folder.id, "sort", "priority");
        } else if (props.folder.sort === "name") {
            props.setFolderProperty(props.folder.id, "sort", "reverse-name");
        } else if (props.folder.sort === "reverse-name") {
            props.setFolderProperty(props.folder.id, "sort", "unsorted");
        }
    }

    let sort_btn;
    if (props.folder.sort === "priority") {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i
            className="fa-solid fa-arrow-up-wide-short"></i></button>;
    } else if (props.folder.sort === "name") {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className="fa-solid fa-arrow-down-a-z"></i></button>;
    } else if (props.folder.sort === "reverse-name") {
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className="fa-solid fa-arrow-up-z-a"></i></button>;
    } else {
        console.log("unsorted button");
        sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i
            className="fa-solid fa-align-justify"></i></button>;
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