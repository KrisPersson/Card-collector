import "./InventoryView.scss"
import { useState } from "react"

import AddNewCardModal from "../components/AddNewCardModal"

function InventoryView() {

    const [showAddCardModal, setShowAddCardModal] = useState(false)

    return (
        <div className="view inventory-view">
            <AddNewCardModal
                setShowAddCardModal={ setShowAddCardModal }
            />
        </div>
    )
}

export default InventoryView
