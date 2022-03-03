import './BottomBar.css';

function BottomBar(props) {
    // adding a new folder
    function addNewFolder() {
        props.addNewFolder();
    }
    return <div id="bottom-bar">
        <button id="add-btn" className="btn" onClick={addNewFolder}>New Folder</button>
    </div>
}
export default BottomBar;