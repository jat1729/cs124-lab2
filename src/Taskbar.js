import './Taskbar.css';

function Taskbar(props) {
    // toggles the status of the tasks to complete button
    function handleTaskToCompleteBtn(e) {
        props.setHideComplete(!props.hideComplete);
    }

    // deletes completed tasks
    function handleTrashBtn(e) {
        props.DeleteCompletedTasks();
    }

    return <div id="taskbar">
        <button id="tasks-to-complete-btn" className="btn"
                onClick={handleTaskToCompleteBtn} aria-label={props.hideComplete ? "Show All Tasks": "Show Tasks to Complete" }>{props.hideComplete ? "All Tasks": "Tasks to Complete"}
        </button>
        <h1>To Do List</h1>
        <button id="trash-btn" className="btn"
                onClick={handleTrashBtn} aria-label={"Delete Completed Tasks"} title={"Delete Completed Tasks"}><i className="fa-regular fa-trash-can"></i>
        </button>
        </div>
}
export default Taskbar;