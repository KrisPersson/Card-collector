import "./AddNewCardForm.scss"
import { useState } from 'react'
import { Player, Card } from "../interfaces"


function AddNewCardForm({ addAnotherCard, initialValues, updateCardsArr }) {

    const [amtOfPlayersOnCard, setAmtOfPlayersOnCard] = useState(initialValues.players.length)
    const [formState, setFormState] = useState<Card>({
        cardTempId: initialValues.cardTempId,
        players: initialValues.players,
        manufacturer: initialValues.manufacturer,
        season: initialValues.season,
        product: initialValues.product,
        setName: initialValues.setName,
        setType: initialValues.setType,
        numberedTo: initialValues.numberedTo,
        rookie: initialValues.rookie,
        autograph: initialValues.autograph,
        memorabilia: initialValues.memorabilia,
        jerseyNumMatch: initialValues.jerseyNumMatch,
        pc: initialValues.pc,
        comment: initialValues.comment,
        copies: initialValues.copies,
        price: initialValues.price
    })

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
     
    function handleRadioClick(num: number) {
        if (num !== amtOfPlayersOnCard) {
            setAmtOfPlayersOnCard(num)
            const newPlayerArray: Player[] = []
            for (let i = 1; i <= num; i++ ) {
                newPlayerArray.push({
                    tempId: i,
                    firstname: "",
                    lastname: "",
                    teamname: ""
                })
            }
            setFormState({...formState, players: [...newPlayerArray]})
            updateCardsArr({...formState, players: [...newPlayerArray]})

        }
    }

    function updatePlayers(event, id: number, prop: string) {
        const newPlayers = []
        for (let i = 0; i < formState.players.length; i++) {
            if (formState.players[i].tempId === id) {
                newPlayers.push({...formState.players[i], [prop]: event.target.value})
            } else {
                newPlayers.push(formState.players[i])
            }
        }
        setFormState({...formState, players: [...newPlayers]})
        updateCardsArr({...formState, players: [...newPlayers]})
    }

    function updateFormState(event, prop: string, targetType: "value" | "checked") {
        const value = prop === "copies" || prop === "price" ?
            Number(event.target[targetType]) : 
            event.target[targetType]

        setFormState({...formState, [prop]: value})
        updateCardsArr({...formState, [prop]: value})
    }

   

    return (
        <section className="add-card-form">
            <h4 className="add-card-form__card-temp-id"># { formState.cardTempId || '' }</h4>
            <fieldset>
                <legend>Number of players on card</legend>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 0} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(0)} /> 0</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 1} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(1)} /> 1</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 2} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(2)} /> 2</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 3} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(3)} /> 3</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 4} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(4)} /> 4</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 5} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(5)} /> 5</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 6} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(6)} /> 6</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 7} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(7)} /> 7</label>
                <label className="radio-btn-label"><input defaultChecked={formState.players.length === 8} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(8)} /> 8</label>
            </fieldset>
            {
                amtOfPlayersOnCard === 0 ?
                (<section className="card-form__player">
                    <label>Card name<input onChange={(event) => updatePlayers(event, 1, "firstname") } type="text" placeholder="ex. Welcome" required /></label>
                    <label>Card name<input onChange={(event) => updatePlayers(event, 1, "lastname") } type="text" placeholder="ex. To" /></label>
                    <label>Team name<input onChange={(event) => updatePlayers(event, 1, "teamname") } type="text" placeholder="ex. Las Vegas" /></label>
                </section>) 
                : 
                formState.players.map(player => {
                    return (
                    <section key={player.tempId} className="card-form__player">
                        <label>First name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "firstname") } defaultValue={player.firstname} type="text" placeholder="ex. Wayne" required /></label>
                        <label>Last name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "lastname") } defaultValue={player.lastname} type="text" placeholder="ex. Gretzky" /></label>
                        <label>Team name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "teamname") } defaultValue={player.teamname} type="text" placeholder="ex. Los Angeles Kings" /></label>
                    </section>
                    )
                })
            }
            <hr />
            <label>Manufacturer <span>*</span><input onChange={(event) => updateFormState(event, "manufacturer", "value")} defaultValue={initialValues.manufacturer} type="text" placeholder="ex. Upper Deck" /></label>
            <label>Season <span>*</span><input onChange={(event) => updateFormState(event, "season", "value")} defaultValue={initialValues.season} type="text" placeholder="ex. 1994/95" /></label>
            <label>Product <span>*</span><input onChange={(event) => updateFormState(event, "product", "value")} defaultValue={initialValues.product} type="text" placeholder="ex. Series 1, SPx, etc" /></label>
            <label>Card-set name <span>*</span><input onChange={(event) => updateFormState(event, "setName", "value")} defaultValue={initialValues.setName} type="text" placeholder="ex. Future Watch" required /></label>
            <label>Card-set type <span>*</span><input onChange={(event) => updateFormState(event, "setType", "value")} defaultValue={initialValues.setType} type="text" placeholder="ex. base, insert etc" /></label>
            <label>Serial numbered to<input onChange={(event) => updateFormState(event, "numberedTo", "value")} defaultValue={initialValues.numberedTo} type="text" placeholder="leave empty if none" /></label>
            <label className="check-box__card-label">Rookie card<input onChange={(event) => updateFormState(event, "rookie", "checked")} checked={initialValues.rookie} type="checkbox" /></label>
            <label className="check-box__card-label">Autograph<input onChange={(event) => updateFormState(event, "autograph", "checked")} checked={initialValues.autograph} type="checkbox" /></label>
            <label className="check-box__card-label">Memorabilia<input onChange={(event) => updateFormState(event, "memorabilia", "checked")} checked={initialValues.memorabilia} type="checkbox" /></label>
            <label className="check-box__card-label">Jersey nr match<input onChange={(event) => updateFormState(event, "jerseyNumMatch", "checked")} checked={initialValues.jerseyNumMatch} type="checkbox" /></label>
            <label className="check-box__card-label">PC<input onChange={(event) => updateFormState(event, "pc", "checked")} checked={initialValues.pc} type="checkbox" /></label>
            <label>Comment<input onChange={(event) => updateFormState(event, "comment", "value")} type="text" placeholder="" defaultValue={initialValues.comment} /></label>
            <label className="copies-label">Copies <span>*</span><input onChange={(event) => updateFormState(event, "copies", "value")} type="number" className="input-copies" defaultValue={initialValues.copies || 1} /></label>
            <label className="price-label">Price/unit SEK <span>*</span><input onChange={(event) => updateFormState(event, "price", "value")} type="number" defaultValue={initialValues.price} placeholder="ex. 20" /></label>
            <hr />
            <aside></aside>
            <button onClick={ () => addAnotherCard(formState, false) }><i className="fa-regular fa-file"></i> Add another empty</button>
            <button onClick={ () => addAnotherCard(formState, true) }><i className="fa-regular fa-copy"></i> Add another from this</button>

        </section>
    )
}

export default AddNewCardForm
