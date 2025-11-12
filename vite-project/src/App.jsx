import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactsTable from "./components/ContactsTable";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const url = `${import.meta.env.BASE_URL}contacts.json`;
        const response = await fetch(url);
        const data = await response.json();

        setContacts(data);
      } catch (error) {
        console.error("Не вдалося завантажити контакти:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSaveContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
    setShowList(true);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCancelForm = () => {
    setShowList(true);
  };

  return (
    <>
      <button onClick={() => setShowList(true)}>Contacts List</button>{" "}
      <button onClick={() => setShowList(false)}>Contacts Form</button>
      {showList ? (
        <ContactsTable contacts={contacts} onDelete={handleDeleteContact} />
      ) : (
        <span>
          <ContactForm
            onSave={handleSaveContact}
            onCancel={handleCancelForm}
          ></ContactForm>
        </span>
      )}
    </>
  );
}

export default App;
