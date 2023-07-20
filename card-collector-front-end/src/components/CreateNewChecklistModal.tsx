import "./CreateNewChecklistModal.css"
import ChecklistForm from "./ChecklistForm"

function CreateNewChecklistModal({setShowCreateChecklistModal, setRefetchChecklistCollectionRefArr}) {

    return (
        <section className='modal'>
            <button onClick={()=> setShowCreateChecklistModal(false)} className="modal__close-btn"><i className="fa-regular fa-circle-xmark"></i></button>
            <article className='modal__form'>
                <h1 className="modal__h1">Create New Checklist</h1>
                <ChecklistForm 
                    setShowCreateChecklistModal={ setShowCreateChecklistModal } 
                    setRefetchChecklistCollectionRefArr={setRefetchChecklistCollectionRefArr}

                />

            </article>

        </section>
    )
}



export { CreateNewChecklistModal }
