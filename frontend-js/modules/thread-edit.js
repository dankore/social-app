export default class Thread {
  constructor() {
    this.editButtons = document.querySelectorAll(".edit-button");
    Array.from(this.editButtons).forEach(item=>{
        return item.addEventListener('click', () => this.openEdit())
    })
    this.editForm = document.getElementByd("edit-form");

  }
openEdit(){
this.editForm.classList.add("edit-form--visible")
}

}

