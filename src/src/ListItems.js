import './ListItems.css';
import Folder from './Folder';

function ListItems(props) {
    return <div>
        {props.data.map(x =>
            <Folder folder={x.folder} tasks={x.tasks}/>)}
    </div>

}

export default ListItems;