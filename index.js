const {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getListContacts();
      break;

    case "get":
      getContactById(Number(id));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(Number(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
