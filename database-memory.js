import { randomUUID } from "crypto"

export class DatabaseMemory{
#locads = new Map()

list(search){
    return Array.from(this.#locads.entries()).map((locadsArray) =>{
    // acessando primeira posição
        const id = locadsArray[0]
        const data = locadsArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(locad => {
        if (search){
            return locad.titulo.includes(search)
        }
        return true
    })
}
create(locad){
    const locadId = randomUUID()
    this.#locads.set(locadId, locad)
}
update(id, locad){
    this.#locads.set(id, locad)
}
delete(id, locad){
    this.#locads.delete(id, locad)
}
}