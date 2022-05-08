function ShareUser(props) {
    props.setFolderProperty(props.folder.id, "sharedUsers", props.folder.sharedUsers.concat("joel.tanaristy@gmail.com"));
    return
}