export default class Thread {
    constructor() {
        this.editButton = document.querySelector('#edit-button')
        this.editForm = document.querySelector('.edit-form')

        this.events()
    }
    events(){
        this.editButton.addEventListener('click', (e) => this.openEdit(console.log(e)))
    }

    //Methods
    openEdit(){
        this.editForm.classList.remove('edit-form--visible')
    }
}