let dataArray = [];
let currentIndex = 0;
let viz;
let file = "";

// Fetch the JSON data when the page loads
window.onload = function () {
    fetch("outputs/data.json")
        .then(response => response.json())
        .then(data => {
            dataArray = data.asyncData.slice(1);
            Viz.instance().then(function (v) {
                viz = v;
                displayItem(currentIndex);
                updateButtons();
                updateCount();
            });
            document.getElementById("editor").value = `// ${data.filename}
${data.file}`;
        })
        .catch(error => {
            document.getElementById("content").innerText =
                "Failed to load data.json";
            console.error("Error loading data.json:", error);
        });
    fetch("outputs/stdout.log")
        .then(response => {
            if (!response.ok) {
                throw new Error(
                    "Network response was not ok " + response.statusText
                );
            }
            return response.text();
        })
        .then(data => {
            const codemirrorElement = document.getElementById("output");
            if (codemirrorElement){
                codemirrorElement.value = data;
            }
        })
        .catch(error => {
            document.getElementById("output").innerText =
                "Failed to load stdout";
            console.error("Error loading stdout:", error);
        });
};

// Display the current item
function displayItem(index) {
    const contentDiv = document.getElementById("content");
    const s = viz.renderSVGElement(dataArray[index]);
    // NOTE: hack, bad
    const polygons = s.getElementsByTagName("polygon");
    for (let i = 0; i < polygons.length; i++) {
        const polygon = polygons[i];
        const fillColor = polygon.getAttribute("fill");
        const strokeColor = polygon.getAttribute("stroke");
        if (fillColor === "white" && strokeColor === "none") {
            polygon.parentNode.removeChild(polygon);
        }
    }

    contentDiv.replaceChildren(s);
}

// Update button states (disable if no previous/next)
function updateButtons() {
    document.getElementById("prevBtn").disabled = currentIndex <= 0;
    document.getElementById("nextBtn").disabled =
        currentIndex >= dataArray.length - 1;
    document.getElementById("startBtn").disabled = currentIndex <= 0;
    document.getElementById("endBtn").disabled =
        currentIndex >= dataArray.length - 1;
}
function updateCount() {
    document.getElementById("count").innerText = `${currentIndex + 1}/${
        dataArray.length
    }`;
}

// Previous button click
document.getElementById("prevBtn").addEventListener("click", function (e) {
    if (currentIndex > 0) {
        currentIndex--;
        displayItem(currentIndex);
        updateButtons();
        updateCount();
    }
});

// Next button click
document.getElementById("nextBtn").addEventListener("click", function () {
    if (currentIndex < dataArray.length - 1) {
        currentIndex++;
        displayItem(currentIndex);
        updateButtons();
        updateCount();
    }
});

// Start button click
document.getElementById("startBtn").addEventListener("click", function () {
    currentIndex = 0;
    displayItem(currentIndex);
    updateButtons();
    updateCount();
});

// End button click
document.getElementById("endBtn").addEventListener("click", function () {
    currentIndex = Math.max(dataArray.length - 1, 0);
    displayItem(currentIndex);
    updateButtons();
    updateCount();
});

document.getElementById("console-btn").addEventListener("click", function () {
    setTimeout(() => {
        const codemirrorElement = document.getElementById("output");
        if (codemirrorElement.editor) {
            codemirrorElement.editor.refresh();
        }
    }, 10);
});
