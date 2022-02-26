import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Taskbar from './Taskbar.js';
import ListItems from './ListItems';
import BottomBar from "./BottomBar";

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
ReactDOM.render(
        <div>
            <Taskbar/>
            <ListItems data={initialData}/>
            <BottomBar/>
        </div>,
  document.getElementById('root')
);
