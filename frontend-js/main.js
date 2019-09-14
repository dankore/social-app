import Search from "./modules/search";
import Chat from "./modules/chat";
import RegistrationForm from "./modules/registrationForm";
import Thread from "./modules/thread-edit"

if (document.querySelector("#registration-form")) {
  new RegistrationForm();
}

if (document.querySelector("#chat-wrapper")) {
  new Chat();
}
if (document.querySelector(".header-search-icon")) {
  new Search();
}

if(document.querySelectorAll('.edit-form')){
    new Thread()
}
