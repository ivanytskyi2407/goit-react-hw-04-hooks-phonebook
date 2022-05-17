// import { Component } from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Phonebook/Contacts/Contacts';
import Filter from './Phonebook/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  // const changeFilter = e => {
  //   const { name, value } = e.currentTarget;
  //   setFilter({ [name]: value });
  // };
  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const removeContact = contactId => {
    setContacts(prevState => {
      console.log(prevState);
      return [...prevState].filter(({ id }) => id !== contactId);
    });
  };

  // useEffect(() => {
  //   const contacts = localStorage.getItem('contacts');
  //   const parseContacts = JSON.parse(contacts);
  //   if (parseContacts) {
  //     setContacts({ contacts: parseContacts });
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = (name, number) => {
    const noUniqueName = contacts
      .map(e => e.name.toLowerCase())
      .includes(name.toLowerCase());
    if (noUniqueName) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevState => {
        return [...prevState, contact];
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook onSubmit={addContact} />
      <Filter value={filter} onChange={changeFilter} />
      <h2>Contacts</h2>
      {/* <Contacts contacts={filterContacts()} onRemoveContact={removeContact} /> */}
      <Contacts
        contacts={filterContacts()}
        filter={filter}
        onRemoveContact={removeContact}
      />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const noUniqueName = this.state.contacts
//       .map(e => e.name.toLowerCase())
//       .includes(name.toLowerCase());
//     if (noUniqueName) {
//       return alert(`${name} is already in contacts`);
//     }
//     const contact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   filterContacts = () => {
//     const normalizedFilter = this.state.filter.toLowerCase();
//     const filter = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//     return filter;
//   };
//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h2>Phonebook</h2>
//         <Phonebook onSubmit={this.addContact} />
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <h2>Contacts</h2>
//         <Contacts
//           contacts={this.filterContacts()}
//           onRemoveContact={this.removeContact}
//         />
//       </div>
//     );
//   }
// }
