import './Taskbar.css';
function Taskbar(props) {
    return <div id="taskbar">
        <button id="tasks-to-complete-btn" className="btn">Tasks to Complete</button>
        <h1>To Do List</h1>
        <button id="trash-btn" className="btn"><i className="fa-regular fa-trash-can"></i></button>
        </div>
}
export default Taskbar;