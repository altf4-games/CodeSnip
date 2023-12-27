const editor = CodeMirror.fromTextArea(document.getElementById("textarea"), {
    lineNumbers: true,
    theme: "dracula",
    mode: "text/x-csrc",
});

const setEditorSize = () => {
    const windowHeight = window.innerHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const marginFromBottom = 80;
    const remainingHeight = windowHeight - navbarHeight - marginFromBottom;
    
    editor.setSize("100%", remainingHeight);
};

setEditorSize();
window.addEventListener("resize", setEditorSize);
const idInput = document.getElementsByClassName("id")[0];
const searchInput = document.getElementsByClassName("search-bar")[0];
idInput.value = Math.floor(Math.random() * 65536);

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
        
        await response.json().then(() => {
            window.open(`/raw/${idInput.value}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

const getData = async (id) => {
    try {
        const response = await fetch(`/raw/${id}`, { method: 'GET' });
        return response;
    } catch (error) {
        return null;
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
};

const checkIfIDExists = async () => {
    const id = idInput.value;
    if (id == null) {
        return true;
    }
    const response = await getData(id);
    if (!response || response.status === 404) {
        return false;
    } else {
        alert("A paste already exists with this ID");
        return true;
    }
};

const search = () => {
    if (searchInput.value.length == 0) {
        return;
    }
    const url = '/raw/' + searchInput.value;
    window.open(url);
};

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