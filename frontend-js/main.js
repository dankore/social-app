import Search from "./modules/search";
import Chat from "./modules/chat";
import RegistrationForm from "./modules/registrationForm";
import axios from "axios";

if (document.querySelector("#registration-form")) {
  new RegistrationForm();
}

if (document.querySelector("#chat-wrapper")) {
  new Chat();
}
if (document.querySelector(".header-search-icon")) {
  new Search();
}

// document.addEventListener("click", e => {
//   // Delete feature
//   if (e.target.classList.contains("delete-me")) {
//     if (confirm("Do you want to delete this item?")) {
//       axios
//         .post("/delete", {
//           id: e.target.getAttribute("data-id")
//         })
//         .then(() => {
//           //Run when axios action  is complete
//           e.target.parentElement.parentElement.remove();
//           console.log(e.target.getAttribute("data-id"));
//         })
//         .catch(() => {
//           console.log("Please try again later");
//         });
//     }
//   }})
