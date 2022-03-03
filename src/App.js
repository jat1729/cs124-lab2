import Taskbar from "./Taskbar";
import Folders from "./Folders";
import BottomBar from "./BottomBar";
import {useState} from 'react';
import React from "react";
import './App.css';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// array of folders with tasks in each folder
const initialData = [
    {
        id: 1,
        folderName: "Work",
        tasks: [{
            id: 4,
            taskName: "Go To The Bank",
            completed: false
        }]
    },
    {
        id: 2,
        folderName: "Personal",
        tasks: [{
            id: 5,
            taskName: "Call Mom",
            completed: false
        }]
    },
    {
        id: 3,
        folderName: "Academic",
        tasks: [{
            id: 6,
            taskName: "Do CS 124",
            completed: false
        },
            {
                id: 7,
                taskName: "Do CS 140",
                completed: false
            }
        ]
    }
]



function App() {
    // instantiating and updating the data
    const [data, setData] = useState(initialData);
    // status of the "Tasks to complete" button
    const [hideComplete, setHideComplete] = useState(false);

    // updating a field attribute of a task in initial data
    function setTaskProperty(folderId, taskId, property, value) {
        setData(data.map(f => (f.id === folderId) ?
            {...f, tasks: f.tasks.map(t => t.id === taskId ?
                    {...t, [property]: value}: t)
            } : f));
    }

    // updating a field attribute of a folder in initial data
    function setFolderProperty(folderId, property, value) {
        setData(data.map(f => (f.id === folderId) ?
            {...f,[property]: value}:f));
    }

    // adding a new task to our initial data
    function addNewTask(folderId) {
        setData(data.map(f => (f.id === folderId) ?
            {...f, tasks: [...f.tasks,
                {id: generateUniqueID(), taskName:"New Task", completed: false}]
        } : f));
    }

    // adding a new folder to our initial data
    function addNewFolder() {
        setData(data.concat({id:generateUniqueID(), folderName: "New Folder", tasks: [] }))
    }

    // deleting completed tasks from our initial data
    function deleteCompletedTasks() {
        setData(data.map(folder => ({...folder, tasks: folder.tasks.filter(task => !task.completed)})));
    }


    return <div id={'main-container'}>
        <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete} onDeleteCompletedTasks={deleteCompletedTasks}/>
        <Folders data={data} setFolderProperty={setFolderProperty} setTaskProperty={setTaskProperty}
                 hideComplete={hideComplete} addNewTask={addNewTask}/>
        <BottomBar addNewFolder={addNewFolder}/>
    </div>
}

export default App;