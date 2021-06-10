import app from 'firebase/app';

const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file


export const InputFileChange = (propertyId) => {
    var that = document.getElementById("property-images");
    for (var i = 0; i < that.files.length; i++) {
        var filesName = that.files[i].name;
        var fileBloc = document.createElement('span');
        var fileDelete = document.createElement('span');
        fileBloc.className = "file-block";
        fileBloc.id = "file-block";
        fileDelete.className = "file-delete";
        fileDelete.id = "file-delete";
        fileDelete.onclick = InputFileDelete.bind(fileBloc);
        fileDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>'
        if (filesName.length > 30) {
            var fileExtension = filesName.split(".").pop();
            fileBloc.innerHTML = '<span class="name" for ="'+propertyId+'" value="' + filesName + '">' + filesName.substr(0, 27) + "..." + fileExtension + '</span>';
        }
        else {
            fileBloc.innerHTML = '<span class="name" for ="'+propertyId+'" value="' + filesName + '">' + filesName + '</span>';
        }
        fileBloc.prepend(fileDelete);
        document.getElementById("filesList").appendChild(fileBloc);
        if(propertyId != null){
        //ajout de l'image dans le storage 
        app.storage().ref("image/property/" + propertyId).child(that.files[i].name).put(that.files[i]);
        }
    };
    // Ajout des fichiers dans l'objet DataTransfer
    for (let file of that.files) {
        dt.items.add(file);
    }
    // Mise à jour des fichiers de l'input file après ajout
    that.files = dt.files;
   
};

// // EventListener pour le bouton de suppression créé
export const InputFileDelete = (event) => {
    var name = "";
    event.path.forEach(span => {
        if (span.className === "file-block") {
            name = span.childNodes[1].getAttribute("value");
            for (let i = 0; i < dt.items.length; i++) {
                // Correspondance du fichier et du nom
                if (name === dt.items[i].getAsFile().name) {
                    if (span.childNodes[1].getAttribute("for") != "null") {
                        // Create a reference to the file to delete
                        var desertRef = app.storage().ref("image/property/" + span.childNodes[1].getAttribute("for")).child(name);
                        // Delete the file
                        desertRef.delete().then(() => {
                            console.log("delete");
                        }).catch((error) => {
                            console.log("fail");
                        });
                    }
                    // Suppression du fichier dans l'objet DataTransfer
                    dt.items.remove(i);
                    span.remove();
                    continue;
                }
            }
            document.getElementById("property-images").files = dt.files;
        }
    });
};

export const GetFile = () => {
    return dt.files;
};

export const SetInputFile = (file, propertyId) => {
    var filesName = file.name;
    var fileBloc = document.createElement('span');
    var fileDelete = document.createElement('span');
    fileBloc.className = "file-block";
    fileBloc.id = "file-block";
    fileDelete.className = "file-delete";
    fileDelete.id = "file-delete";
    fileDelete.onclick = InputFileDelete.bind(fileBloc);
    fileDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>'
    if (filesName.length > 30) {
        var fileExtension = filesName.split(".").pop();
        fileBloc.innerHTML = '<span class="name" for="' + propertyId + '" value="' + filesName + '">' + filesName.substr(0, 27) + "..." + fileExtension + '</span>';
    }
    else {
        fileBloc.innerHTML = '<span class="name" for="' + propertyId + '" value="' + filesName + '">' + filesName + '</span>';
    }
    dt.items.add(file);

    fileBloc.prepend(fileDelete);
    document.getElementById("filesList").appendChild(fileBloc);
    // Mise à jour des fichiers de l'input file après ajout
    document.getElementById("property-images").files = dt.files;
};