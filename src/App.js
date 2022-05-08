import './App.css';
import Taskbar from "./Taskbar";
import Folders from "./Folders";
import BottomBar from "./BottomBar";
import {useState} from 'react';
import React from "react";

import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import {useCollectionData} from "react-firebase-hooks/firestore";
import {initializeApp} from "firebase/app";
import {doc, setDoc, updateDoc, deleteDoc, collection, getFirestore, query, serverTimestamp, where} from "firebase/firestore";
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
const collectionName = "People-AuthenticationRequired"
const subCollectionName = "tasks"

// initialize authentication
const auth = getAuth();

function App(props) {
    const [user, loading, error] = useAuthState(auth);

    // email verification
    function verifyEmail() {
        void sendEmailVerification(user);
    }

    // authentication and log in
    if (loading) {
        return <p>Checking...</p>
    } else if (user) {
        return <div>
            <div id={"Auth-bar"}>
                {user.displayName || user.email}
                <button class={"Auth-btn"} onClick={() => signOut(auth)} title={"Sign Out"}><i
                    className="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
            {!user.emailVerified && <button className={"Auth-btn"} type="button" onClick={verifyEmail}>Verify email</button>}
            <SignedInApp {...props} user={user}/>
        </div>
    } else {
        return <div id={"logInPage"}>
            {error && <p>Error App: {error.message}</p>}
            <SignIn key="Sign In"/>
            <SignUp key="Sign Up"/>
        </div>
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
        return <div className={"logInCenter"}>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <div className={"logInCenter"}>
            <h1 className={"logInCenter"} id={"toDoListHeader"}>To Do List</h1>
            <p className={"logInCenter"}>Logging in…</p>
        </div>
    }
    return <div className={"logInCenter"}>
        <h1 className={"logInCenter"} id={"toDoListHeader"}>To Do List</h1>
        {error1 && error1.message === "Firebase: Error (auth/wrong-password)." && <p>Error: Incorrect Password</p>}
        {error1 && error1.message === "Firebase: Error (auth/invalid-email)." && <p>Error: Invalid Email</p>}
        {error1 && error1.message === "Firebase: Error (auth/user-not-found)." && <p>Error: User Does Not Exist</p>}
        {error2 && error2.message === "Firebase: Error (auth/popup-closed-by-user)." && <p>Error: Google Sign In Failed</p>}
        <h1  className={"logInText"}>Sign In</h1>
        <br/>
        <label  htmlFor='email'>Email </label>
        <br/>
        <input  type="text" id='email' value={email}
                   onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label  htmlFor='pw'>Password </label>
        <br/>
        <input  type="password" id='pw' value={pw}
                   onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className={"logInBtn"} onClick={() =>signInWithEmailAndPassword(email, pw)}>
                Sign In
        </button>
        <br/>
        <h1 id={"alt-signIn"} >or sign in with</h1>
        <hr/>
        <button className={"logInBtn"} id={"googleBtn"}onClick={() => signInWithGoogle()}>
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
        return <div className={"logInCenter"}>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p className={"logInCenter"}>Signing up…</p>
    }
    return <div className={"logInCenter"}>
        {error && error.message === "Firebase: Error (auth/email-already-in-use)." && <p>Error: Email Already Exists</p>}
        {error && error.message === "Firebase: Error (auth/invalid-email)." && <p>Error: Invalid Email</p>}
        {error && error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."
            && <p>Error: Password needs to be at least 6 characters</p>}
        <h1 className={"logInText"}>Sign Up</h1>
        <br/>
        <label htmlFor='email'>Email: </label>
        <br/>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>Password: </label>
        <br/>
        <input type="password" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button className={"logInBtn"} onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Sign Up
        </button>
    </div>
}


function SignedInApp(props) {
    // query for folders collection
    const foldersQuery = query(collection(db, collectionName), where("sharedUsers", "array-contains", props.user.email));
    // retrieving the list of folders
    const [folders, loading, error] = useCollectionData(foldersQuery);
    // status of the "Tasks to complete" button
    const [hideComplete, setHideComplete] = useState(false);
    const storedTasks = {};

    // storing tasks
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
        return uniqueId;
    }

    // adding a new folder
    function addNewFolder() {
        const uniqueId = generateUniqueID();
        void setDoc(doc(db, collectionName, uniqueId),
            {
                owner: props.user.email,
                sharedUsers: [props.user.email],
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
    }

    function deleteFolder(folderId) {
        void deleteDoc(doc(db,collectionName, folderId));
    }

    // Error and Loading check
    if (loading) {
        return "loading..."
    }
    if (error) {
        return <>error</>
    }
        return <>
                <Taskbar setHideComplete={setHideComplete} hideComplete={hideComplete}
                         DeleteCompletedTasks={deleteCompletedTasks}/>
                <Folders data={folders} db={db} setFolderProperty={setFolderProperty} setTaskProperty={setTaskProperty}
                         hideComplete={hideComplete} addNewTask={addNewTask} storeTasks={storeTasks} deleteFolder={deleteFolder}
                         user={props.user}/>
                <BottomBar addNewFolder={addNewFolder}/>
        </>
}
export default App;