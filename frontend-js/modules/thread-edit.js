export default class Thread {
  constructor() {
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editForms = document.querySelectorAll(".edit-form");
    Array.from(this.editButtons).map((item, idx)=>{
        return this.editButtons[idx].addEventListener('click', () => {
          Array.from(this.editForms).forEach(item2 =>{
            return this.editForms[idx].classList.add("edit-form--visible");
          })
        })
    })
  }
}

