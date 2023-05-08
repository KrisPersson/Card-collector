import "./ChecklistView.css"
import { useState, useEffect } from 'react'
import { Checklist } from "../components/Checklist"
import { ud9495checklist } from "../upperdeck9495"
import { ChecklistItem } from "../components/ChecklistItem"
import CreateNewChecklistForm from "../components/ChecklistForm"
import MyChecklistCollection from "../components/MyChecklistCollection"
import { BASE_URL } from "../api"
import setLists from "../../../back-end/JSONchecklists/checklists.json"

const cardSet = setLists.upperdeck["1994-95"].series1.sets[1]



function renderChecklistItems(cardSet, setName: string) {
    let data = {
        setName: cardSet.setName,
        setType: cardSet.setType,
        lowCardNum: cardSet.cardNumbers.first,
        highCardnum: cardSet.cardNumbers.last,
        setList: cardSet.checklist,
        packOdds: cardSet.packOdds ? cardSet.packOdds : "N/A",
        numPrefix: cardSet.numPrefix ? cardSet.numPrefix : "",
        checklistItems: []
    }
    if (!(setName.toLowerCase() === cardSet.setName.toLowerCase())) {
        cardSet.parallelSets.forEach(set => {
            if (set.name.toLowerCase() === setName.toLowerCase()) {
                data.setType = 'Parallel'
                data.setName = set.name
                if (set.packOdds) {
                    data.packOdds = set.packOdds
                }
                if (set.numPrefix) {
                    data.numPrefix = set.numPrefix
                }
            }
        })
    }
    const checklistItems = []
    
    for (let i = data.lowCardNum; i <= data.highCardnum; i++) {
        checklistItems.push(<ChecklistItem key={i} card={data.setList[i - data.lowCardNum]} cardNumber={data.numPrefix + i} />)
    }
    data.checklistItems = [...checklistItems]
    return data
}

const newChecklist = renderChecklistItems(cardSet, "Ice gallery")

function ChecklistView() {

    const [userChecklistCollection, setUserChecklistCollection] = useState([])

    useEffect(() => {
        const userId = localStorage.getItem('userId') as string
        const token = localStorage.getItem('userToken') as string
        getUserChecklistCollection(userId, token)
    })

    async function getUserChecklistCollection(userId: string, token: string) {
        try {
            const response = await fetch(BASE_URL + "/checklist/collection", {
                method: "GET",
                headers: {authorization: `Bearer ${token}`, userid: userId}
            })
            const data = await response.json()
            if (data.success) {
                setUserChecklistCollection(data.collection)
            } 
        } catch (error) {
            console.log(error)
        }
    }

    // const { setName, setType, checklistItems, packOdds } = newChecklist


    return (
        <MyChecklistCollection />
        
        // {/* <Checklist 
        //     company="Upper Deck"
        //     product="Series 1"
        //     season="1994-95"
        //     setName={ setName }
        //     setType={ setType }
        //     packOdds={ packOdds }
        //     items={ checklistItems }
        // /> */}
        
    )
}


export { ChecklistView }
