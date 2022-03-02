import './Taskbar.css';
function Taskbar(props) {
    function handleTaskToCompleteBtn(e) {
        props.setHideComplete(!props.hideComplete);
        console.log("Task to complete status:",props.hideComplete);
    }

    function handleTrashBtn(e) {
        props.onDeleteCompletedTasks();
    }

    return <div id="taskbar">
        <button id="tasks-to-complete-btn" className="btn" onClick={handleTaskToCompleteBtn}>{props.hideComplete ? "All Tasks": "Tasks to Complete" }</button>
        <h1>To Do List</h1>
        <button id="trash-btn" className="btn" onClick={handleTrashBtn}><i className="fa-regular fa-trash-can"></i></button>
        </div>
}
export default Taskbar;