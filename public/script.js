const editor = CodeMirror.fromTextArea(document.getElementById("textarea"), {
    lineNumbers: true,
    theme:"dracula"
});
function setEditorSize() {
    const windowHeight = window.innerHeight;
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const marginFromBottom = 80; // Adjust this value as needed
    const remainingHeight = windowHeight - navbarHeight - marginFromBottom;

    // Set the width to full width and the height to the remaining height
    editor.setSize("100%", remainingHeight);
}

// Call the function initially and whenever the window is resized
setEditorSize();
window.addEventListener("resize", setEditorSize);
//editor.setSize(500, 300);

const sendData = async () => {
    try {
        const response = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": 100,
                "body": "hello-world"
            }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

/*
const id = 1;
const getData = async () => {
    try {
        const response = await fetch(`/raw/${id}`, { method: 'GET' });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};*/
