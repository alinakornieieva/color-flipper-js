const cols = document.querySelectorAll('.col');

// function generateColor() {
//     const hexCodes = '0123456789abcdef';
//     let color = '';
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length )]
//     }
//     return '#'+color;
// }

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === 'Space') getRandomColor();
})

document.addEventListener('click', (event) =>{
    const type = event.target.dataset.type;
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
          ? event.target
          : event.target.children[0]
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }   
    else if (event.code = 'text') copyColorCode(event.target.textContent);
})

function getRandomColor() {
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        if (isLocked) {
            return
        }
        const title = col.querySelector('h2');
        const btn = col.querySelector('button');
        // const currentColor = generateColor();
        const currentColor = chroma.random();
        title.textContent = currentColor;
        col.style.background = currentColor;
        setTextColor(title, currentColor);
        setTextColor(btn, currentColor)
  })
}

function setTextColor(title, color){
    const luminance = chroma(color).luminance();
    title.style.color = luminance > 0.5  ? 'black' : 'white'
}

function copyColorCode(text){
    return navigator.clipboard.writeText(text);
}

getRandomColor();

