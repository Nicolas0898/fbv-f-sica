class vector3{
    x
    y
    z

    constructor(x,y,z){
        this.x = x
        this.y = y
        this.z = z
    }

    //TODO: Implementar cross products 

    multiply_scalar(n){
        return new vector3(this.x*n,this.y*n,this.z*n)
    }

    round(){
        return new vector3(Math.round(this.x),Math.round(this.y),Math.round(this.z))
    }

    cross_product(other){
       return new vector3(
        this.y*other.z - this.z*other.y,
        this.x*other.z - this.z*other.x,
        this.x*other.y-this.y*other.x
        ) 
    }

    left_hand_cross(other){
        return this.cross_product(other).multiply_scalar(-1)
    }

    equals(other){
        return (this.x==other.x && this.y==other.y && this.z == other.z)
    }

    toString(){
        return `(${this.x},${this.y},${this.z})`
    }
}

const direcoes= {
    "cima": new vector3(0,1,0),
    "baixo": new vector3(0,-1,0),
    "esquerda":new vector3(-1,0,0),
    "direita":new vector3(1,0,0),
    "frente":new vector3(0,0,-1),
    "tras":new vector3(0,0,1)
}

const getnamefromdir = dir=>{
    const rdir = dir.round()
    for(const [nome,d] of Object.entries(direcoes)){
        if(rdir.equals(d)){
            return nome
        }
    }
}

const getdirfromname = name=>{
    return direcoes[name]
}

const r1 = direcoes.cima.cross_product(direcoes.esquerda)
const r2 = direcoes.esquerda.cross_product(direcoes.frente)

//////////////////////////////////////////
// CONTROLE DA UI
//////////////////////////////////////////

const forca_input = document.getElementById("forca")
const campo_input = document.getElementById("campo")
const velocidade_input = document.getElementById("velocidade")
const calcbtn = document.getElementById("calcbtn")


forca_input.onchange = updateWarning
campo_input.onchange = updateWarning
velocidade_input.onchange = updateWarning

const nomeresult = document.getElementById("nomeresult")
const dirresult = document.getElementById("dirresult")
const vectorresult = document.getElementById("vectorresult")

const getorder = ()=>{
    let defined = []
    let x
    if(forca_input.value=="x") {x = forca_input;} else {defined.push(forca_input)}
    if(campo_input.value=="x") {x = campo_input;} else {defined.push(campo_input)}
    if(velocidade_input.value=="x") {x = velocidade_input;} else {defined.push(velocidade_input)}

    const valid = defined.length == 2

    return {
        isvalid:valid,
        order:[...defined,x],
        x:x
    }
    
}

calcbtn.addEventListener("click",(e)=>{
    const order = getorder()
    console.log(order)


    if(!order.isvalid){
        console.warn("Order is not valid!")
        nomeresult.textContent="Formato inserido inválido! " + (order.x ? "Duas ou mais incógnitas!" : "Nenhuma incógnita!")
        dirresult.textContent =""
        vectorresult.textContent =""
        return
    }
    let vec1 = order.order[0]
    let vec2 = order.order[1]    

    let dir1 = getdirfromname(vec1.value) 
    let dir2 = getdirfromname(vec2.value) 
    let result = dir1.left_hand_cross(dir2)

    if(order.x.id=="campo"||order.x.id=="forca"){
        result = result.multiply_scalar(-1)
    } 

    const resultname = getnamefromdir(result)
    nomeresult.textContent=order.x.id
    dirresult.textContent = resultname ?? "Nome indefinido" 
    vectorresult.textContent = result.toString() 

})

const erroralert = document.getElementById("erroralert")
const errromsg = document.getElementById("errormsg")
function updateWarning(){
    const order = getorder()
    if(order.isvalid){
        let vec1 = order.order[0]
        let vec2 = order.order[1]    

        let dir1 = getdirfromname(vec1.value) 
        let dir2 = getdirfromname(vec2.value) 
        let result = dir1.left_hand_cross(dir2)

        if(result.equals(new vector3(0,0,0)) ){
            erroralert.classList.remove("d-none")
            errromsg.textContent="Vetores inválidos selecionados!"
        }else{
            erroralert.classList.add("d-none") 
        }
    
    } else{
        erroralert.classList.remove("d-none")
        errromsg.textContent="Formato inválido inserido: " + (order.x ? "Duas ou mais incógnitas!" : "Nenhuma incógnita!")
    }
}