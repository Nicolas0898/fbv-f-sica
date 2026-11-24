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
}

const direcoes={
    "cima":vector3(0,1,0),
    "baixo":vector3(0,-1,0),
    "esquerda":vector3(-1,0,0),
    "direita":vector3(1,0,0),
    "frente":vector3(0,0,-1),
    "trás":vector3(0,0,1),
}
