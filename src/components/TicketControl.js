import React, { useState, useEffect } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import db from './../firebase.js';
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const TicketControl = () => {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "tickets"),
      (collectionSnapshot) => {
        const tickets = [];
        collectionSnapshot.forEach((doc) => {
          tickets.push({
            ...doc.data(), // transforms all of a document's data into a JS object witg spread operator.
            id: doc.id
          });
        });
        setMainTicketList(tickets);
      },
      (error) => {

      }
    );

    return () => unSubscribe();
  }, []);


  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
      .filter(ticket => ticket.id !== selectedTicket.id)
      .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    setEditing(false);
    setSelectedTicket(null);
  }

  const handleAddingNewTicketToList = async (newTicketData) => {
    const collectionRef = collection(db, "tickets");
    await addDoc(collectionRef, newTicketData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    // new code: updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(selection);
  }


  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing) {
    currentlyVisibleState =
      <EditTicketForm
        ticket={selectedTicket}
        onEditTicket={handleEditingTicketInList} />;
    buttonText = "Return to Ticket List";
  } else if (selectedTicket != null) {
    currentlyVisibleState =
      <TicketDetail
        ticket={selectedTicket}
        onClickingDelete={handleDeletingTicket}
        onClickingEdit={handleEditClick} />;
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState =
      <NewTicketForm
        onNewTicketCreation={handleAddingNewTicketToList} />;
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState =
      <TicketList
        onTicketSelection={handleChangingSelectedTicket}
        ticketList={mainTicketList} />;
    buttonText = "Add Ticket";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}

export default TicketControl;