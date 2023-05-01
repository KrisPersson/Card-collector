import "./ChecklistItem.css"
function ChecklistItem({ card, cardNumber }) {

    return (
        <tr className="checklist__checklist-item">
            <td className="checklist-item__cardnumber">{ cardNumber }</td>
            <td className="checklist-item__player" num={ cardNumber } player={ card }><h4>{ card }</h4></td>
            <td><input type="checkbox" className="checklist-item__checkbox" /></td>
            <td><input className="checklist-item__inventory" type="number" min={ 0 } /></td>
        </tr>
    )
}


export { ChecklistItem }
