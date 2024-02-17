import { useState } from "react";

function ReservationForm({ mealId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_name: name,
          contact_email: email,
          contact_phonenumber: phoneNumber,
          number_of_guests: numberOfGuests,
          meal_id: mealId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(
          "Your reservation was successfully made. We look forward to seeing you!!"
        );
      } else {
        const data = await response.json();
        alert(data.error || "Failed to make reservation. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Guests:</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
          min="1"
        />
      </div>

      <button type="submit">Reserve</button>
    </form>
  );
}

export default ReservationForm;
