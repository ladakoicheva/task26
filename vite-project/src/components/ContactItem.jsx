function ContactItem({ contact, onDelete }) {
  return (
    <tr>
      <th scope="row" data-label="id">
        {contact.id}
      </th>
      <td data-label="Name">{contact.name}</td>
      <td data-label="Phone">{contact.phone}</td>
      <td data-label="Actions">
        <button className="delete-btn" onClick={() => onDelete?.(contact.id)}>
          delete
        </button>
      </td>
    </tr>
  );
}

export default ContactItem;
