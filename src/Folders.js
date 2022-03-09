import Folder from './Folder';
import './Folders.css';


function Folders(props) {
    return <div className={"folders"}>
        {props.data.map(f =>
            <Folder key={f.id} folder={f} setTaskProperty={props.setTaskProperty} setFolderProperty={props.setFolderProperty}
                    hideComplete={props.hideComplete} addNewTask={props.addNewTask}/>)}
    </div>
}

export default Folders;