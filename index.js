const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const fontSize = document.getElementById("fontSize");
const clearBtn = document.getElementById("clear")
const saveBtn = document.getElementById("save")
const reteriveBtn = document.getElementById("reterive")
const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

let isDrawing = false;
let lastX
let lastY

colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value
})

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;

    lastX = e.offsetX
    lastY = e.offsetY
})

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke();
        lastX = e.offsetX
        lastY = e.offsetY
    }
})

canvas.addEventListener("mouseup", (e) => {
    isDrawing = false
})

canvasColor.addEventListener("change", (e) => {
    ctx.fillStyle = e.target.value
    ctx.fillRect(0, 0, 800, 500)
})

fontSize.addEventListener("change", (e) => {
    ctx.lineWidth = e.target.value
})

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

saveBtn.addEventListener("click", () => {
    localStorage.setItem("canvasContent", canvas.toDataURL())
    let link = document.createElement("a")
    link.download = "myCanvas.png";
    link.href = canvas.toDataURL()
    link.click();
})

reteriveBtn.addEventListener("click", () => {
    let savedCanvas = localStorage.getItem("canvasContent")
    if (savedCanvas) {
        let img = document.createElement("img")
        img.src = savedCanvas
        ctx.drawImage(img, 0, 0

        )
    }
})