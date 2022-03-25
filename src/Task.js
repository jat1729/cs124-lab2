 import './Task.css';
import {useState} from 'react';

function Task(props) {
    // used for determining the status of editing the tasks
    const [editTask,setEditTask] = useState(false);

    // changes priority level for a task
    function handleClickPriorityBtn() {
        if (props.priority === 2) {
            props.setTaskProperty(props.folder.id, props.task.id, "priority", 0);
        } else if (props.priority === 0) {
            props.setTaskProperty(props.folder.id, props.task.id, "priority", 1);
        } else {
            props.setTaskProperty(props.folder.id, props.task.id, "priority", 2);
        }
    }

    function handleClickEditBtn() {
        setEditTask(!editTask);
    }

    // used for changing the task name
    function handleChangeEditBtn(newTaskName) {
        props.setTaskProperty(props.folder.id, props.task.id, "taskName", newTaskName);
        props.setTaskProperty(props.folder.id, props.task.id, "taskNameCaseInsesitive", newTaskName.toLowerCase());
    }

    // marking tasks completed
    function handleClickCompleteBtn() {
        props.setTaskProperty(props.folder.id, props.task.id, "completed", !props.task.completed );
    }

    let priority_btn;
    if (props.priority === 0) {
        priority_btn = <button className={"priority-btn"} onClick={handleClickPriorityBtn}>!</button>;
    } else if (props.priority === 1) {
        priority_btn = <button className={"priority-btn"} onClick={handleClickPriorityBtn}>!!</button>;
    } else {
        priority_btn =  <button className={"priority-btn"} onClick={handleClickPriorityBtn}>!!!</button>;
    }

    return <div>
        <li className={"tasks"}>
            {priority_btn}
            {(editTask)?
                <div>
                    <input id={"edit-task-input"} type={"text"} value={props.task.taskName}
                            onChange={(e) => handleChangeEditBtn(e.target.value)}/>
                </div>:
                <div className={props.task.completed ? "completed taskName" : "taskName"}>
                    {props.task.taskName}
                </div>
            }
            <button className="edit-btn"
                    onClick={handleClickEditBtn}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="completed-btn"
                    onClick={handleClickCompleteBtn}>
                <i className="fa-solid fa-check"></i>
            </button>
        </li>
    </div>
}

export default Task;