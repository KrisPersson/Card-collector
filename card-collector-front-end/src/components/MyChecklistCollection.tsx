import "./MyChecklistCollection.scss"

function MyChecklistCollection({ userChecklistCollection, selectedChecklists, updateSelectedChecklists, setShowCreateChecklistModal }) {



    const liItems = userChecklistCollection.map(checklist => {
            const className = selectedChecklists.includes(checklist.id) ? "collection-item collection-item--selected" : "collection-item"
        return (
            <li 
                key={ checklist.id } 
                id={ checklist.id } 
                company={checklist.company}
                season={checklist.season}
                product={checklist.product}
                setname={checklist.setName}

                onClick={ (e) => updateSelectedChecklists(e.target.id) } 
                className={ className }

            >
                
                { checklist.setName }
            </li>)
    })

    function structureMyChecklistsBeforeRendering(liItems) {
        let structured = {}

        liItems.forEach(liItem => {
            const { company, season, product, setname } = liItem.props
            if (!structured[company]) {
                structured = {...structured, [company]: {}}
            }
            if (!structured[company][season]) {
                structured[company] = {...structured[company], [season]: {}}
            }
            if (!structured[company][season][product]) {
                structured[company][season] = {...structured[company][season], [product]: []}
            }
            structured[company][season][product].push(liItem.props.id)
        })
        return structured
    }
    function sortAndAssembleMyChecklistsBeforeRendering(structure, liItems) {

        let result = []
        let counter = 0
        for (const companyKey in structure) {
            result.push(<h4 key={counter}>{ companyKey }</h4>)
            counter++

            for (const seasonKey in structure[companyKey]) {
                result.push(<h4 key={counter}>{ seasonKey }</h4>)
                counter++
                for (const productKey in structure[companyKey][seasonKey]) {
                    result.push(<h4 key={counter}>{ productKey }</h4>)
                    counter++
                    structure[companyKey][seasonKey][productKey].forEach(checklistId => {
                        const foundLiItem = liItems.find(item => item.props.id === checklistId)
                        result.push(foundLiItem)
                        counter++
                    })
                }
            }
        }
        return result
    }
    console.log(liItems)
    console.log(structureMyChecklistsBeforeRendering(liItems))
    

    return (
        <section className="user-checklist-collection">
            <button onClick={ () => setShowCreateChecklistModal((prev) => !prev) } className="add-btn"><i className="fa-solid fa-plus"></i></button>
            
            <h3>My Checklists</h3>
            <ul className="collection">
                { liItems.length > 0 ? 
                sortAndAssembleMyChecklistsBeforeRendering(structureMyChecklistsBeforeRendering(liItems), liItems) 
                
                : <li>No saved checklists</li> }
            </ul>
        </section>
    )
}

export default MyChecklistCollection
