import "./CreateNewChecklistModal.css"
import ChecklistForm from "./ChecklistForm"

function CreateNewChecklistModal() {

    return (
        <section className='modal'>
            <article className='modal__form'>
                <h1 className="modal__h1">Create New Checklist</h1>
                <ChecklistForm />

            </article>

        </section>
    )
}



export { CreateNewChecklistModal }
