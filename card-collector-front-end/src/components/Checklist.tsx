import "./Checklist.scss"
import { useState } from 'react'
import { ChecklistItem } from "../components/ChecklistItem"
import setLists from "../../../back-end/JSONchecklists/checklists.json"
import { findJsonSet } from "../utils"
import { BASE_URL } from "../api"
import { UpdatedChecklistItem, UserChecklist, CardSet, Player, ChecklistCard, Company, SetLists } from "../interfaces"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// const cardSet = setLists.upperdeck["1994-95"].series1

function Checklist(
    { 
        checklist, 
        updateSelectedChecklists, 
        updateUserChecklistCollectionState, 
        setRefetchChecklistCollectionRefArr 
    }:
    { 
        checklist: UserChecklist, 
        updateSelectedChecklists: (id: string) => void, 
        updateUserChecklistCollectionState: (checklistId: string) => void, 
        setRefetchChecklistCollectionRefArr: React.Dispatch<React.SetStateAction<number[]>> 
    }) {
    const [changedSinceLastSave, setChangedSinceLastSave] = useState<UpdatedChecklistItem[]>([])
    const [currentSavedList, setCurrentSavedList] = useState([...checklist.personalChecklist])

    function updateChangedSinceLastSave(item: UpdatedChecklistItem) {
        if (changedSinceLastSave.filter(changedItem => changedItem.cardId === item.cardId).length < 1) { // if this card hasnt been checked before
            setChangedSinceLastSave((prev) => [...prev, item])
        } else {
            const updatedList: UpdatedChecklistItem[] = []
            for (const changedItem of changedSinceLastSave) {
                if (changedItem.cardId !== item.cardId) {
                    updatedList.push(changedItem)
                } else {
                    updatedList.push({cardId: changedItem.cardId, isChecked: item.isChecked})
                }
            }
            setChangedSinceLastSave(updatedList)
        }
    }

    function handleSave() { 
        const changedList = [...changedSinceLastSave]
        const oldList = [...currentSavedList]
        const toBeRemoved: number[] = []
        const toBeAdded: number[] = []

        changedList.forEach(changedItem => {
            if (oldList.includes(changedItem.cardId) && !changedItem.isChecked) {
                toBeRemoved.push(changedItem.cardId)
            } else if (!oldList.includes(changedItem.cardId) && changedItem.isChecked) {
                toBeAdded.push(changedItem.cardId)
            }
        })

        let newList = oldList.filter(item => !toBeRemoved.includes(item))
        newList = [...newList, ...toBeAdded]
        
        setCurrentSavedList([...newList])
        setChangedSinceLastSave([])
        updateUserChecklistApi(checklist.id, newList, localStorage.getItem('userToken') || "")
    }

    function handleClose() {
        updateSelectedChecklists(checklist.id)
    }

    async function handleDelete() {
        await deleteUserChecklistApi(checklist.id, localStorage.getItem('userToken') || "")
        await updateSelectedChecklists(checklist.id)
        updateUserChecklistCollectionState(checklist.id)
        setRefetchChecklistCollectionRefArr((prev: number[]) => [...prev, 1])
    }

    async function deleteUserChecklistApi(checklistId: string, token: string ) {
        try {
            const body = {checklistId}
            console.log(body)
            const response = await fetch(BASE_URL + "/checklist", {
                method: "DELETE",
                headers: {'authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                return
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async function updateUserChecklistApi(checklistId: string, updatedChecklist: number[], token: string ) {
        try {
            const body = {checklistId, updatedChecklist}
            console.log(body)
            const response = await fetch(BASE_URL + "/checklist", {
                method: "PUT",
                headers: {'authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                return
            } 
        } catch (error) {
            console.log(error)
        }
    }

    interface ChecklistItemsData {
        companyName: string,
        productName: string,
        setName: string,
        setType: string,
        lowCardNum: number,
        highCardnum: number,
        setList: ChecklistCard[],
        packOdds: string,
        numPrefix: string,
        checklistItems: JSX.Element[]
    }

    function renderChecklistItems(cardSet: UserChecklist, setName: string) {
        const sLists = {...setLists} as unknown as SetLists
        const company = sLists[cardSet.company] as Company
        const productSets: CardSet[] = company[cardSet.season][cardSet.product].sets
        const jsonSet: CardSet = findJsonSet(productSets, setName)
        const data: ChecklistItemsData = {
            companyName: company.name,
            productName: company[cardSet.season][cardSet.product].name,
            setName: cardSet.setName,
            setType: jsonSet.setType,
            lowCardNum: jsonSet.cardNumbers.first,
            highCardnum: jsonSet.cardNumbers.last,
            setList: jsonSet.checklist,
            packOdds: jsonSet.packOdds || "N/A",
            numPrefix: jsonSet.numPrefix || "",
            checklistItems: []
        }
        
        if (!(setName.toLowerCase() === jsonSet.setName.toLowerCase())) {
    
            jsonSet.parallelSets?.forEach(set => {
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
        const checklistItems: JSX.Element[] = []
        
        for (let i = data.lowCardNum; i <= data.highCardnum; i++) {
            const isInCollection = currentSavedList.includes(i)
            const card = data.setList[i - data.lowCardNum]
            const cardHasTwoOrMorePlayers = card.players || false
            let cardNameString = ''
            if (cardHasTwoOrMorePlayers) {
                card.players?.forEach((player: Player, i: number) => {
                    cardNameString += `${player.firstname} ${player.lastname}`
                    if (card.players && i < card.players.length - 1) {
                        cardNameString += ' / '
                    }
                })
            } else {
                cardNameString = `${card.firstname} ${card.lastname}`
            }
            
            checklistItems.push(
            <ChecklistItem 
                key={i} 
                isInCollection={isInCollection} 
                card={ cardNameString } 
                cardNumber={data.numPrefix + i} 
                updateChangedSinceLastSave={updateChangedSinceLastSave} />)
        }
        data.checklistItems = [...checklistItems]
        return data
    }

    const renderedData = renderChecklistItems(checklist, checklist.setName)
    const percentage = currentSavedList.length / renderedData.checklistItems.length * 100
    console.log(percentage)

    return (
        <article className="checklist">
            <button className="checklist__save-btn" onClick={ handleSave }><i className="fa-solid fa-floppy-disk"></i></button>
            <button className="checklist__close-btn" onClick={ handleClose }><i className="fa-solid fa-circle-xmark"></i></button>
            <section className="checklist__infobox">
                <h2 className="infobox__company"><span className="infobox__title">Company</span>{ renderedData.companyName }</h2>
                <h2 className="infobox__season"><span className="infobox__title">Season</span>{ checklist.season }</h2>
                <h2 className="infobox__product"><span className="infobox__title">Product</span>{ renderedData.productName }</h2>
                <h2 className="infobox__set-name"><span className="infobox__title">Set name</span>{ checklist.setName }</h2>
                <h2 className="infobox__set-type"><span className="infobox__title">Set type</span>{ renderedData.setType }</h2>
                <h2 className="infobox__pack-odds"><span className="infobox__title">Pack odds</span>{ renderedData.packOdds }</h2>
                <article className="checklist__progressbar-container">
                <CircularProgressbar value={ percentage } text={`${Math.round(percentage * 10) / 10}%`} styles={buildStyles({
                    textSize: '1.5rem',
                    pathColor: percentage == 100 ? `rgb(61 190 14)` : `rgb(94 0 189)`,
                    textColor: percentage == 100 ? `rgb(61 190 14)` : 'rgb(89 0 178)',
                    trailColor: '#d6d6d6'
                })} />
            </article>
            </section>
            
            <table className="checklist__table">
                <thead>
                    <tr className="header-row">
                        <th className="header__cardnum">#</th>
                        <th className="header__player-name">Player name</th>
                        <th className="header__check">x</th>
                    </tr>
                </thead>
                <tbody>
                    { renderedData.checklistItems }
                </tbody>
            </table>
            <button className="checklist__delete-btn" onClick={ handleDelete }><i className="fa-solid fa-trash-can"></i></button>
        </article>
    )
}


export { Checklist }
