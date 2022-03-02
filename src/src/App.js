import Taskbar from "./Taskbar";
import ListItems from "./ListItems";
import BottomBar from "./BottomBar";
import {useEffect, useState} from 'react';
import React from "react";
import folder from "./Folder";

const initialData = [
    {
        id: 1,
        folder: "Work",
        tasks: [{
            id: 4,
            taskName: "Go To The Bank",
            completed: false
        }]
    },
    {
        id: 2,
        folder: "Personal",
        tasks: [{
            id: 5,
            taskName: "Call Mom",
            completed: false
        }]
    },
    {
        id: 3,
        folder: "Academic",
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
    const [currentFolder, setCurrentFolder] = useState(initialData);
    const [completedTasks, setCompletedTasks] = useState([]);

    function handleTaskCompleted(task) {
        setCompletedTasks([task]);
    }
    function changeTaskName(newTaskName, taskId, folderId, taskList) {
        setCurrentFolder(currentFolder.map(f => f.id === folderId ? {...f, ["tasks"]: taskList.map(t => t.id === taskId ? {...t, ["taskName"]: newTaskName} : t)} : f))
    }
    return <div>
        <Taskbar/>
        <ListItems data={currentFolder} onTaskChanged={changeTaskName} onTaskCompleted={handleTaskCompleted}/>
        <BottomBar/>
    </div>
}

export default App;