import { useState } from "react"
import "./flight.css"

const PlaneSeatingSystem = () => {
  const initializeSeats = () => {
    const seats = []
    for (let row = 1; row <= 3; row++) {
      ;["A", "B", "C", "D"].forEach((letter) => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          class: "business",
          status: "available",
          passenger: null,
          gender: null,
          isWindow: letter === "A" || letter === "D", // Window seats in business class
        })
      })
    }

    for (let row = 4; row <= 20; row++) {
      ;["A", "B", "C", "D", "E", "F"].forEach((letter) => {
        seats.push({
          id: `${row}${letter}`,
          row,
          letter,
          class: "economy",
          status: "available",
          passenger: null,
          gender: null,
          isWindow: letter === "A" || letter === "F", // Window seats in economy class
        })
      })
    }
    return seats
  }

  const [seats, setSeats] = useState(initializeSeats())
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [bookingForm, setBookingForm] = useState({ name: "", gender: "male", class: "economy" })
  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleSeatClick = (seat) => {
    if (seat.status === "reserved") return
    setSelectedSeat(seat)
    setShowBookingModal(true)
    setBookingForm((prev) => ({ ...prev, class: seat.class }))
  }

  const handleBooking = () => {
    if (!bookingForm.name.trim()) {
      alert("Enter name")
      return
    }
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === selectedSeat.id
          ? {
              ...seat,
              status: "reserved",
              passenger: bookingForm.name,
              gender: bookingForm.gender,
            }
          : seat,
      ),
    )
    setBookingForm({ name: "", gender: "male", class: "economy" })
    setSelectedSeat(null)
    setShowBookingModal(false)
  }

  const cancelReservation = (seatId) => {
    setSeats((prev) =>
      prev.map((seat) => (seat.id === seatId ? { ...seat, status: "available", passenger: null, gender: null } : seat)),
    )
  }

  const getSeatColor = (seat) => {
    if (seat.status === "available") return seat.class === "business" ? "business-available" : "economy-available"
    if (seat.gender === "male") return "male"
    if (seat.gender === "female") return "female"
    return "other"
  }

  const groupSeatsByRow = (list) => {
    return list.reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = []
      acc[seat.row].push(seat)
      return acc
    }, {})
  }

  const businessRows = groupSeatsByRow(seats.filter((s) => s.class === "business"))
  const economyRows = groupSeatsByRow(seats.filter((s) => s.class === "economy"))

  return (
    <div className="container">
      <h1 className="title">Plane Seating</h1>

      <div className="section">
        <h2>Business</h2>
        {Object.entries(businessRows).map(([row, seats]) => (
          <div className="row" key={row}>
            <span className="row-label">{row}</span>
            {seats.slice(0, 2).map((seat) => (
              <button
                key={seat.id}
                className={`seat ${getSeatColor(seat)}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "reserved"}
                title={seat.isWindow ? `${seat.id} - Window Seat` : seat.id}
              >
                {seat.letter}
              </button>
            ))}
            <span className="aisle" />
            {seats.slice(2).map((seat) => (
              <button
                key={seat.id}
                className={`seat ${getSeatColor(seat)}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "reserved"}
                title={seat.isWindow ? `${seat.id} - Window Seat` : seat.id}
              >
                {seat.letter}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Economy</h2>
        {Object.entries(economyRows).map(([row, seats]) => (
          <div className="row" key={row}>
            <span className="row-label">{row}</span>
            {seats.slice(0, 3).map((seat) => (
              <button
                key={seat.id}
                className={`seat ${getSeatColor(seat)}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "reserved"}
                title={seat.isWindow ? `${seat.id} - Window Seat` : seat.id}
              >
                {seat.letter}
              </button>
            ))}

            <span className="aisle" />
            {seats.slice(3).map((seat) => (
              <button
                key={seat.id}
                className={`seat ${getSeatColor(seat)}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "reserved"}
                title={seat.isWindow ? `${seat.id} - Window Seat` : seat.id}
              >
                {seat.letter}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Reserved Seats</h3>
        {seats
          .filter((s) => s.status === "reserved")
          .map((s) => (
            <div className="reserved-item" key={s.id}>
              {s.id} - {s.passenger} ({s.gender}) - {s.class} {s.isWindow ? "(Window)" : ""}
              <button onClick={() => cancelReservation(s.id)}>Cancel</button>
            </div>
          ))}
      </div>

      {showBookingModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Book Seat {selectedSeat.id} {selectedSeat.isWindow ? "(Window Seat)" : ""}
            </h3>
            <input
              type="text"
              placeholder="Passenger name"
              value={bookingForm.name}
              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
            />
            <select
              value={bookingForm.gender}
              onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleBooking}>Confirm</button>
              <button
                onClick={() => {
                  setShowBookingModal(false)
                  setSelectedSeat(null)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaneSeatingSystem