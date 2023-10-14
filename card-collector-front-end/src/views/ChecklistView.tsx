import "./ChecklistView.css"
import { useState, useEffect } from 'react'
import { Checklist } from "../components/Checklist"
import { ud9495checklist } from "../upperdeck9495"
import { ChecklistItem } from "../components/ChecklistItem"
import CreateNewChecklistForm from "../components/ChecklistForm"
import { CreateNewChecklistModal } from "../components/CreateNewChecklistModal"
import MyChecklistCollection from "../components/MyChecklistCollection"
import { AddNewCardModal } from "../components/AddNewCardModal"
import { BASE_URL } from "../api"
import setLists from "../../../back-end/JSONchecklists/checklists.json"
import { findJsonSet } from "../utils"
import { UserChecklist } from "../interfaces"

// const cardSet = setLists.upperdeck["1994-95"].series1.sets[1]

function ChecklistView() {

    const [userChecklistCollection, setUserChecklistCollection] = useState<UserChecklist[]>([])
    const [selectedChecklists, setSelectedChecklists] = useState<string[]>([])
    const [showCreateChecklistModal, setShowCreateChecklistModal] = useState<boolean>(false)
    const [refetchChecklistCollectionRefArr, setRefetchChecklistCollectionRefArr] = useState<number[]>([])

    useEffect(() => {
        const userId = localStorage.getItem('userId') as string
        const token = localStorage.getItem('userToken') as string
        getUserChecklistCollection(userId, token)
    }, [refetchChecklistCollectionRefArr])

    function updateSelectedChecklists(id: string) {
        if (!selectedChecklists.includes(id)) {
            setSelectedChecklists((prev) => [...prev, id])
        } else {
            const newCol = selectedChecklists.filter(checklist => {
                return checklist !== id
            })
            setSelectedChecklists([...newCol])
        }
    }

    function updateUserChecklistCollectionState(checklistId: string) {
        const newCol = userChecklistCollection.filter(checklist => checklist.id !== checklistId)
        setUserChecklistCollection([...newCol])
    }

    async function getUserChecklistCollection(userId: string, token: string) {
        try {
            const response = await fetch(BASE_URL + "/checklist/collection", {
                method: "GET",
                headers: {authorization: `Bearer ${token}`, userid: userId}
            })
            const data = await response.json()
            if (data.success) {
                const dataCollection: UserChecklist[] = data.collection
                setUserChecklistCollection([...dataCollection])
            } 
        } catch (error) {
            console.log(error)
        }
    }

    // const { setName, setType, checklistItems, packOdds } = newChecklist
    return (
        <>
        <MyChecklistCollection 
            userChecklistCollection={ userChecklistCollection } 
            updateSelectedChecklists={ updateSelectedChecklists }
            selectedChecklists={ selectedChecklists }
            setShowCreateChecklistModal={ setShowCreateChecklistModal }
            
        />
        <section className="checklist-container">
        {selectedChecklists.length > 0 && userChecklistCollection.map((checklist, i) => {
            if (selectedChecklists.includes(checklist.id)) {
                return <Checklist 
                    key={i}
                    checklist={checklist}
                    updateSelectedChecklists={updateSelectedChecklists}
                    updateUserChecklistCollectionState={updateUserChecklistCollectionState}
                    setRefetchChecklistCollectionRefArr={setRefetchChecklistCollectionRefArr}
                />  
            }
        })}
        </section>
        { showCreateChecklistModal && 
        <CreateNewChecklistModal 
            setShowCreateChecklistModal={ setShowCreateChecklistModal }
            setRefetchChecklistCollectionRefArr={setRefetchChecklistCollectionRefArr}

 /> }
        </>
    )
}

export { ChecklistView }
