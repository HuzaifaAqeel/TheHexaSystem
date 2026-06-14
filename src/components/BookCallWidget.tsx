import React, { useState } from "react";

/* ─── Types ─── */
type Step = "calendar" | "time" | "form" | "confirmed";

/* ─── Data ─── */
const WEEKS = [
  {
    label: "JUN 9 – JUN 15, 2026",
    days: [
      { abbr: "TUE", num: "9",  full: "Tue, Jun 9"  },
      { abbr: "WED", num: "10", full: "Wed, Jun 10" },
      { abbr: "THU", num: "11", full: "Thu, Jun 11" },
      { abbr: "FRI", num: "12", full: "Fri, Jun 12" },
      { abbr: "SAT", num: "13", full: "Sat, Jun 13" },
      { abbr: "SUN", num: "14", full: "Sun, Jun 14" },
      { abbr: "MON", num: "15", full: "Mon, Jun 15" },
    ],
  },
  {
    label: "JUN 16 – JUN 22, 2026",
    days: [
      { abbr: "TUE", num: "16", full: "Tue, Jun 16" },
      { abbr: "WED", num: "17", full: "Wed, Jun 17" },
      { abbr: "THU", num: "18", full: "Thu, Jun 18" },
      { abbr: "FRI", num: "19", full: "Fri, Jun 19" },
      { abbr: "SAT", num: "20", full: "Sat, Jun 20" },
      { abbr: "SUN", num: "21", full: "Sun, Jun 21" },
      { abbr: "MON", num: "22", full: "Mon, Jun 22" },
    ],
  },
  {
    label: "JUN 23 – JUN 29, 2026",
    days: [
      { abbr: "TUE", num: "23", full: "Tue, Jun 23" },
      { abbr: "WED", num: "24", full: "Wed, Jun 24" },
      { abbr: "THU", num: "25", full: "Thu, Jun 25" },
      { abbr: "FRI", num: "26", full: "Fri, Jun 26" },
      { abbr: "SAT", num: "27", full: "Sat, Jun 27" },
      { abbr: "SUN", num: "28", full: "Sun, Jun 28" },
      { abbr: "MON", num: "29", full: "Mon, Jun 29" },
    ],
  },
];

const TIME_SLOTS = [
  "12:00 AM", "1:00 AM",  "2:00 AM",  "8:00 AM",
  "9:00 AM",  "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM",  "2:00 PM",  "3:00 PM",  "4:00 PM",
  "5:00 PM",  "6:00 PM",  "7:00 PM",  "8:00 PM",
  "9:00 PM",  "10:00 PM", "11:00 PM",
];

/* ─── Icons ─── */
function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ─── Main Widget ─── */
export default function BookCallWidget() {
  const [step, setStep]           = useState<Step>("calendar");
  const [weekIdx, setWeekIdx]     = useState(0);
  const [selectedDay, setSelectedDay] = useState<(typeof WEEKS[0]["days"][0]) | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");

  const week = WEEKS[weekIdx];

  /* select a day → show times */
  function pickDay(day: typeof WEEKS[0]["days"][0]) {
    setSelectedDay(day);
    setSelectedTime(null);
    setStep("time");
  }

  /* select a time → show form */
  function pickTime(t: string) {
    setSelectedTime(t);
    setStep("form");
  }

  /* go back to calendar */
  function change() {
    setStep("time");
    setSelectedTime(null);
  }

  /* confirm booking */
  function confirm(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setStep("confirmed");
    }
  }

  return (
    <section className="bca-section">
      {/* ── Header ── */}
      <div className="bca-header" data-reveal>
        <div className="bca-kicker">
          <span className="bca-kicker-line" />
          <span>FREE CONSULTATION</span>
          <span className="bca-kicker-line" />
        </div>
        <h2 className="bca-title">
          BOOK A <span>CALL</span>
        </h2>
        <p className="bca-sub">30 minutes. zero pressure</p>
      </div>

      {/* ── Card ── */}
      <div className="bca-card" data-reveal>

        {/* CONFIRMED */}
        {step === "confirmed" && (
          <div className="bca-confirmed">
            <div className="bca-confirmed-icon"><CheckIcon /></div>
            <h3>You're Booked!</h3>
            <p>
              {selectedDay?.full} at {selectedTime}
            </p>
            <p className="bca-confirmed-sub">
              We'll send a calendar invite to <strong>{email}</strong>. See you then!
            </p>
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <form className="bca-form" onSubmit={confirm}>
            <div className="bca-selected-slot">
              <div className="bca-slot-icon"><CalIcon /></div>
              <div className="bca-slot-info">
                <strong>{selectedDay?.full?.toUpperCase()}</strong>
                <span>{selectedTime}</span>
              </div>
              <button type="button" className="bca-change-btn" onClick={change}>
                Change
              </button>
            </div>

            <label className="bca-label">
              <span>YOUR NAME *</span>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </label>

            <label className="bca-label">
              <span>EMAIL ADDRESS *</span>
              <input
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </label>

            <button className="bca-confirm-btn" type="submit">
              CONFIRM BOOKING
            </button>
          </form>
        )}

        {/* CALENDAR + TIMES */}
        {(step === "calendar" || step === "time") && (
          <>
            {/* Week navigation */}
            <div className="bca-week-nav">
              <button
                type="button"
                className="bca-nav-btn"
                onClick={() => setWeekIdx(Math.max(0, weekIdx - 1))}
                disabled={weekIdx === 0}
                aria-label="Previous week"
              >
                ‹
              </button>
              <span className="bca-week-label">{week.label}</span>
              <button
                type="button"
                className="bca-nav-btn"
                onClick={() => setWeekIdx(Math.min(WEEKS.length - 1, weekIdx + 1))}
                disabled={weekIdx === WEEKS.length - 1}
                aria-label="Next week"
              >
                ›
              </button>
            </div>

            {/* Day buttons */}
            <div className="bca-days">
              {week.days.map((d) => {
                const isSelected = selectedDay?.num === d.num && selectedDay?.abbr === d.abbr;
                return (
                  <button
                    key={d.num + d.abbr}
                    type="button"
                    className={`bca-day${isSelected ? " bca-day-active" : ""}`}
                    onClick={() => pickDay(d)}
                  >
                    <span className="bca-day-abbr">{d.abbr}</span>
                    <span className="bca-day-num">{d.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {step === "time" && selectedDay ? (
              <div className="bca-times-wrapper">
                <div className="bca-times-header">
                  <ClockIcon />
                  <span>AVAILABLE TIMES — {selectedDay.abbr}, JUN {selectedDay.num}</span>
                </div>
                <div className="bca-times">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`bca-time${selectedTime === t ? " bca-time-active" : ""}`}
                      onClick={() => pickTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="bca-placeholder">Select a date to see available times</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
