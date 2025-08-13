const DYNAMIC_IMPULSE_CANVAS_MARGIN_LEFT = 12
const DYNAMIC_IMPULSE_CANVAS_WIDTH = 50

var dynamicImpulseCanvas = null
var dynamicImpulseCtx = null
var dynamicImpulseResizeTimeout = null

window.addEventListener("load", e =>
{
    // Add the hover events for each element
    const dynamicImpulses = Array.from(document.querySelectorAll('*[data-impulse]'))
    dynamicImpulses.forEach(element =>
    {
        element.addEventListener("mouseenter", e => dynamicHover(e.currentTarget.dataset.impulse, true))
        element.addEventListener("mouseleave", e => dynamicHover(e.currentTarget.dataset.impulse, false))
    })

    // Create canvas
    dynamicImpulseCanvas = document.createElement("canvas")
    dynamicImpulseCanvas.width = DYNAMIC_IMPULSE_CANVAS_WIDTH;
    dynamicImpulseCanvas.id = "dynamic-impulse-canvas"
    dynamicImpulseCtx = dynamicImpulseCanvas.getContext("2d")
    resetDynamicCanvas()

    // Append the canvas
    const primaryContent = document.getElementById("primary-content");
    primaryContent.appendChild(dynamicImpulseCanvas)
})

window.addEventListener('resize', e =>
{
    clearTimeout(dynamicImpulseResizeTimeout);
    dynamicImpulseResizeTimeout = setTimeout(resetDynamicCanvas, 0.5);
});

function resetDynamicCanvas()
{
    const primaryContent = document.getElementById("primary-content");
    const size = primaryContent.getBoundingClientRect()

    dynamicImpulseCanvas.height = size.height;

    dynamicImpulseCtx.clearRect(0, 0, DYNAMIC_IMPULSE_CANVAS_WIDTH, size.height)
}

function dynamicHover(name, isEntering)
{
    // Clear the canvas
    dynamicImpulseCtx.clearRect(0, 0, DYNAMIC_IMPULSE_CANVAS_WIDTH, dynamicImpulseCanvas.height)
    dynamicImpulseCtx.strokeStyle = "white";
    dynamicImpulseCtx.lineWidth = 2;

    const targets = Array.from(document.querySelectorAll(`*[data-impulse="${name}"]`))

    let minHeight = Infinity
    let maxHeight = -Infinity

    targets.forEach(t =>
    {
        if (isEntering)
        {
            t.classList.add("hover")

            const height = t.offsetTop + t.offsetHeight / 2
            minHeight = Math.min(height, minHeight)
            maxHeight = Math.max(height, maxHeight)

            // Horizontal line
            dynamicImpulseCtx.beginPath()
            dynamicImpulseCtx.moveTo(t.offsetLeft, height)
            dynamicImpulseCtx.lineTo(DYNAMIC_IMPULSE_CANVAS_MARGIN_LEFT, height)
            dynamicImpulseCtx.stroke()
        }
        else
            t.classList.remove("hover")

    })

    // Vertical Line
    if (isEntering)
    {
        dynamicImpulseCtx.beginPath()
        dynamicImpulseCtx.moveTo(DYNAMIC_IMPULSE_CANVAS_MARGIN_LEFT, minHeight)
        dynamicImpulseCtx.lineTo(DYNAMIC_IMPULSE_CANVAS_MARGIN_LEFT, maxHeight)
        dynamicImpulseCtx.stroke()
    }
}