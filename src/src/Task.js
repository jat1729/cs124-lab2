 import './Task.css';
import {useEffect, useState} from 'react';



function Task(props) {
    const [editTask,setEditTask] = useState(false);

    function handleClickEditBtn(e) {
        // console.log(currentTask);
        setEditTask(!editTask);
    }

    function handleChangeEditBtn(newTaskName) {
        props.onTaskChanged(props.folder.id, props.task.id, "taskName", newTaskName);
    }

    function handleClickCompleteBtn() {
        props.onTaskChanged(props.folder.id, props.task.id, "completed", !props.task.completed );
        console.log("taskComplete:", props.task.completed);
    }
    return <div>
        <li className={"tasks"}>
            {editTask ? <div><input type={"text"} value={props.task.taskName}
                                    onChange={(e) => handleChangeEditBtn(e.target.value)}/></div>
                                    : <div className={props.task.completed ? "completed" : ""}>{props.task.taskName}</div>}
            <button className="edit-btn" onClick={handleClickEditBtn}><i className="fa-regular fa-pen-to-square"></i></button>
            <button className="completed-btn" onClick={(e)=>handleClickCompleteBtn()}><i className="fa-solid fa-check"></i></button>
        </li>
    </div>
}

export default Task;