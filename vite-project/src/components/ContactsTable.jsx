import ContactItem from "./ContactItem";

export default function ContactsTable({ contacts, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
