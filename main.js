const width = "720"
const height = "960"
const url = "assets/Municipios.svg"

carregarSVG(url, width, height)

async function carregarSVG(url, width, height) { //Função que carrega e coloca na página o SVG presente na URL
    const response = await fetch(url)
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
        path.addEventListener("click", () =>{
            console.log(path.id)
        })
    }
}