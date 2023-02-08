const { readFile, writeFile } = require("fs").promises;
const { resolve } = require("path");

const contactsPath = resolve("./db/contacts.json");

const getContactId = (parsedData) => {
  const contactId = parsedData.map((contact) => {
    return Number(contact.id);
  });
  const nextId = Math.max(...contactId) + 1;
  return String(nextId);
};

async function getListContacts() {
  try {
    const data = await readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);
    const list = parsedContacts.map((contact) => {
      return contact;
    });
    console.table(list);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);
    const foundContact = parsedContacts.filter((contact) => {
      if (Number(contact.id) === contactId) {
        return contact;
      }
    });
    console.log(foundContact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);
    const newContacts = parsedContacts.filter((contact) => {
      if (Number(contact.id) !== contactId) {
        return contact;
      }
    });
    writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    console.log(`Contact was removed`);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newContent = parsedData.push({
      id: getContactId(parsedData),
      name,
      email,
      phone,
    });

    writeFile(contactsPath, JSON.stringify(parsedData), "utf8");
    console.log(`Contact was added`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
