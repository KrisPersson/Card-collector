import "./EditCardForm.scss"
import { useState } from 'react'
import { Player, Card } from "../interfaces"


function EditCardForm({ initialValues }) {

    const [amtOfPlayersOnCard, setAmtOfPlayersOnCard] = useState(initialValues.players.length)
    const [formState, setFormState] = useState<Card>({})


    function updateFormState(event, prop, targetType: "value" | "checked") {

        const value = prop === "copies" || prop === "price" ?
            Number(event.target[targetType]) : 
            event.target[targetType]

        setFormState(prev => {
            return {...prev, [prop]: value}
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

    

    

    

    

    const thisFormInCardsArr = cardsArr.find(card => card.cardTempId === initialValues.cardTempId)

    return (
        <section className="add-card-form">
            <h4 className="add-card-form__card-temp-id"># { initialValues.id }</h4>
            <fieldset>
                <legend>Number of players on card</legend>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 0} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(0)} /> 0</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 1} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(1)} /> 1</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 2} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(2)} /> 2</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 3} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(3)} /> 3</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 4} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(4)} /> 4</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 5} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(5)} /> 5</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 6} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(6)} /> 6</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 7} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(7)} /> 7</label>
                <label className="radio-btn-label"><input defaultChecked={initialValues.players.length === 8} type="radio" name={`amt-players${initialValues.cardTempId}`} onClick={() => handleRadioClick(8)} /> 8</label>
            </fieldset>
            {
                amtOfPlayersOnCard === 0 ?
                (<section className="card-form__player">
                    <label>Card name<input onChange={(event) => updatePlayers(event, 1, "firstname") } type="text" placeholder="ex. Welcome" defaultValue={initialValues.firstname || ''} required /></label>
                    <label>Card name<input onChange={(event) => updatePlayers(event, 1, "lastname") } type="text" placeholder="ex. To" defaultValue={initialValues.lastname || ''} /></label>
                    <label>Team name<input onChange={(event) => updatePlayers(event, 1, "teamname") } type="text" placeholder="ex. Las Vegas" defaultValue={initialValues.teamname || ''} /></label>
                    <label>Type <span>*</span>
                            <select onChange={(event) => updatePlayers(event, 1, "role")} defaultValue={"Team card"}>
                                <option value="Team card">Team card</option>
                                <option value="Team logo">Team logo</option>
                                <option value="Checklist">Checklist</option>
                                <option value="Goalie Mask">Goalie Mask</option>
                                <option value="Trade card">Trade card</option>
                                <option value="Header card">Header card</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                </section>) 
                : 
                initialValues.players.map(player => {
                    return (
                    <section key={player.tempId} className="card-form__player">
                        <label>First name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "firstname") } defaultValue={player.firstname} type="text" placeholder="ex. Wayne" required /></label>
                        <label>Last name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "lastname") } defaultValue={player.lastname} type="text" placeholder="ex. Gretzky" /></label>
                        <label>Team name <span>*</span><input onChange={(event) => updatePlayers(event, player.tempId, "teamname") } defaultValue={player.teamname} type="text" placeholder="ex. Los Angeles Kings" /></label>
                        <label>Role <span>*</span>
                            <select onChange={(event) => updatePlayers(event, player.tempId, "role")} defaultValue={"Player"}>
                                <option value="Player">Player</option>
                                <option value="Mascot">Mascot</option>
                                <option value="Coach">Coach</option>
                                <option value="Referee">Referee</option>
                                <option value="Pundit">Pundit</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                    </section>
                    )
                })
            }
            <hr />
            <label>Manufacturer <span>*</span><input onChange={(event) => updateFormState(event, "manufacturer", "value")} defaultValue={initialValues.manufacturer} type="text" placeholder="ex. Upper Deck" /></label>
            <label>Season <span>*</span><input onChange={(event) => updateFormState(event, "season", "value")} defaultValue={initialValues.season} type="text" placeholder="ex. 1994/95" /></label>
            <label>Product <span>*</span><input onChange={(event) => updateFormState(event, "product", "value")} defaultValue={initialValues.product} type="text" placeholder="ex. Series 1, SPx, etc" /></label>
            <label>Card-set name <span>*</span><input onChange={(event) => updateFormState(event, "setName", "value")} defaultValue={initialValues.setName} type="text" placeholder="ex. Future Watch" required /></label>
            <label>Card-set type <span>*</span>
                <select onChange={(event) => updateFormState(event, "setType", "value")} defaultValue={initialValues.setType}>
                    <option value="Insert">Insert</option>
                    <option value="Insert Parallel">Insert Parallel</option>
                    <option value="Base">Base</option>
                    <option value="Base Parallel">Base Parallel</option>
                    <option value="Base Subset">Base Subset</option>
                    <option value="Base Subset Parallel">Base Subset Parallel</option>
                    <option value="Printing Plate">Printing Plate</option>
                    <option value="Trade card">Trade card</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label>Competition
                <select onChange={(event) => updateFormState(event, "competition", "value")} defaultValue={initialValues.competition || 'NHL'}>
                    <option value="NHL">NHL</option>
                    <option value="CHL">CHL</option>
                    <option value="AHL">AHL</option>
                    <option value="International">International</option>
                    <option value="SHL">SHL</option>
                    <option value="Hockeyallsvenskan">Hockeyallsvenskan</option>
                    <option value="KHL">KHL</option>
                    <option value="SM-Liiga">SM-Liiga</option>
                    <option value="Extraliga">Extraliga</option>
                    <option value="DEL">DEL</option>
                    <option value="Eliteserien">Eliteserien (NOR)</option>
                    <option value="National League">National League (SUI)</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label>Checklist number<input onChange={(event) => updateFormState(event, "clNum", "value")} defaultValue={initialValues.clNum} type="text" placeholder="Leave empty if none" /></label>
            <label>Origin/seller<input onChange={(event) => updateFormState(event, "origin", "value")} defaultValue={initialValues.origin} type="text" placeholder="ex. pack, johnny_ebay_123 etc." /></label>
            <label>Serial numbered to<input className="input-serial" onChange={(event) => updateFormState(event, "serial", "value")} defaultValue={initialValues.serialNumber} type="text" placeholder="" /><span className="serial-span">/</span><input className="input-serial input-serial--right" onChange={(event) => updateFormState(event, "numberedTo", "value")} defaultValue={initialValues.numberedTo} type="text" placeholder="" /></label>
            <label>Grade / Grader
                <select className="select-graded" onChange={(event) => updateFormState(event, "grade", "value")} defaultValue={""}>
                    <option value="">-</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                    <option value="4.5">4.5</option>
                    <option value="5">5</option>
                    <option value="5.5">5.5</option>
                    <option value="6">6</option>
                    <option value="6.5">6.5</option>
                    <option value="7">7</option>
                    <option value="7.5">7.5</option>
                    <option value="8">8</option>
                    <option value="8.5">8.5</option>
                    <option value="9">9</option>
                    <option value="9.5">9.5</option>
                    <option value="10">10</option>
                </select>
                <span className="serial-span">/</span>
                <select className="select-graded" onChange={(event) => updateFormState(event, "grader", "value")} defaultValue={""}>
                    <option value="">-</option>
                    <option value="PSA">PSA</option>
                    <option value="BGS">BGS</option>
                    <option value="SGC">SGC</option>
                    <option value="HGA">HGA</option>
                    <option value="ISA">ISA</option>
                    <option value="GMA">GMA</option>
                    <option value="Rauk">Rauk</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label className="check-box__card-label">Rookie card<input onChange={(event) => updateFormState(event, "rookie", "checked")} checked={initialValues.rookie} type="checkbox" /></label>
            <label className="check-box__card-label">Autograph<input onChange={(event) => updateFormState(event, "autograph", "checked")} checked={initialValues.autograph} type="checkbox" /></label>
            <label className="check-box__card-label">Memorabilia<input onChange={(event) => updateFormState(event, "memorabilia", "checked")} checked={initialValues.memorabilia} type="checkbox" /></label>
            <label className="check-box__card-label">Jersey nr match<input onChange={(event) => updateFormState(event, "jerseyNumMatch", "checked")} checked={initialValues.jerseyNumMatch} type="checkbox" /></label>
            <label className="check-box__card-label">Color match<input onChange={(event) => updateFormState(event, "colorMatch", "checked")} checked={initialValues.colorMatch} type="checkbox" /></label>
            <label className="check-box__card-label">Checklist card<input onChange={(event) => updateFormState(event, "checklistCard", "checked")} checked={initialValues.checklistCard} type="checkbox" /></label>
            <label className="check-box__card-label">Sticker card<input onChange={(event) => updateFormState(event, "stickerCard", "checked")} checked={initialValues.stickerCard} type="checkbox" /></label>
            <label className="check-box__card-label">Promo card<input onChange={(event) => updateFormState(event, "promoCard", "checked")} checked={initialValues.promoCard} type="checkbox" /></label>

            <label className="check-box__card-label">Printing error<input onChange={(event) => updateFormState(event, "printingError", "checked")} checked={initialValues.printingError} type="checkbox" /></label>
            <label className="check-box__card-label">First owner<input onChange={(event) => updateFormState(event, "firstOwner", "checked")} checked={initialValues.firstOwner} type="checkbox" /></label>



            <label className="check-box__card-label">PC<input onChange={(event) => updateFormState(event, "pc", "checked")} checked={initialValues.pc} type="checkbox" /></label>
            
            <label>Comment<input onChange={(event) => updateFormState(event, "comment", "value")} type="text" placeholder="" defaultValue={initialValues.comment} /></label>
            <label>Physical location<input onChange={(event) => updateFormState(event, "location", "value")} defaultValue={initialValues.location} type="text" placeholder="ex. shelf 2, box 3" /></label>
            <label className="copies-label">Copies <span>*</span><input onChange={(event) => updateFormState(event, "copies", "value")} type="number" className="input-copies" defaultValue={initialValues.copies || 1} /></label>
            <label className="price-label">Price/unit SEK <span>*</span><input onChange={(event) => updateFormState(event, "price", "value")} type="number" defaultValue={initialValues.price} placeholder="ex. 20" /></label>
            <hr />
            <aside></aside>
            <button onClick={ () => addAnotherCard(thisFormInCardsArr, false) }><i className="fa-regular fa-file"></i> Add another empty</button>
            <button onClick={ () => addAnotherCard(thisFormInCardsArr, true) }><i className="fa-regular fa-copy"></i> Add another from this</button>

        </section>
    )
}

export default EditCardForm
