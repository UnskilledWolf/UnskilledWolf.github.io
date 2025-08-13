window.addEventListener("load", e =>
{
    const copyableLineTargets = Array.from(document.querySelectorAll('*[data-copyable="line"]'))
    copyableLineTargets.forEach(element =>
    {
        element.dataset["copyableState"] = "Click to Copy"

        // Click
        element.addEventListener("click", async (e) =>
        {
            const target = e.currentTarget;
            target.classList.remove("pulse")
            const success = await writeClipboardText(target.innerText)
            target.classList.add("pulse")
            target.dataset["copyableState"] = success ? "Copied" : "Copy Error"
        })
    })
})

async function writeClipboardText(text)
{
    try
    {
        await navigator.clipboard.writeText(text);
        return true
    } catch (error)
    {
        console.error(error.message);
        return false
    }
}