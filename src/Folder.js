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
    let sortOrder = '';
    if (props.folder.sort === "priority") {
        sortOrder = orderBy("priority", "desc");
    } else if (props.folder.sort === "name") {
        sortOrder = orderBy("taskNameCaseInsesitive");
    } else if (props.folder.sort === "unsorted") {
        sortOrder = orderBy('created')
    } else if (props.folder.sort === "reverse-name") {
        sortOrder = orderBy("taskNameCaseInsesitive", "desc")
    }
    let tasksQuery = query(collection(props.db, "folders", props.folder.id,"tasks"), sortOrder);
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

    // Changing the status of edit folder when the edit button is clicked
    function handleClickDeleteBtn() {
        props.deleteFolder(props.folder.id);
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
        let sortOrderBy = ''
        if (props.folder.sort === "priority") {
            sortOrderBy = "name"
        } else if (props.folder.sort === "unsorted") {
            sortOrderBy = "priority"
        } else if (props.folder.sort === "name") {
            sortOrderBy = "reverse-name"
        } else if (props.folder.sort === "reverse-name") {
            sortOrderBy = "unsorted"
        }
        props.setFolderProperty(props.folder.id, "sort", sortOrderBy);
    }

    let sort_btn;
    let sortIcon = ""
    if (props.folder.sort === "priority") {
        sortIcon = "fa-solid fa-arrow-up-wide-short"
    } else if (props.folder.sort === "name") {
        sortIcon = "fa-solid fa-arrow-down-a-z"
    } else if (props.folder.sort === "reverse-name") {
        sortIcon = "fa-solid fa-arrow-up-z-a"
    } else {
        sortIcon = "fa-solid fa-calendar"
    }
    sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn}><i className={sortIcon}></i></button>;

    // Error and Loading check
    if (loading) {
        return "loading..";
    }

    if (error) {
        return "error..";
    }
    return <div className={"folder-space"}>

            <li className={"folder"}>
                {sort_btn}
                {editFolder ?
                        <input id={"edit-folder-input"}type={"text"} value={props.folder.folderName}
                               onChange={(e) => handleChangeEditBtn(e.target.value)}/>:
                    <div className={"folderName"}>{props.folder.folderName}</div>
                }
                <button className={"edit-folder-btn"} onClick={handleClickEditBtn}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="delete-folder-btn" onClick={handleClickDeleteBtn}>
                    <i className="fa-regular fa-trash-can"></i>
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
                    <div className={"task-container"}>
                    {tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task key={task.id} task={task} folder={props.folder} setTaskProperty={props.setTaskProperty}
                              setFolderProperty={props.setFolderProperty} priority={task.priority}/>: null)}
                </div> : null}
            </li>

    </div>
}

export default Folder;