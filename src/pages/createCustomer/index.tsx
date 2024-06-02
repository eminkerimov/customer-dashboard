import { useState } from 'react';
import "./style.scss"

const CreateCustomer = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gsmNumber, setGsmNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const generateCardNumber = () => {
    const cardNum = Math.random().toString().slice(2, 18);
    setCardNumber(cardNum);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call to save the customer)
  };

  return (
    <form onSubmit={handleSubmit} className='createCustomer'>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" required />
      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      <input type="text" value={gsmNumber} onChange={(e) => setGsmNumber(e.target.value)} placeholder="GSM Number" required />
      <button type="button" onClick={generateCardNumber}>Generate Debit Card</button>
      <input type="text" value={cardNumber} readOnly placeholder="Debit Card Number" />
      <button type="submit">Create Customer</button>
    </form>
  );
};

export default CreateCustomer;