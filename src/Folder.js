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

    const [editableTasks, setEditableTasks] = useState([]);
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
    let tasksQuery = query(collection(props.db, "People-AuthenticationRequired", props.folder.id, "tasks"), sortOrder);
    const [tasks, loading, error] = useCollectionData(tasksQuery);
    props.storeTasks(props.folder.id, tasks);

    // Adding a new task
    function addNewTask() {
        editableTasks.push(props.addNewTask(props.folder.id));
    }

    // Changing the status of edit folder when the edit button is clicked
    function handleClickEditBtn() {
        setEditFolder(!editFolder);
    }

    // Handles deleting the folder
    function handleClickDeleteBtn() {
        props.deleteFolder(props.folder.id);
    }

    // Handles unsharing the folder
    function handleClickUnshareBtn() {
        props.setFolderProperty(props.folder.id, "sharedUsers", props.folder.sharedUsers.filter(email => email !== props.user.email));
    }

    //Toggles the chevron direction and task shown
    function handleClickChevronBtn() {
        setShowTasks(!showTasks);

    }

    // Editing the name of the folder
    function handleChangeEditBtn(newFolderName) {
        props.setFolderProperty(props.folder.id, "folderName", newFolderName);
    }

    // Sharing the folder
    function handleClickShareBtn() {
        let shareEmail = prompt("Share with", "example@gmail.com");
        props.setFolderProperty(props.folder.id, "sharedUsers", props.folder.sharedUsers.concat(shareEmail));
    }

    // checks if owner of the folder
    function isOwner() {
        return props.user.email == props.folder.owner;
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

    const handleEnterPress = e => {
        if (e.charCode === 13) {
            setEditFolder(!editFolder);
        }
    }

    let sort_btn;
    let sortIcon = "";
    let ariaMessage = "";
    if (props.folder.sort === "priority") {
        sortIcon = "fa-solid fa-arrow-up-wide-short";
        ariaMessage = "Tasks Sorted by priority";
    } else if (props.folder.sort === "name") {
        sortIcon = "fa-solid fa-arrow-down-a-z";
        ariaMessage = "Sorted in Alphabetical Order";
    } else if (props.folder.sort === "reverse-name") {
        sortIcon = "fa-solid fa-arrow-up-z-a";
        ariaMessage = "Sorted in Reverse Alphabetical Order";
    } else {
        sortIcon = "fa-solid fa-calendar";
        ariaMessage = "Sorted by Creation Date";
    }
    sort_btn = <button className={"sort-folder-btn"} onClick={handleChangePriorityBtn} aria-label={ariaMessage}>
        <i className={sortIcon}></i></button>;

    // Error and Loading check
    if (loading) {
        return "loading..";
    }

    if (error) {
        console.log("In Folder: ", error);
        return "error..";
    }
    return <div className={"folder-space"}>
            <div className={"folder"}>
                {sort_btn}
                {editFolder ?
                        <input id={"edit-folder-input"} type={"text"} value={props.folder.folderName}
                               onChange={(e) => handleChangeEditBtn(e.target.value)}
                               onKeyPress={handleEnterPress}/>:
                    <div className={"folderName"} tabIndex={"0"} onKeyPress={handleEnterPress} onClick={handleClickEditBtn}> {props.folder.folderName}</div>
                }
                <button className="share-folder-btn" onClick={handleClickShareBtn} aria-label={"Share " + props.folder.folderName}>
                    <i className="fa-solid fa-share-from-square"></i>
                </button>
                {isOwner() ? <button className="delete-folder-btn" onClick={handleClickDeleteBtn} aria-label={"Delete " + props.folder.folderName}>
                    <i className="fa-regular fa-trash-can"></i>
                </button> : <button className="delete-folder-btn" onClick={handleClickUnshareBtn} aria-label={"Unshare " + props.folder.folderName}>
                    <i className="fa-regular fa-square-minus"></i>
                </button>}
                <button className={"edit-folder-btn"} onClick={handleClickEditBtn}
                        aria-label={"Edit the name of "+ props.folder.folderName}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className={"new-task"} onClick={addNewTask} aria-label={"Add a New Task"}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                {(showTasks && (tasks.length !== 0)) ?
                <button className="drop-down-btn" onClick={handleClickChevronBtn} aria-label={"Show all task in "+ props.folder.folderName}>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>:
                    <button className="drop-down-btn" onClick={handleClickChevronBtn} aria-label={"Hide all task in "+ props.folder.folderName}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                }
                {(showTasks && (tasks.length !== 0)) ?
                    <div className={"task-container"}>
                    {tasks.map((task) => !(props.hideComplete && task.completed) ?
                        <Task key={task.id} task={task} folder={props.folder} setTaskProperty={props.setTaskProperty}
                              setFolderProperty={props.setFolderProperty} priority={task.priority} editableTasks={editableTasks}
                              setEditableTasks={setEditableTasks}/>: null)}
                </div> : null}

            </div>
    </div>
}

export default Folder;