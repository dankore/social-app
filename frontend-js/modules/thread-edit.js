export default class Thread {
  constructor() {
    this.threadCloseButtons = document.querySelectorAll(".thread-close-button")
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editForms = document.querySelectorAll(".edit-form");
    this.threadContainers = document.querySelectorAll(".thread-box");

    // Events and methods
    Array.from(this.editButtons).map((item, idx)=>{
        return this.editButtons[idx].addEventListener('click', () => {
          Array.from(this.editForms).forEach(item2 => {
            return this.editForms[idx].classList.add("edit-form--visible");
          })
          Array.from(this.threadCloseButtons).map(item3 => {
            return this.threadCloseButtons[idx].addEventListener('click', () => {
                this.editForms[idx].classList.remove("edit-form--visible")
                // Re-display thread after cancel
                Array.from(this.threadContainers).map(item4 => {
                this.threadContainers[idx].classList.remove("edit-form")})
            })  
          })
          Array.from(this.threadContainers).map(item4 => {
              return this.threadContainers[idx].classList.add("edit-form")
          })
        })
    })
  }
}

