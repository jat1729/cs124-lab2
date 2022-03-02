import Taskbar from "./Taskbar";
import ListItems from "./ListItems";
import BottomBar from "./BottomBar";
import {useEffect, useState} from 'react';
import React from "react";

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
    // instantiating and updating the data
    const [data, setData] = useState(initialData);
    // status of the "Tasks to complete" button
    const [hideComplete, setHideComplete] = useState(false);

    function setTaskProperty(folderId, taskId, property, value) {
        setData(data.map(f => f.id === folderId ? {
            ...f,
            tasks: f.tasks.map(t => t.id === taskId ? {...t, [property]: value} : t)
        } : f));
    }

    function deleteCompletedTasks() {
        setData(data.map(folder => ({...folder, tasks: folder.tasks.filter(task => !task.completed)})));
        console.log(data);
        console.log("delete complete");
    }

    function toggleTaskCompleted(taskId) {
        setData(data.map(folder =>
            ({...folder, tasks: folder.tasks.map(task =>
                task.id === taskId
                    ? {...task, completed: !task.completed}
                    : task
                )})
            ));

    }

    return <div>
        <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete} onDeleteCompletedTasks={deleteCompletedTasks}/>
        <ListItems data={data} onTaskChanged={setTaskProperty} onTaskCompleted={toggleTaskCompleted} hideComplete={hideComplete}/>
        <BottomBar/>
    </div>
}

export default App;