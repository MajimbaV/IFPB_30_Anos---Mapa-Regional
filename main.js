const width = "100%"
const height = ""
const urlSVG = "assets/PB.svg"
const urlJSON = "assets/municipios.json"


populate()

async function populate(){
    const response = await fetch(urlJSON)
    if(!response.ok) throw new Error(`Erro ao carregar o JSON: ${response.status}`);
    const data = await response.json()

    carregarSVG(urlSVG, width, height, data)
}


let popup

function mostrarPopUp(event, municipioObject){
    if (popup){
        let novoPopup = document.getElementById("area_"+ municipioObject.municipio)
        if (novoPopup === popup) {
            popup.className = "popup-escondido"
            popup = ""
            return
        }

        popup.className = "popup-escondido"

        popup = novoPopup
    }else{
        popup = document.getElementById("area_"+ municipioObject.municipio)
    }

    popup.className = "popup"

    let x = event.clientX + window.scrollX + 10
    let y = event.clientY + window.scrollY - popup.offsetHeight/4
    const containerHeight = document.getElementById("container-mapa").offsetHeight

    if(y + popup.offsetHeight > containerHeight*1.6) y = y - 200

        Object.assign(popup.style, {
            left: `${x}px`,
            top: `${y}px`
        })
    
}

function detalharMunicipio(municipio, data){
    for(let item of data){
        if(municipio.id.toLowerCase().includes(item.municipio.toLowerCase())){
            municipio.classList.add("destaque")
            municipio.addEventListener("click", (event) => {
                mostrarPopUp(event, item)
            })
        }    
        }
    }

async function carregarSVG(urlSVG, width, height, data) { // Função que carrega e coloca na página o SVG presente na URL
    const response = await fetch(urlSVG)
    if(!response.ok) throw new Error(`Erro ao carregar o SVG: ${response.status}`);
    const svgText = await response.text()

    container = document.getElementById("container-mapa")
    container.innerHTML = svgText

    const svgElement = document.getElementsByTagName("svg")[0]
    svgElement.setAttribute("width", width)
    svgElement.setAttribute("height", height)
    const paths = document.getElementsByTagName("path")
    for(let path of paths){
        path.classList.add("municipio")
        detalharMunicipio(path, data)
}}