import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { days } from "../data";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

export default function BookCall() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    if (selectedDay && selectedTime) {
      setIsBooked(true);
      setTimeout(() => {
        navigate(`/contact?date=${encodeURIComponent(selectedDay)}&time=${encodeURIComponent(selectedTime!)}`);
      }, 1500);
    }
  };

  return (
    <section className="section book-call-section section-dark">
      <div className="book-call-container" data-reveal>
        <div className="book-call-header">
          <div className="kicker-wrapper">
            <span className="kicker-line"></span>
            <span className="kicker-text">FREE CONSULTATION</span>
            <span className="kicker-line"></span>
          </div>
          <h2>BOOK A <span className="highlight-green">CALL</span></h2>
          <p className="calligraphic-sub">30 minutes, zero pressure</p>
        </div>

        <div className="book-call-card">
          <div className="calendar-nav">
            <button className="nav-btn" type="button">‹</button>
            <span className="date-range">JUN 8 - JUN 14, 2026</span>
            <button className="nav-btn" type="button">›</button>
          </div>

          <div className="day-grid">
            {days.map(([day, date]) => (
              <button
                type="button"
                className={selectedDay === date ? "selected" : ""}
                onClick={() => {
                  setSelectedDay(date);
                  setSelectedTime(null);
                  setIsBooked(false);
                }}
                key={date}
              >
                <span>{day}</span>
                <strong>{date}</strong>
              </button>
            ))}
          </div>

          {selectedDay ? (
            <div className="time-slots-wrapper" key={selectedDay}>
              <div className="available-times-header">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>AVAILABLE TIMES — JUN {selectedDay}</span>
              </div>
              <div className="time-slots">
                {timeSlots.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={selectedTime === time ? "selected" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {selectedTime && !isBooked && (
                <div className="booking-confirm">
                  <p className="booking-summary">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Jun {selectedDay}, 2026 at {selectedTime}
                  </p>
                  <button className="button button-green booking-btn" type="button" onClick={handleBooking}>
                    Confirm Booking <span className="button-arrow" aria-hidden="true" />
                  </button>
                </div>
              )}
              {isBooked && (
                <div className="booking-success">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <p>Booking confirmed! Redirecting you to finalise...</p>
                </div>
              )}
            </div>
          ) : (
            <p className="select-date-text">
              Select a date to see available times
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
