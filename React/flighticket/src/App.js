import { useState } from "react"

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
          isWindow: letter === "A" || letter === "D",
          price: 30000,
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
          isWindow: letter === "A" || letter === "F",
          price: 13000,
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
      alert("Please enter passenger name");
      return;
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
      prev.map((seat) => (
        seat.id === seatId ? 
        { 
          ...seat, 
          status: "available", 
          passenger: null, 
          gender: null }
         : 
         seat
        )
      ),
    )
  }

  const getSeatStyles = (seat) => {
    const baseStyles =
      "w-8 h-8 m-0.5 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 border-2"

    if (seat.status === "available") {
      return (seat.class === "business")
        ? `${baseStyles} bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer`
        : `${baseStyles} bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer`
    }

    //If seat not available
    if (seat.gender === "male") return `${baseStyles} bg-blue-500 border-blue-600 text-white cursor-not-allowed`
    if (seat.gender === "female") return `${baseStyles} bg-pink-500 border-pink-600 text-white cursor-not-allowed`
    return `${baseStyles} bg-purple-500 border-purple-600 text-white cursor-not-allowed`
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
  const reservedSeats = seats.filter((s) => s.status === "reserved")
  const totalPrice = reservedSeats.reduce((sum, seat) => sum + seat.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <h1 className="text-4xl font-bold text-gray-900">Flight Booking System</h1>
          </div>
          <p className="text-gray-600">Select your preferred seat for the journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Seat Selection
                </h2>
              </div>

              <div className="p-6 space-y-8">
                {/* Legend */}
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-50 border-2 border-blue-200 rounded"></div>
                    <span className="text-sm">Business Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
                    <span className="text-sm">Economy Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Male</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="text-sm">Female</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Other</span>
                  </div>
                </div>

                {/* Business Class */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Business Class - Rs. 30000
                    </span>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(businessRows).map(([row, rowSeats]) => (
                      <div className="flex items-center gap-2" key={row}>
                        <span className="w-8 text-center text-sm font-medium text-gray-600">{row}</span>
                        
                        <div className="flex gap-1">
                          {rowSeats.slice(0, 2).map((seat) => (    //Returns array from 0 to 1
                            <button
                              key={seat.id}
                              className={getSeatStyles(seat)}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === "reserved"}
                              title={`${seat.id}${seat.isWindow ? " - Window Seat" : ""}`}
                            >
                              {seat.letter}
                            </button>
                          ))}
                        </div>
                        
                        <div className="w-8"></div>
                        
                        <div className="flex gap-1">
                          {rowSeats.slice(2).map((seat) => ( //Returns the array from 2 to end of array, same as slice(2,4)
                            <button
                              key={seat.id}
                              className={getSeatStyles(seat)}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === "reserved"}
                              title={`${seat.id}${seat.isWindow ? " - Window Seat" : ""}`}
                            >
                              {seat.letter}
                            </button>
                          ))}
                        
                        </div>
                      
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Economy Class */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                      Economy Class - Rs. 13000
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(economyRows).map(([row, rowSeats]) => (
                      <div className="flex items-center gap-2" key={row}>
                        <span className="w-8 text-center text-sm font-medium text-gray-600">{row}</span>
                        <div className="flex gap-1">
                          {rowSeats.slice(0, 3).map((seat) => (
                            <button
                              key={seat.id}
                              className={getSeatStyles(seat)}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === "reserved"}
                              title={`${seat.id}${seat.isWindow ? " - Window Seat" : ""}`}
                            >
                              {seat.letter}
                            </button>
                          ))}
                        </div>

                        <div className="w-8"></div>
                        
                        <div className="flex gap-1">
                          {rowSeats.slice(3).map((seat) => (
                            <button
                              key={seat.id}
                              className={getSeatStyles(seat)}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === "reserved"}
                              title={`${seat.id}${seat.isWindow ? " - Window Seat" : ""}`}
                            >
                              {seat.letter}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Booking Summary
                </h2>
              </div>

              <div className="p-6 space-y-4">
                {reservedSeats.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No seats selected</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {reservedSeats.map((seat) => (
                        <div key={seat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>

                            <div className="font-medium">{seat.id}</div>
                            <div className="text-sm text-gray-600">
                              {seat.passenger} • {seat.class}
                              {seat.isWindow && " • Window"}
                            </div>

                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium">Rs. {seat.price}</span>
                            <button
                              onClick={() => cancelReservation(seat.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">Rs. {totalPrice}</span>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                      Proceed to Payment
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Flight Info */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Flight Information</h2>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flight</span>
                  <span className="font-medium">AA 1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route</span>
                  <span className="font-medium">Shimla → Bangalore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">June 22, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure</span>
                  <span className="font-medium">10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Book Seat {selectedSeat?.id}
                {selectedSeat?.isWindow && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Window Seat
                  </span>
                )}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{selectedSeat?.class} Class</span>
                  <span className="text-lg font-bold text-blue-600">Rs. {selectedSeat?.price}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="passenger-name" className="block text-sm font-medium text-gray-700">
                  Passenger Name
                </label>
                <input
                  id="passenger-name"
                  type="text"
                  placeholder="Enter passenger name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={bookingForm.gender}
                  onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleBooking}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md border border-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlaneSeatingSystem