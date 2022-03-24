import './App.css';
import Taskbar from "./Taskbar";
import Folders from "./Folders";
import BottomBar from "./BottomBar";
import {useState} from 'react';
import React from "react";

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import {useCollectionData} from "react-firebase-hooks/firestore";
import {initializeApp} from "firebase/app";
import {doc, setDoc, updateDoc, deleteDoc, collection, getFirestore, query, serverTimestamp} from "firebase/firestore";
import task from "./Task";


const firebaseConfig = {
    apiKey: "AIzaSyDTPQgL3CbUE4NYU0N3qgFDG-ASjbjMvyY",
    authDomain: "cs124-lab3-60767.firebaseapp.com",
    projectId: "cs124-lab3-60767",
    storageBucket: "cs124-lab3-60767.appspot.com",
    messagingSenderId: "113742232012",
    appId: "1:113742232012:web:46620a837cd7f2bbeb0569"
};

// initialize app
const firebaseApp=initializeApp(firebaseConfig);

// initialize database
const db = getFirestore(firebaseApp);
const collectionName = "folders"
const subCollectionName = "tasks"

function App() {
    // query for folders collection
    const foldersQuery = query(collection(db, collectionName));
    // retrieving the list of folders
    const [folders, loading, error] = useCollectionData(foldersQuery);
    // status of the "Tasks to complete" button
    const [hideComplete, setHideComplete] = useState(false);

    const storedTasks = {};

    function storeTasks(folderId, tasks) {
        storedTasks[folderId] = tasks;
    }

    // updating a field attribute of a task in initial data
    function setTaskProperty(folderId, taskId, property, value) {
        const folderDoc = doc(db, collectionName, folderId);
        updateDoc(doc(collection(folderDoc, "tasks"), taskId), {
            [property]: value
        }).then();
    }

    // updating a field attribute of a folder in initial data
    function setFolderProperty(folderId, property, value) {
        updateDoc(doc(db, collectionName, folderId), {
            [property]: value
        });
    }

    // adding a new task
    function addNewTask(folderId) {
        const uniqueId = generateUniqueID();
        const folderDoc = doc(db, collectionName, folderId);
        setDoc(doc(collection(folderDoc, subCollectionName), uniqueId), {
            id: uniqueId,
            created: serverTimestamp(),
            taskName: "New Task",
            completed: false
        }).then();
    }

    // adding a new folder
    function addNewFolder() {
        const uniqueId = generateUniqueID();
        setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                created: serverTimestamp(),
                folderName: "New Folder",
            }).then();
    }

    // deleting completed tasks from our initial data
    function deleteCompletedTasks() {
        // const foldersQuery = db.collection("Folders")
        // foldersQuery.get().then((querySnapshot) => {)
        // folders.map(folder => db.collection(db,collectionName, folder.id, subCollectionName).get().data().
        // forEach(task => task.completed ? deleteDoc(doc(db, collectionName, folder.id, task, task.id)) : null));
        // storedTasks.map(folderId => storedTasks[folderId].forEach(task => (task.completed && deleteDoc(doc(db, collectionName, folderId, subCollectionName, task.id)))))
        // storedTasks.forEach(folderId => storedTasks[folderId].forEach(task => (console.log(task.completed))))
        for (const folderId in storedTasks){
            storedTasks[folderId].forEach(task => task.completed && deleteDoc(doc(db,collectionName,folderId,subCollectionName,task.id)))
        }
        console.log(storedTasks)
    }

    // Error and Loading check
    if (loading) {
        return "loading..."
    }
    if (error) {
        return "error..."
    }

        // Calling the three different components for our JSX
        return <div id={'main-container'}>
            <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete}
                     DeleteCompletedTasks={deleteCompletedTasks}/>
            <Folders data={folders} db={db} setFolderProperty={setFolderProperty} setTaskProperty={setTaskProperty}
                         hideComplete={hideComplete} addNewTask={addNewTask} storeTasks={storeTasks}/>
            <BottomBar addNewFolder={addNewFolder}/>
        </div>
}

export default App;