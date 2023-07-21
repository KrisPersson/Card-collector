import "./InventoryCard.scss"
import { useState } from "react"

function InventoryCard({ cardData, handleOpenEdit }) {


    const { players, 
        season, 
        product, 
        setName, 
        rookie, 
        serial, 
        numberedTo, 
        autograph, 
        memorabilia, 
        comment, 
        price, 
        clNum, 
        manufacturer,
        setType,
        location,
        origin,
        createdAt,
        grade,
        grader,
        pc,
        id,
        competition,
        checklistCard,
        stickerCard,
        promoCard,
        printingError,
        firstOwner
     } = cardData

    const [showExpandSection, setShowExpandSection] = useState(false)
    const parsedDate = new Date(createdAt)

    const playersFirstName = players.map((player, i) => {
        if (i > 0) {
            return <p className="expand-section__firstname">{ player.firstname }</p>
        }
    })
    const playersLastName = players.map((player, i) => {
        if (i > 0) {
            return <p className="expand-section__lastname">{ player.lastname }</p>
        }
    })
    const playersTeamName = players.map((player, i) => {
        if (i > 0) {
            return <p className="expand-section__teamname">{ player.teamname }</p>
        }
    })

    function showHideExpand(event) {
        
        const classList = event.target.classList.value.split(' ')
        console.log(classList)
        if (!classList.includes('fa-solid') && !classList.includes('inventory-card__action-btn')) {
            setShowExpandSection(prev => !prev)
        }
    }

    return (
        <tr onClick={(event) => showHideExpand(event)} className={`table-row table-row--body ${showExpandSection ? 'table-row--expanded' : ''}`}>
            <td className="table-column table-column__firstname"> { players[0].firstname }
            {
                showExpandSection &&
                <section className="table-column--expand-section">
                    { playersFirstName }
                </section>
            }
            </td>
            <td className="table-column table-column__lastname"> { players[0].lastname }
            {
                showExpandSection &&
                <section className="table-column--expand-section">
                    { playersLastName }
                </section>
            }
            </td>
            <td className="table-column table-column__teamname"> { players[0].teamname }
            {
                showExpandSection &&
                <section className="table-column--expand-section">
                    { playersTeamName }
                </section>
            }
            </td>
            <td className="table-column table-column__season">{ season || ''}
            {
                showExpandSection &&
                <section className="table-column--expand-section table-column--expand-section__head">
                <p className="expand-section__head-p">CL #</p>
                <p className="expand-section__body-p">{ clNum || '' }</p>
                </section>
            }
            </td>
            <td className="table-column table-column__product">{ product || '' }
            {
                showExpandSection &&
                <section className="table-column--expand-section table-column--expand-section__head">
                    <p className="expand-section__head-p">Manufacturer</p>
                    <p className="expand-section__body-p">{ manufacturer || '' }</p>
                </section>
            }
            </td>
            <td className="table-column table-column__setname">{ setName }
            {
                showExpandSection &&
                <section className="table-column--expand-section table-column--expand-section__head">
                    <p className="expand-section__head-p">Card-set type</p>
                    <p className="expand-section__body-p">{ setType }</p>
                </section>
            }
            </td>
            <td className="table-column table-column__features">
                { rookie && <span className='feature-pill feature-pill--rookie'>RC</span> }
                { numberedTo && <span className='feature-pill feature-pill--numbered'>/{ numberedTo }</span> }
                { autograph && <span className='feature-pill feature-pill--autograph'>AU</span> }
                { memorabilia && <span className='feature-pill feature-pill--memorabilia'>MEM</span> }
                { grader && <span className='feature-pill feature-pill--psa'>{ grade } { grader }</span> }
                {
                    showExpandSection &&
                    <section className="table-column--expand-section table-column--expand-section__head">
                        <p className="expand-section__head-p">Physical location</p>
                        <p className="expand-section__body-p">{ location || '' }</p>
                    </section>
                }
            </td>
            <td className="table-column table-column__comment">{ comment || '' }
            {
                showExpandSection &&
                <section className="table-column--expand-section table-column--expand-section__head">
                    <p className="expand-section__head-p">Origin/seller</p>
                    <p className="expand-section__body-p">{ origin || '' }</p>
                </section>
            }
            </td>
            <td className="table-column table-column__status">
                { pc && <span className='feature-pill feature-pill--pc'>PC</span> }
                {
                    showExpandSection &&
                    <section className="table-column--expand-section table-column--expand-section__head">
                        <p className="expand-section__head-p">Date added</p>
                        <p className="expand-section__body-p">{ parsedDate.toLocaleDateString() || '' }</p>
                    </section>
                }
            </td>
            <td className="table-column table-column__price">{ price || 0 }
            {
                showExpandSection &&
                <section className="table-column--expand-section table-column--expand-section__head expand-section--action-btns">
                    <button onClick={ () => handleOpenEdit(cardData) } className="inventory-card__action-btn" ><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className="inventory-card__action-btn"><i className="fa-solid fa-trash"></i></button>

                </section>
            }
            </td>
        </tr>
    )
}

export default InventoryCard
