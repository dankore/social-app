export default class Thread {
  constructor() {
    this.editButtons = document.querySelectorAll(".edit-button");
    this.editForms = document.querySelectorAll(".edit-form");
    Array.from(this.editButtons).forEach(item=>{
        return item.addEventListener('click', () => {
          Array.from(this.editForms).forEach(item2 =>{
            return item2.classList.add("edit-form--visible");
          })
        })
    })
  }
}

