const editor = CodeMirror.fromTextArea(document.getElementById("textarea"), {
    lineNumbers: true,
    theme:"dracula"
});

const setEditorSize = () => {
    const windowHeight = window.innerHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const marginFromBottom = 80;
    const remainingHeight = windowHeight - navbarHeight - marginFromBottom;
    
    editor.setSize("100%", remainingHeight);
}

setEditorSize();
window.addEventListener("resize", setEditorSize);
const idInput = document.getElementsByClassName("id")[0];
const searchInput = document.getElementsByClassName("search-bar")[0];

const sendData = async () => {
    if (checkIfIDInRange() == false)
        return;
    if (checkIfIDExists() == true)
        return;
    try {
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": idInput.value,
                "body": editor.getValue(),
            }),
        });
        
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const getData = async (id) => {
    try {
        const response = await fetch(`/raw/${id}`, { method: 'GET' });
        const data = await response.text()
        return data;
    } catch (error) {
        return undefined;
    }
};

const checkIfIDInRange = () => {
    const id = parseInt(idInput.value, 10);

    if (isNaN(id) || id % 1 !== 0) {
        alert("Invalid ID: Not an integer");
        return false;
    }

    if (id < 1 || id > 65536) {
        alert("Invalid ID: Out of bounds");
        return false;
    }

    return true;
}

const checkIfIDExists = async () => {
    const id = idInput.value;
    if (id == null) {
        return true;
    }
    const response = await getData(id);
    if (response === undefined) {
        return false;
    } else {
        alert("A paste already exists with this ID");
        return true;
    }
};

const search = () => {
    if (searchInput.value == null) {
        return;
    }
    const url = '/raw/' + searchInput.value;
    window.open(url);
}

let darkMode = true;
const darkModeToggle = () => {
    darkMode = !darkMode;
    document.getElementsByTagName("body")[0].classList.toggle("white-mode");
    if (darkMode) {
        editor.setOption("theme", "dracula");
    } else {
        editor.setOption("theme", "xq-light");
    }
};