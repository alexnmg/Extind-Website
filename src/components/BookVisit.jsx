import { useMemo, useState } from 'react'

const INTERESTS = ['Private office', 'Coworking', 'Meeting room', 'Events space']

const TIMES = []
for (let h = 9; h <= 17; h++) {
  TIMES.push(`${h}:00`)
  if (h < 17) TIMES.push(`${h}:30`)
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function buildWeeks(year, month) {
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const lead = (first.getDay() + 6) % 7 // Monday-first offset
  const cells = Array(lead).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function StepDots({ step }) {
  return (
    <div className="step-dots" aria-label={`Step ${step} of 3`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`step-dots__dot${n === step ? ' step-dots__dot--active' : ''}`} />
      ))}
    </div>
  )
}

export default function BookVisit({
  title = 'Book a Visit',
  subtitle = 'See the space in person',
  description = 'Schedule a guided tour of our coworking space. Meet the community, explore the amenities, and find the perfect workspace for your needs.',
  ctaLabel = 'Call us now',
}) {
  const today = new Date()
  const [step, setStep] = useState(1)
  const [interest, setInterest] = useState(INTERESTS[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [month, setMonth] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const weeks = useMemo(() => buildWeeks(month.year, month.month), [month])

  const isPast = (day) => {
    const date = new Date(month.year, month.month, day)
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < startOfToday
  }
  const isToday = (day) =>
    day === today.getDate() && month.month === today.getMonth() && month.year === today.getFullYear()
  const isSelected = (day) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === month.month &&
    selectedDate.getFullYear() === month.year

  const prevMonthDisabled = month.year === today.getFullYear() && month.month === today.getMonth()
  const changeMonth = (delta) => {
    setMonth(({ year, month: m }) => {
      const d = new Date(year, m + delta, 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  const summaryDate = selectedDate
    ? `${MONTHS[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedTime ?? ''}`.trim()
    : ''

  return (
    <section className="book-visit">
      <div className="vista__card book-visit__card">
        <h3 className="vista__card-title">{title}</h3>
        <p className="vista__card-sub">{subtitle}</p>
        <p className="vista__card-desc">{description}</p>
        <button type="button" className="text-button">
          <span>{ctaLabel}</span>
          <span>→</span>
        </button>
      </div>

      <div className="book-visit__form">
        {submitted ? (
          <>
            <h4 className="book-visit__heading">Thank you, {name || 'friend'}!</h4>
            <p className="book-visit__thanks">
              Your tour is requested for {summaryDate}. We&apos;ll confirm by email shortly.
            </p>
          </>
        ) : (
          <>
            <StepDots step={step} />

            {step === 1 && (
              <>
                <h4 className="book-visit__heading">What are you looking for?</h4>
                <p className="book-visit__label">I&apos;m interested in</p>
                <div className="radio-group" role="radiogroup" aria-label="I'm interested in">
                  {INTERESTS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={interest === option}
                      className={`radio-pill${interest === option ? ' radio-pill--selected' : ''}`}
                      onClick={() => setInterest(option)}
                    >
                      <span className="radio-pill__circle" />
                      <span className="radio-pill__label">{option}</span>
                    </button>
                  ))}
                </div>
                <div className="field-row">
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="Enter text..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input
                      className="field__input"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="book-visit__footer">
                  <button type="button" className="btn btn--primary" onClick={() => setStep(2)}>
                    Continue to date &amp; time&ensp;→
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h4 className="book-visit__heading">Pick a date &amp; time</h4>
                <div className="date-time-row">
                  <div className="calendar">
                    <div className="calendar__header">
                      <p className="calendar__month">
                        {MONTHS[month.month]} {month.year}
                      </p>
                      <div className="calendar__arrows">
                        <button
                          type="button"
                          className="calendar__arrow"
                          aria-label="Previous month"
                          disabled={prevMonthDisabled}
                          onClick={() => changeMonth(-1)}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          className="calendar__arrow"
                          aria-label="Next month"
                          onClick={() => changeMonth(1)}
                        >
                          ›
                        </button>
                      </div>
                    </div>
                    <div className="calendar__divider" />
                    <div className="calendar__days">
                      <div className="calendar__weekdays">
                        {WEEKDAYS.map((d) => (
                          <span key={d} className="calendar__weekday">
                            {d}
                          </span>
                        ))}
                      </div>
                      {weeks.map((week, wi) => (
                        <div key={wi} className="calendar__week">
                          {week.map((day, di) =>
                            day === null ? (
                              <span key={di} className="day-cell day-cell--empty" />
                            ) : (
                              <button
                                key={di}
                                type="button"
                                className={`day-cell${isSelected(day) ? ' day-cell--selected' : isToday(day) ? ' day-cell--today' : ''}`}
                                disabled={isPast(day)}
                                onClick={() =>
                                  setSelectedDate(new Date(month.year, month.month, day))
                                }
                              >
                                {day}
                              </button>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="time-picker">
                    <p className="time-picker__label">Available times</p>
                    <div className="time-slots">
                      {TIMES.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot${selectedTime === time ? ' time-slot--selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="book-visit__footer book-visit__footer--split">
                  <button type="button" className="btn btn--ghost btn--back" onClick={() => setStep(1)}>
                    ←&ensp;Back
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    disabled={!selectedDate || !selectedTime}
                    style={!selectedDate || !selectedTime ? { opacity: 0.45, cursor: 'default' } : undefined}
                    onClick={() => setStep(3)}
                  >
                    Continue&ensp;→
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="booking-summary">
                  <span className="booking-summary__pill">30 minutes</span>
                  <span className="booking-summary__divider" />
                  <span className="booking-summary__pill">{interest}</span>
                  <span className="booking-summary__divider" />
                  <span className="booking-summary__pill">{summaryDate}</span>
                </div>
                <h4 className="book-visit__heading">Your information</h4>
                <div className="field-row field-row--wide">
                  <label className="field">
                    <span className="field__label">Name</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="Enter text..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input
                      className="field__input"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="field-row field-row--wide">
                  <label className="field">
                    <span className="field__label">Company</span>
                    <input
                      className="field__input"
                      type="text"
                      placeholder="Enter text..."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Phone number</span>
                    <span className="phone-input">
                      <span className="phone-input__prefix">
                        <span className="phone-input__flag" aria-hidden="true" />
                        <span className="phone-input__code">+1</span>
                        <span className="phone-input__chevron">∨</span>
                        <span className="phone-input__sep" />
                      </span>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </span>
                  </label>
                </div>
                <label className="field" style={{ width: '100%' }}>
                  <span className="field__label">Anything else we should know?</span>
                  <textarea
                    className="field__input"
                    placeholder="Your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                <button
                  type="button"
                  className={`checkbox-row${agreed ? ' checkbox-row--checked' : ''}`}
                  onClick={() => setAgreed((v) => !v)}
                  role="checkbox"
                  aria-checked={agreed}
                >
                  <span className="checkbox-row__box">
                    {agreed && (
                      <svg viewBox="0 0 16 20" width="12" height="15" fill="none" aria-hidden="true">
                        <path
                          d="M13.333 6.3335L6 13.6665L2.667 10.3335"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="checkbox-row__label">I agree to the Terms and Privacy Policy</span>
                </button>
                <div className="book-visit__footer book-visit__footer--split">
                  <button type="button" className="btn btn--ghost btn--back" onClick={() => setStep(2)}>
                    ←&ensp;Back
                  </button>
                  <button type="button" className="btn btn--primary" onClick={() => setSubmitted(true)}>
                    Book tour
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
