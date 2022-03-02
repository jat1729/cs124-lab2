 import './Task.css';
import {useEffect, useState} from 'react';



function Task(props) {
    const [editTask,setEditTask] = useState(false);
    const [se, setSe] = useState(props.task.taskName);

    function handleClickEditBtn(e) {
        console.log(se);
        setEditTask(!editTask);
    }

    function handleChangeEditBtn(newTaskName) {
        setSe(newTaskName);
        // console.log(taskList)
        props.onTaskChanged(props.folderId, props.task.id, "taskName", props.taskList);
    }

    function handleClickCompleteBtn() {
        props.onTaskChanged(props.folderId, props.task.id, "completed",props.task.completed );
        props.onTaskCompleted(props.task.id);
        console.log("taskComplete:", props.task.completed);
    }
    return <div>
        <li className={"tasks"}>
            {editTask ? <div><input type={"text"} value={se}
                                    onChange={(e) => handleChangeEditBtn(e.target.value)}/></div>
                                    : <div class={props.task.completed ? "completed" : ""}>{se}</div>}
            <button className="edit-btn" onClick={handleClickEditBtn}><i className="fa-regular fa-pen-to-square"></i></button>
            <button className="completed-btn" onClick={(e)=>handleClickCompleteBtn()}><i className="fa-solid fa-check"></i></button>
        </li>
    </div>
}

export default Task;