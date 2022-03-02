 import './Task.css';
import {useEffect, useState} from 'react';



function Task(props) {
    function handleClickEditBtn(e) {
        console.log("yuh");
        setTaskName(true);
    }

    function handleChangeEditBtn(e) {
        console.log(e.target.value);
        props.onTaskChanged(e.target.value);
    }
    const [TaskName,setTaskName] = useState(false)
    return <div>
        <li class={"tasks"}>
            {TaskName ? <div><input type={"text"} value={props.task.taskName}
                                    onChange={handleChangeEditBtn}/></div>: props.task.taskName}
            <button className="edit-btn even-btn" onClick={handleClickEditBtn}><i className="fa-regular fa-pen-to-square"></i></button>
            <button className="completed-btn even-btn"><i className="fa-solid fa-check"></i></button>
        </li>
    </div>
}

export default Task;