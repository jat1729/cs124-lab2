 import './Task.css';
import {useEffect, useState} from 'react';



function Task(props) {
    const [TaskName,setTaskName] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [se, setSe] = useState(props.task.taskName);
    function handleClickEditBtn(e) {
        console.log(se);
        setTaskName(!TaskName);
    }

    function handleChangeEditBtn(newTaskName, taskId, taskList) {
        setSe(newTaskName);
        // console.log(taskList)
        props.onTaskChanged(newTaskName, taskId, props.folderId, taskList);
    }

    function handleClickCompleteBtn(e) {
        console.log("Task completed");
        // props.onTaskCompleted(props.task.id);
        props.task.complete = true;
        setTaskCompleted(!taskCompleted);
    }
    return <div>
        <li class={"tasks"}>
            {TaskName ? <div><input type={"text"} value={se}
                                    onChange={(e) => handleChangeEditBtn(e.target.value, props.task.id, props.taskList)}/></div>
                                    : <div class={taskCompleted ? "completed" : ""}>{se}</div>}
            <button className="edit-btn even-btn" onClick={handleClickEditBtn}><i className="fa-regular fa-pen-to-square"></i></button>
            <button className="completed-btn even-btn" onClick={handleClickCompleteBtn}><i className="fa-solid fa-check"></i></button>
        </li>
    </div>
}

export default Task;