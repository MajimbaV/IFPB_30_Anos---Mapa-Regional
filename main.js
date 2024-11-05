const width = "1260"
const height = ""
const urlSVG = "assets/PB_Municipios_2022.svg"
const urlJSON = "assets/municipios.json"



populate()

async function populate(){
    const response = await fetch(urlJSON)
    if(!response.ok) throw new Error(`Erro ao carregar o JSON: ${response.status}`);
    const data = await response.json()

    carregarSVG(urlSVG, width, height, data)
}


function detalharMunicipio(municipio, data){
    for(let item of data){
        if(municipio.id.toLowerCase().includes(item.municipio.toLowerCase())){
            municipio.classList.add("destaque")
            municipio.addEventListener("click", () => {
                console.log(`Municipio: ${item.municipio} - ${item.uf}: ${item.quantidade} Alunos`)
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