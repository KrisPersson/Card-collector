import { Card } from "./interfaces"

function findJsonSet(productSets, setName) {
    
    const actualSet = productSets.find(set => set.setName === setName)
    const arr: string[] = []
    if (!actualSet) {
        productSets.forEach(set => {
            if (set.parallelSets) {
                const foundSet = set.parallelSets.find(paraSet => paraSet.name === setName)
                if (foundSet !== undefined) {
                    arr.push(set)
                }
            }
        })
    }

    return actualSet || arr[0]
}

const emptyCard: Card = {
    players: [{tempId: 1, firstname: "", lastname: "", teamname: "", role: "Player"}],
    manufacturer: "",
    season: "",
    product: "",
    setName: "",
    setType: "",
    serial: "",

    numberedTo: "",
    competition: "NHL",

    rookie: false,
    autograph: false,
    memorabilia: false,
    jerseyNumMatch: false,
    colorMatch: false,
    checklistCard: false,
    stickerCard: false,
    promoCard: false,
    printingError: false,

    pc: false,
    comment: "",
    copies: 1,
    price: 0,
    clNum: "",
    location: "",
    origin: "",
    grade: "",
    grader: "",
}

function extractChangesOnlyBeforePostingEdit(initialValues: Card, formState: Card) {

    const result: Card = {}

    for (const key in initialValues) {
        if (initialValues[key] != formState[key] && key !== "_id") {
            result[key] = formState[key]
        }
    }
    console.log(result)
    return result
}




export { findJsonSet, emptyCard, extractChangesOnlyBeforePostingEdit }
