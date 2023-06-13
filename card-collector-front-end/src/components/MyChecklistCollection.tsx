import "./MyChecklistCollection.css"

function MyChecklistCollection({ userChecklistCollection, selectedChecklists, updateSelectedChecklists, setShowCreateChecklistModal }) {



    const liItems = userChecklistCollection.map(checklist => {
            const className = selectedChecklists.includes(checklist.id) ? "collection-item collection-item--selected" : "collection-item"
        return (
            <li 
                key={ checklist.id } 
                id={ checklist.id } 
                onClick={ (e) => updateSelectedChecklists(e.target.id) } 
                className={ className }

            >
                
                { checklist.company } { checklist.season } { checklist.product } { checklist.setName }
            </li>)
    })

    return (
        <section className="user-checklist-collection">
            <button onClick={ () => setShowCreateChecklistModal((prev) => !prev) } className="add-btn"><i className="fa-solid fa-plus"></i></button>
            
            <h3>My Checklist Collection</h3>
            <ul className="collection">
                { liItems.length > 0 ? liItems : <li>No saved checklists</li> }
            </ul>
        </section>
    )
}

export default MyChecklistCollection
