 import './Task.css';
import {useState} from 'react';

function Task(props) {
    // used for determining the status of editing the tasks
    const [editTask,setEditTask] = useState(false);

    // changes priority level for a task
    function handleClickPriorityBtn() {
        let priorityLevel = 0
        if (props.priority === 2) {
            priorityLevel=0
        } else if (props.priority === 0) {
            priorityLevel=1
        } else {
            priorityLevel=2
        }
        props.setTaskProperty(props.folder.id, props.task.id, "priority", priorityLevel);
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
    let priority = ''
    if (props.priority === 0) {
        priority = '!'

    } else if (props.priority === 1) {
        priority = '!!'
    } else {
        priority = '!!!'
    }
    priority_btn = <button className={"priority-btn"} onClick={handleClickPriorityBtn}>{priority}</button>;

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