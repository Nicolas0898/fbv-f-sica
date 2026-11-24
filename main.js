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
}

const direcoes= {
    "cima": new vector3(0,1,0),
    "baixo": new vector3(0,-1,0),
    "esquerda":new vector3(-1,0,0),
    "direita":new vector3(1,0,0),
    "frente":new vector3(0,0,-1),
    "trás":new vector3(0,0,1)
}

const getdirfromname = dir=>{
    const rdir = dir.round()
    console.log(rdir)
    for(const [nome,d] of Object.entries(direcoes)){
        console.log(rdir.equals(d))
        if(rdir.equals(d)){
            return nome
        }
    }
}

const r1 = direcoes.cima.cross_product(direcoes.esquerda)
const r2 = direcoes.esquerda.cross_product(direcoes.frente)
console.log(r1,getdirfromname(r1))
console.log(r2,getdirfromname(r2))