import "./ChecklistItem.scss";
function ChecklistItem({
  card,
  cardNumber,
  updateChangedSinceLastSave,
  isInCollection,
  numPrefix,
}) {
  function handleCheckClick(event) {
    const item = {
      cardId: Number(event.target.id),
      isChecked: event.target.checked,
    };
    updateChangedSinceLastSave(item);
  }

  return (
    <tr className="checklist__checklist-item">
      <td className="checklist-item__cardnumber">{numPrefix + cardNumber}</td>
      <td className="checklist-item__player" num={cardNumber} player={card}>
        <h4>{card}</h4>
      </td>
      <td>
        <input
          id={cardNumber}
          defaultChecked={isInCollection}
          type="checkbox"
          className="checklist-item__checkbox"
          onClick={(event) => handleCheckClick(event)}
        />
      </td>
    </tr>
  );
}

export { ChecklistItem };
