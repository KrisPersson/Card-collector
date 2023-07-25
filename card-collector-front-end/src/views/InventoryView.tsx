import "./InventoryView.scss"
import { useState, useEffect } from "react"

import AddNewCardModal from "../components/AddNewCardModal"
import EditCardModal from "../components/EditCardModal"

import InventoryCard from "../components/InventoryCard"
import { getInventory } from "../api"
import { Card } from "../interfaces"
import { emptyCard } from "../utils"


function InventoryView() {

    const [cardBeingEdited, setCardBeingEdited] = useState<Card>(emptyCard)
    const [showAddCardModal, setShowAddCardModal] = useState(false)
    const [showEditCardModal, setShowEditCardModal] = useState(false)
    const [currentUserCards, setCurrentUserCards] = useState<Card[]>([])

    async function getLatestUserCards() {
        const response = await getInventory(localStorage.getItem('userId') || '', localStorage.getItem('userToken') || '')
        if (response.success) {
            setCurrentUserCards([...response.cards])
        }
    }

    useEffect(() => {
        getLatestUserCards()
    },[])


    function handleOpenEdit(values: Card) {
        setCardBeingEdited(() => {
            return {...values}
        })
        setShowEditCardModal(true)
        scroll(0,0)
    }

    function sortTableElementsBy(elements: Card[], prop: string) {
        const elems = [...elements]
        if (prop !== 'firstname' && prop !== 'lastname' && prop !== 'teamname') {
            if (elems[0][prop] >= elems[elems.length - 1][prop]) {
                elems.sort((a: Card, b: Card) => {
                    if (a[prop] > b[prop]) {
                        return 1
                    } else if (a[prop] < b[prop]) {
                        return -1
                    } else {
                        return 0
                    }
                }) 
            } else {
                elems.sort((a: Card, b: Card) => {
                    if (a[prop] < b[prop]) {
                        return 1
                    } else if (a[prop] > b[prop]) {
                        return -1
                    } else {
                        return 0
                    }
                }) 
            }
        } else {
            if (elems[0].players[0][prop] < elems[elems.length - 1].players[0][prop]) {
                elems.sort((a: Card, b: Card) => {
                    if (a.players[0][prop] < b.players[0][prop]) {
                        return 1
                    } else if (a.players[0][prop] > b.players[0][prop]) {
                        return -1
                    } else {
                        return 0
                    }
                }) 
            } else {
                elems.sort((a: Card, b: Card) => {
                    if (a.players[0][prop] > b.players[0][prop]) {
                        return 1
                    } else if (a.players[0][prop] < b.players[0][prop]) {
                        return -1
                    } else {
                        return 0
                    }
                }) 
            }
             
        }
        setCurrentUserCards([...elems])
    }


    return (
        <div className="view inventory-view">
            {
                showAddCardModal && 
                <AddNewCardModal
                    setShowAddCardModal={ setShowAddCardModal }
                    getLatestUserCards={ getLatestUserCards }
                />
            }
            {
                showEditCardModal && 
                <EditCardModal
                    setShowEditCardModal={ setShowEditCardModal }
                    getLatestUserCards={ getLatestUserCards }
                    initialValues={ cardBeingEdited }
                />
            }
            <button onClick={ () => setShowAddCardModal(true) }>Add Card(s)</button>
            <table className="inventory-table">
                <thead>
                    <tr className="table-row table-row--head">
                        <th onClick={() => sortTableElementsBy(currentUserCards, "firstname")} className="table-column table-column__firstname">Firstname</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "lastname")} className="table-column table-column__lastname">Lastname</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "teamname")} className="table-column table-column__teamname">Team</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "season")} className="table-column table-column__season">Season</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "product")} className="table-column table-column__product">Product</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "setName")} className="table-column table-column__setname">Card-set name</th>
                        <th className="table-column table-column__features">Features</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "comment")} className="table-column table-column__comment">Comment</th>
                        <th className="table-column table-column__status">Status</th>
                        <th onClick={() => sortTableElementsBy(currentUserCards, "price")} className="table-column table-column__price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    { currentUserCards.length > 0 && 
                        currentUserCards.map((card, i)=> {
                            return <InventoryCard 
                                key={ i }
                                cardData={ card }
                                handleOpenEdit={ handleOpenEdit }
                                />
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default InventoryView
