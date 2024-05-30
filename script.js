$(document).ready(function () {
  const openModalBtn = $("#open-modal-btn");
  const modal = $("#modal");
  const closeModalBtn = $(".close-btn");
  const addContactForm = $("#contact-form");
  const contactsList = $(".contacts-list");
  const searchInput = $("#search-input");
  const contactSubmitBtn = $("#submit-btn");
  const windowScreen = $(window);

  function openModal() {
    modal.css("display", "block");
  }

  function closeModal() {
    modal.css("display", "none");
  }

  function closeOutsideModal(event) {
    if (event.target == modal[0]) {
      closeModal();
    }
  }

  function addContact(event) {
    event.preventDefault();
    const name = $("#name").val();
    const phone = $("#phone").val();
    const contactInfo = name + ": " + phone;
    renderContact(contactInfo);
    saveContact(contactInfo);
    addContactForm[0].reset();
    closeModal();
  }

  function renderContact(contactInfo) {
    const contactDiv = $("<div>").addClass("contact");
    const infoDiv = $("<div>").addClass("contact-info").text(contactInfo);
    contactDiv.append(infoDiv);
    const removeButton = $("<button>").text("Remove").addClass("remove-btn");
    removeButton.click(function () {
      contactDiv.remove();
      removeContact(contactInfo);
    });
    contactDiv.append(removeButton);
    contactsList.append(contactDiv);
  }

  function filterContacts() {
    const searchText = searchInput.val().toLowerCase().trim();
    if (searchText !== "") {
      contactsList.children().each(function () {
        const contact = $(this);
        const contactInfo = contact.text().toLowerCase();
        contactInfo.includes(searchText) ? contact.show() : contact.hide();
      });
    } else {
      contactsList.children().show();
    }
  }

  function saveContact(contactInfo) {
    let contacts = JSON.parse(window.localStorage.getItem("contacts")) || [];
    contacts.push(contactInfo);
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function removeContact(contactInfo) {
    let contacts = JSON.parse(window.localStorage.getItem("contacts")) || [];
    contacts = contacts.filter((contact) => contact !== contactInfo);
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  function renderContactsFromStorage() {
    let contacts = JSON.parse(window.localStorage.getItem("contacts")) || [];
    contacts.forEach((contact) => renderContact(contact));
  }

  // Event listeners
  openModalBtn.click(openModal);
  closeModalBtn.click(closeModal);
  windowScreen.click(closeOutsideModal);
  contactSubmitBtn.click(addContact);
  searchInput.on("input", filterContacts);

  renderContactsFromStorage();
});
