import "./Checklist.css"
import { useState } from 'react'
import { ChecklistItem } from "../components/ChecklistItem"
import setLists from "../../../back-end/JSONchecklists/checklists.json"


const cardSet = setLists.upperdeck["1994-95"].series1

function Checklist(props) {

    const [changedSinceLastSave, setChangedSinceLastSave] = useState<number[]>([])

    function handleCheck(newInput: number) {
        setChangedSinceLastSave([...changedSinceLastSave, newInput])
    }

    


    return (
        <article className="checklist">
            <section className="checklist__infobox">
                <h2 className="infobox__company"><span className="infobox__title">Company</span>{ props.company }</h2>
                <h2 className="infobox__season"><span className="infobox__title">Season</span>{ props.season }</h2>
                <h2 className="infobox__product"><span className="infobox__title">Product</span>{ props.product }</h2>
                <h2 className="infobox__set-name"><span className="infobox__title">Set name</span>{ props.setName }</h2>
                <h2 className="infobox__set-type"><span className="infobox__title">Set type</span>{ props.setType }</h2>
                <h2 className="infobox__pack-odds"><span className="infobox__title">Pack odds</span>{ props.packOdds }</h2>
            </section>
            <table className="checklist__table">
                <thead>
                    <tr className="header-row">
                        <th className="header__cardnum">#</th>
                        <th className="header__player-name">Player name</th>
                        <th className="header__check">x</th>
                        <th className="header__inventory">Inv.</th>
                    </tr>
                </thead>
                <tbody>
                    { props.items }
                </tbody>
            </table>
        </article>
    )
}


export { Checklist }
