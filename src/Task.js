 import './Task.css';
import {useState} from 'react';

function Task(props) {
    // used for determining the status of editing the tasks
    const [editTask,setEditTask] = useState(false);

    function handleClickEditBtn(e) {
        setEditTask(!editTask);
    }

    // used for changing the task name
    function handleChangeEditBtn(newTaskName) {
        props.setTaskProperty(props.folder.id, props.task.id, "taskName", newTaskName);
    }

    // marking tasks completed
    function handleClickCompleteBtn() {
        props.setTaskProperty(props.folder.id, props.task.id, "completed", !props.task.completed );
    }

    return <div>
        <li className={"tasks"}>
            {(editTask)?
                <div>
                    <input id={"edit-task-input"}type={"text"} value={props.task.taskName}
                            onChange={(e) => handleChangeEditBtn(e.target.value)}/>
                </div>:
                <div className={props.task.completed ? "completed" : ""}>
                    {props.task.taskName}
                </div>
            }
            <button className="edit-btn"
                    onClick={handleClickEditBtn}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="completed-btn"
                    onClick={(e)=>handleClickCompleteBtn()}>
                <i className="fa-solid fa-check"></i>
            </button>
        </li>
    </div>
}

export default Task;