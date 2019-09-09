export default class Thread {
  constructor() {
    this.editButton = document.querySelector("#edit-button");
    this.editForm = document.querySelector(".edit-form");
    this.events();
  }
  events() {
    this.editButton.addEventListener("click", () => this.openEdit());
  }

  //Methods
  openEdit() {
    this.editForm.classList.add("edit-form--visible");
  }
}
