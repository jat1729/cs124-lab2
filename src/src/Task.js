function Task(props) {
    return <div>
        <li class={"tasks"}>
            {props.task.taskName}
            <button className="edit-btn even-btn"><i className="fa-regular fa-pen-to-square"></i></button>
            <button className="completed-btn even-btn"><i className="fa-solid fa-check"></i></button>
        </li>
    </div>
}

export default Task;