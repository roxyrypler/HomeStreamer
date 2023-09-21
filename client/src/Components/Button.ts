

export default function Button(): HTMLElement {
    let HTML = `
    <button>Click Me</button>
    `;
    
    let element = document.createElement("div");
    element.innerHTML = HTML;
    return element;
}