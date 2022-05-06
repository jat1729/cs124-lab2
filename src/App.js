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
import {getAuth, signOut, sendEmailVerification} from "firebase/auth";
import {useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle} from "react-firebase-hooks/auth";


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

// initialize authentication
const auth = getAuth();

function App(props) {
    const [user, loading, error] = useAuthState(auth);
    function verifyEmail() {
        sendEmailVerification(user);
    }

    if (loading) {
        return <p>Checking...</p>
    } else if (user) {
        return <div>
            <div id={"Auth-bar"}>
                {user.displayName || user.email}
                <button class={"Auth-btn"} onClick={() => signOut(auth)}><i
                    className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
            <SignedInApp {...props} user={user}/>
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <SignIn key="Sign In"/>
            <SignUp key="Sign Up"/>
        </>
    }
}

function SignIn() {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2 ) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div id={"signIn"}>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}


        <h1 className={"middle"} id={"signIn-text"}>Sign In</h1>
        <br/>
        <label className={"middle"} htmlFor='email'>Email </label>
        <br/>
        <input className={"middle"} type="text" id='email' value={email}
                   onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label className={"middle"} htmlFor='pw'>Password </label>
        <br/>
        <input className={"middle"} type="text" id='pw' value={pw}
                   onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className={"middle"} onClick={() =>signInWithEmailAndPassword(email, pw)}>
                Log In
        </button>

        <text id={"alt-signIn"} className={"middle"}>or sign in with</text>
        <hr/>
        <button className={"middle"} onClick={() => signInWithGoogle()}>
            <i className="fa-brands fa-google"></i>
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create test user
        </button>

    </div>
}


function SignedInApp(props) {
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
        void updateDoc(doc(collection(folderDoc, "tasks"), taskId), {
            [property]: value
        });
    }

    // updating a field attribute of a folder in initial data
    function setFolderProperty(folderId, property, value) {
        void updateDoc(doc(db, collectionName, folderId), {
            [property]: value
        });
    }

    // adding a new task
    function addNewTask(folderId) {
        const uniqueId = generateUniqueID();
        const folderDoc = doc(db, collectionName, folderId);
        void setDoc(doc(collection(folderDoc, subCollectionName), uniqueId), {
            id: uniqueId,
            created: serverTimestamp(),
            taskName: "New Task",
            taskNameCaseInsesitive: "new task",
            completed: false,
            priority: 0
        });
        console.log("return new unique ID")
        return uniqueId;
    }

    // adding a new folder
    function addNewFolder() {
        const uniqueId = generateUniqueID();
        void setDoc(doc(db, collectionName, uniqueId),
            {
                id: uniqueId,
                created: serverTimestamp(),
                folderName: "New Folder",
                sort: "unsorted"
            });
    }

    // deleting completed tasks from our initial data
    function deleteCompletedTasks() {
        for (const folderId in storedTasks){
            storedTasks[folderId].forEach(task => task.completed && deleteDoc(doc(db, collectionName, folderId, subCollectionName, task.id)));
        }
        console.log(storedTasks)
    }

    function deleteFolder(folderId) {
        deleteDoc(doc(db,collectionName, folderId));
    }

    // Error and Loading check
    if (loading) {
        return "loading..."
    }
    if (error) {
        return "error..."
    }

        // Calling the three different components for our JSX
        return <>
                <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete}
                         DeleteCompletedTasks={deleteCompletedTasks}/>
                <Folders data={folders} db={db} setFolderProperty={setFolderProperty} setTaskProperty={setTaskProperty}
                         hideComplete={hideComplete} addNewTask={addNewTask} storeTasks={storeTasks} deleteFolder={deleteFolder}/>
                <BottomBar addNewFolder={addNewFolder}/>
        </>
}

export default App;