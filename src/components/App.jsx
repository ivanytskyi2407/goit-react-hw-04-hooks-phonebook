import { Component } from 'react';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Phonebook/Contacts/Contacts';
import Filter from './Phonebook/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const noUniqueName = this.state.contacts
      .map(e => e.name.toLowerCase())
      .includes(name.toLowerCase());
    if (noUniqueName) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filter = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filter;
  };
  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    return (
      <div>
        <h2>Phonebook</h2>
        <Phonebook onSubmit={this.addContact} />
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <h2>Contacts</h2>
        <Contacts
          contacts={this.filterContacts()}
          onRemoveContact={this.removeContact}
        />
      </div>
    );
  }
}
