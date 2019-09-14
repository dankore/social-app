export default class Thread {
  constructor() {
    this.threadCloseButtons = document.querySelectorAll(".thread-close-button")
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editForms = document.querySelectorAll(".edit-form");

    // Events and methods
    Array.from(this.editButtons).map((item, idx)=>{
        return this.editButtons[idx].addEventListener('click', () => {
          Array.from(this.editForms).forEach(item2 => {
            return this.editForms[idx].classList.add("edit-form--visible");
          })
          Array.from(this.threadCloseButtons).map(item3 => {
            return this.threadCloseButtons[idx].addEventListener('click', (e) => {
              return this.editForms[idx].classList.remove("edit-form--visible");
            })
          })
        })
    })
  }
}

