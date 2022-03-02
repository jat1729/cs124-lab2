import './ListItems.css';
import Folder from './Folder';

function ListItems(props) {
    return <div>
        {props.data.map(x =>
            <Folder folder={x.folder} tasks={x.tasks} onTaskChanged={props.onTaskChanged} onTaskCompleted={props.onTaskCompleted}/>)}
    </div>

}

export default ListItems;