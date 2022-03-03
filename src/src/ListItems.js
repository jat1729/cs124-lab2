import './ListItems.css';
import Folder from './Folder';

function ListItems(props) {
    console.log("props.data:",props.data)
    return <div>
        {props.data.map(f =>
            <Folder key={f.id} folder={f} onTaskChanged={props.onTaskChanged}
                    hideComplete={props.hideComplete} addNewTask={props.addNewTask}/>)}
    </div>
}

export default ListItems;