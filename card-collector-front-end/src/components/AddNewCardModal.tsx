import "./AddNewCardModal.scss"
import AddNewCardForm from "./AddNewCardForm"
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

function AddNewCardModal({setShowAddCardModal, getLatestUserCards}) {

    const [cardsArr, setCardsArr] = useState<Card[]>([
        {
            cardTempId: 1,
            players: [{tempId: 1, firstname: "", lastname: "", teamname: "", role: "Player"}],
            manufacturer: "",
            season: "",
            product: "",
            setName: "",
            setType: "Insert",
            serial: "",
            numberedTo: "",
            competition: "NHL",
            rookie: false,
            autograph: false,
            memorabilia: false,
            jerseyNumMatch: false,
            colorMatch: false,
            pc: false,
            promoCard: false,
            stickerCard: false,
            firstOwner: false,
            checklistCard: false,
            printingError: false,
            clNum: "",
            location: "",
            origin: "",
            grade: "",
            grader: "",
            comment: "",
            copies: 1,
            price: 0
        }
    ])

    function addAnotherCard(cardTemplate: Card, createFromTemplate: boolean) {
        updateCardsArr(cardTemplate) // Brings current card (cardTemplate) to master state (cardsArr).

        const highestTempId = cardsArr.reduce((acc: number, current: Card) => {
            return current.cardTempId > acc ? current.cardTempId : acc
        }, 0)

        //Create new card
        if (createFromTemplate) {
            setCardsArr((prev) => [...prev, {...cardTemplate, cardTempId: highestTempId + 1}])
            // updateCardsArr({...cardTemplate, cardTempId: highestTempId + 1})
        } else {
            setCardsArr((prev) => [...prev, {...emptyCard, cardTempId: highestTempId + 1}])
            // updateCardsArr({...emptyCard, cardTempId: highestTempId + 1})
        }
    }

    function updateCardsArr(cardTemplate: Card) {
        const newCardsArr = cardsArr.map(card => {
            if (card.cardTempId === cardTemplate.cardTempId) {
                return {...cardTemplate}
            } else {
                return card
            }
        })
        setCardsArr([...newCardsArr])
    }

    async function handleSubmit() {
        const verifyForm: boolean = verifyFormBeforeSubmit()

        if (!verifyForm) return

        const response = await postNewInventory(
            localStorage.getItem('userId') || '', 
            cardsArr, 
            localStorage.getItem('userToken') || ''
        )
        if (response.success) {
            await getLatestUserCards()
            setShowAddCardModal(false)
        }
    }

    function verifyFormBeforeSubmit() {
        for (let i = 0; i < cardsArr.length; i++) {
            for (let j = 0; j < cardsArr[i].players.length; j++) {
                if (!cardsArr[i].players[j].firstname) {
                    handleRejectedSubmit('First name required')
                    return  false
                }
                if (!cardsArr[i].players[j].lastname) {
                    handleRejectedSubmit('Last name required')
                    return  false
                }
                if (!cardsArr[i].players[j].teamname) {
                    handleRejectedSubmit('Team name required')
                    return  false
                }
            }
            if (!cardsArr[i].manufacturer) {
                handleRejectedSubmit('Manufacturer required')
                return  false
            }
            if (!cardsArr[i].season) {
                handleRejectedSubmit('Season required')
                return  false
            }
            if (!cardsArr[i].product) {
                handleRejectedSubmit('Product required')
                return  false
            }
            if (!cardsArr[i].setName) {
                handleRejectedSubmit('Set name required')
                return  false
            }
            if (!cardsArr[i].setType) {
                console.log(i)

                handleRejectedSubmit('Set type required')
                return  false
            }
            if (!cardsArr[i].copies) {
                handleRejectedSubmit('Copies required - must be at least 1')
                return  false
            }
            if (cardsArr[i].price !== 0 && !cardsArr[i].price) {
                handleRejectedSubmit('Copies required - must be at least 1')
                return  false
            }
        }
        return true
    }

    function handleRejectedSubmit(reason: string) {
        console.log(reason)
    }


console.log(cardsArr)
    

    return (
        <section className='modal modal--add-new-card'>
            <button onClick={()=> setShowAddCardModal(false)} className="modal__close-btn"><i className="fa-regular fa-circle-xmark"></i></button>
            <article className='modal__form'>
                <h1 className="modal__h1">Add New Card(s)</h1>
                { 
                    cardsArr.map((card, i) => {
                        return <AddNewCardForm 
                            key={i}
                            setShowAddCardModal={ setShowAddCardModal } 
                            addAnotherCard={ addAnotherCard }
                            initialValues={ i === 0 ? cardsArr[0] : card }
                            updateCardsArr={ updateCardsArr }
                            setCardsArr={ setCardsArr }
                            cardsArr={ cardsArr }

                        />
                    })
                }
            </article>
            <button onClick={ handleSubmit } className="submit-btn">ADD CARD(s)</button>
        </section>
    )
}



export default AddNewCardModal
