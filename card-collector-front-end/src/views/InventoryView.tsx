import "./InventoryView.scss"
import { useState, useEffect } from "react"

import AddNewCardModal from "../components/AddNewCardModal"
import EditCardModal from "../components/EditCardModal"

import InventoryCard from "../components/InventoryCard"
import { getInventory } from "../api"
import { Card } from "../interfaces"


function InventoryView() {

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
                />
            }
            <button onClick={ () => setShowAddCardModal(true) }>Add Card(s)</button>
            <table className="inventory-table">
                <thead>
                    <tr className="table-row table-row--head">
                        <th className="table-column table-column__firstname">Firstname</th>
                        <th className="table-column table-column__lastname">Lastname</th>
                        <th className="table-column table-column__teamname">Team</th>
                        <th className="table-column table-column__season">Season</th>
                        <th className="table-column table-column__product">Product</th>
                        <th className="table-column table-column__setname">Card-set name</th>
                        <th className="table-column table-column__features">Features</th>
                        <th className="table-column table-column__comment">Comment</th>
                        <th className="table-column table-column__status">Status</th>
                        <th className="table-column table-column__price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    { currentUserCards.length > 0 && 
                        currentUserCards.map(card => {
                            return <InventoryCard cardData={ card } />
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default InventoryView
