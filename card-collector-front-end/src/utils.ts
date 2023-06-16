
function findJsonSet(productSets, setName) {
    
    let actualSet = productSets.find(set => set.setName === setName)
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

export { findJsonSet }
