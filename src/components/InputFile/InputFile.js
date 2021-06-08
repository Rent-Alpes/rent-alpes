const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file

export const InputFileChange = () => {
    var that = document.getElementById("property-images");
    for (var i = 0; i < that.files.length; i++) {
        var filesName = that.files.item(i).name;
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
            fileBloc.innerHTML = '<span class="name" value="' + filesName + '">' + filesName.substr(0, 27) + "..." + fileExtension + '</span>';
        }
        else {
            fileBloc.innerHTML = '<span class="name" value="' + filesName + '">' + that.files.item(i).name + '</span>';
        }
        fileBloc.prepend(fileDelete)
        document.getElementById("filesList").appendChild(fileBloc);
    }
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
    //let name = e.next("span.name").text();
    event.path.forEach(span => {
        if (span.className == "file-block") {
            name = span.childNodes[1].getAttribute("value");
            span.remove();
            for (let i = 0; i < dt.items.length; i++) {
                // Correspondance du fichier et du nom
                if (name === dt.items[i].getAsFile().name) {
                    // Suppression du fichier dans l'objet DataTransfer
                    dt.items.remove(i);
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
