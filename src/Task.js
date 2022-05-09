 import './Task.css';

function Task(props) {
    // used for determining the status of editing the tasks
    const isInEditMode = props.editableTasks.includes(props.task.id);

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
        if (isInEditMode) {
            props.setEditableTasks(props.editableTasks.filter(taskId => taskId !== props.task.id));
        } else {
            props.setEditableTasks([...props.editableTasks, props.task.id]);
        }
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

    const handleEnterPress = e => {
        if (e.charCode === 13) {
            handleClickEditBtn();
        }
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
    priority_btn = <button className={"priority-btn"} onClick={handleClickPriorityBtn}
                           aria-label={"priority button for "+props.task.taskName+" with priority "+(props.priority+1).toString()}>{priority}</button>;

    return <div>
        <li className={"tasks"}>
            {priority_btn}
            {(isInEditMode)?
                <input id={"edit-task-input"} type={"text"} value={props.task.taskName}
                       onChange={(e) => handleChangeEditBtn(e.target.value)}
                       onKeyPress={handleEnterPress} aria-label={props.task.taskName}/>:
                <div className={props.task.completed ? "completed taskName" : "taskName"} aria-label={props.task.taskName} tabindex={"0"} onKeyPress={handleEnterPress} onClick={handleClickEditBtn}>
                    {props.task.taskName}
                </div>
            }
            <button className="edit-btn"
                    onClick={handleClickEditBtn} aria-label={"Edit Task button for "+props.task.taskName} title={"Edit Task"}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="completed-btn"
                    onClick={handleClickCompleteBtn} aria-label={"Completed button for "+props.task.taskName} title={"Complete Task"}>
                <i className="fa-solid fa-check"></i>
            </button>
        </li>
    </div>
}

export default Task;