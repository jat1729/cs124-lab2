import './App.css';
import Taskbar from "./Taskbar";
import Folders from "./Folders";
import BottomBar from "./BottomBar";
import {useState} from 'react';
import React from "react";

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import { firestore } from "nativescript-plugin-firebase";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {initializeApp} from "firebase/app";
import {doc, setDoc, addDoc, collection, getFirestore, query} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTPQgL3CbUE4NYU0N3qgFDG-ASjbjMvyY",
    authDomain: "cs124-lab3-60767.firebaseapp.com",
    projectId: "cs124-lab3-60767",
    storageBucket: "cs124-lab3-60767.appspot.com",
    messagingSenderId: "113742232012",
    appId: "1:113742232012:web:46620a837cd7f2bbeb0569"
};
const firebaseApp=initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const collectionName = "folders"
const subCollectionName = "tasks"

const folder1Id = generateUniqueID()
setDoc(doc(db, collectionName, folder1Id), {
    id: folder1Id,
    folderName: "WORK",
    tasks: [{
        id: 4,
        taskName: "Go To The Bank",
        completed: false
    }]
})

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
    // query for folders collection
    const foldersQuery = query(collection(db, collectionName));
    // retrieving the list of folders
    const [folders, loading, error] = useCollectionData(foldersQuery);
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
        // setData(data.map(f => (f.id === folderId) ?
        //     {...f, tasks: [...f.tasks,
        //         {id: generateUniqueID(), taskName:"New Task", completed: false}]
        // } : f));
        const uniqueId = generateUniqueID();
        const firebase = require("nativescript-plugin-firebase/app");
        firebase.firestore.collection(collectionName).doc(folderId).collection(subCollectionName).add({
            id: uniqueId,
            taskName: "New Task",
            completed: false});
        // db.get(collectionName).doc(folderId).collection(subCollectionName).add({
        //     id: uniqueId,
        //     taskName: "New Task",
        //     completed: false});
        // addDoc(collection(db, collectionName, folderId, subCollectionName),
        //     {
        //     id: uniqueId,
        //     taskName: "New Task",
        //     completed: false
        // });
    }

    // adding a new folder to our initial data
    function addNewFolder() {
        const uniqueId = generateUniqueID();
        setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                folderName: "New Folder",
                tasks: [],
            });
        // setData(data.concat({id:generateUniqueID(), folderName: "New Folder", tasks: [] }))
    }

    // deleting completed tasks from our initial data
    function deleteCompletedTasks() {
        setData(data.map(folder => ({...folder, tasks: folder.tasks.filter(task => !task.completed)})));
    }

    if (loading) {
        return "loading..";
    }
    // Calling the three different components for our JSX
    return <div id={'main-container'}>
        <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete} DeleteCompletedTasks={deleteCompletedTasks}/>
        <Folders data={folders} setFolderProperty={setFolderProperty} setTaskProperty={setTaskProperty}
                 hideComplete={hideComplete} addNewTask={addNewTask}/>
        <BottomBar addNewFolder={addNewFolder}/>
    </div>
}

export default App;