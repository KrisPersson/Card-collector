import "./EditCardModal.scss"
import EditCardForm from "./EditCardForm"
import { useState } from "react"
import { Player, Card } from "../interfaces"
import { postNewInventory } from "../api"

const emptyCard = {
    players: [{tempId: 1, firstname: "", lastname: "", teamname: ""}],
    manufacturer: "",
    season: "",
    product: "",
    setName: "",
    setType: "",
    numberedTo: "",
    rookie: false,
    autograph: false,
    memorabilia: false,
    jerseyNumMatch: false,
    pc: false,
    comment: "",
    copies: 1,
    price: 0
}

function EditCardModal({setShowEditCardModal, getLatestUserCards}) {

    

    async function handleSubmit() {


        const response = await editInventory(
            localStorage.getItem('userToken') || '',
            localStorage.getItem('userId') || '', 
            cardsArr, 
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
                            updateFormState={ updateFormState }
                            initialValues={ initialValues }
                            

                        />
                }
            </article>
            <button onClick={ handleSubmit } className="submit-btn">EDIT CARD</button>
        </section>
    )
}



export default EditCardModal
