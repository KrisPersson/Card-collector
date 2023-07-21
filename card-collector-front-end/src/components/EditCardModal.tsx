import "./EditCardModal.scss"
import EditCardForm from "./EditCardForm"
import { useState } from "react"
import { Player, Card } from "../interfaces"
import { editInventory } from "../api"
import { extractChangesOnlyBeforePostingEdit } from "../utils"


function EditCardModal({setShowEditCardModal, getLatestUserCards, initialValues}) {

    const [amtOfPlayersOnCard, setAmtOfPlayersOnCard] = useState(1)
    const [formState, setFormState] = useState<Card>({...initialValues})
    console.log(formState)


    function updateFormState(event: Event, prop: string, targetType: "value" | "checked") {

        console.log(event)
        const value = prop === "copies" || prop === "price" ?
            Number(event.target[targetType]) : 
            event.target[targetType]

            console.log(value)
        setFormState(prev => {
            return {...prev, [prop]: value}
        })
    }

    function updatePlayers(event: Event, id: number, prop: string) {
        const newPlayers: Player[] = []

        for (let i = 0; i < amtOfPlayersOnCard; i++) {
            if (formState.players[i].tempId === id) {
                newPlayers.push({...formState.players[i], [prop]: event.target?.value})
            } else {
                newPlayers.push(formState.players[i])
            }
        }
        setFormState(prev => {
            return {...prev, players: [...newPlayers]}
        })
    }
     
    function handleRadioClick(num: number) {
        if (num !== amtOfPlayersOnCard) {
            setAmtOfPlayersOnCard(num)
            const newPlayerArray: Player[] = []
            for (let i = 1; i <= num; i++ ) {
                newPlayerArray.push({
                    tempId: i,
                    firstname: "",
                    lastname: "",
                    teamname: "",
                    role: "Player"
                })
            }
            setFormState(prev => {
                return {...prev, players: [...newPlayerArray]}
            })
        }
    }

    async function handleSubmit() {

        const changesOnly = extractChangesOnlyBeforePostingEdit(initialValues, formState)
        const response = await editInventory(
            localStorage.getItem('userId') || '',
            changesOnly,
            initialValues.id, 
            localStorage.getItem('userToken') || ''
        )
        if (response.success) {
            await getLatestUserCards()
            setShowEditCardModal(false)
        }
    }

    

    function handleRejectedSubmit(reason: string) {
        console.log(reason)
    }


    

    return (
        <section className='modal modal--add-new-card'>
            <button onClick={()=> setShowEditCardModal(false)} className="modal__close-btn"><i className="fa-regular fa-circle-xmark"></i></button>
            <article className='modal__form'>
                <h1 className="modal__h1">Edit Card</h1>
                { 
                    <EditCardForm 
                        setShowEditCardModal={ setShowEditCardModal } 
                        initialValues={ initialValues }
                        updateFormState={ updateFormState }
                        updatePlayers={ updatePlayers }
                        handleRadioClick={ handleRadioClick }
                        amtPlayersOnCard={ amtOfPlayersOnCard }
                        setAmtOfPlayersOnCard={ setAmtOfPlayersOnCard }
                        formState={ formState }
                    />
                }
            </article>
            <button onClick={ handleSubmit } className="submit-btn">SUBMIT EDIT</button>
        </section>
    )
}



export default EditCardModal
