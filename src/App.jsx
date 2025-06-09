import React from 'react'
import { useState } from 'react'
import logo from './assets/logo.png'
import viteLogo from '/vite.svg'
import bgImage from './assets/bg.png'
import './App.css' // You can remove this if all styles are migrated to Tailwind
import './index.css' // Import Tailwind CSS styles
import ReactDatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import ReCAPTCHA from "react-google-recaptcha";

const questions = [
  {
    label: "What's your destination?",
    placeholder: 'Eg: Kashmir, Manali, Bali...',
    type: 'text',
    required: true,
    name: 'destination',
  },
  {
    label: 'How many total travellers?',
    placeholder: 'Enter total travellers',
    type: 'number',
    required: true,
    name: 'travellers',
  },
  {
    label: 'How many adults?',
    placeholder: 'Enter total adults',
    type: 'number',
    required: true,
    name: 'adults',
  },
  {
    label: 'What type of stay do you prefer?',
    type: 'select',
    required: false,
    name: 'stayType',
    options: [
      { value: '', label: 'Please Select', disabled: true },
      { value: 'Hotel', label: 'Hotel' },
      { value: 'Resort', label: 'Resort' },
      { value: 'Homestay', label: 'Homestay' },
      { value: 'Tent', label: 'Tent' },
    ],
  },
  {
    label: 'How many rooms/tents do you need?',
    placeholder: 'Enter number of rooms/tents',
    type: 'number',
    required: true,
    name: 'rooms',
  },
  {
    label: 'Are your travel dates fixed?',
    type: 'radio',
    required: true,
    name: 'datesFixed',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No, Will provide tentative dates' },
    ],
  },
  {
    label: 'What is your arrival date?',
    type: 'date',
    required: true,
    name: 'arrival',
  },
  {
    label: 'What is your departure date?',
    type: 'date',
    required: true,
    name: 'departure',
  },
  {
    label: 'Which places do you wish to cover?',
    type: 'textarea',
    required: false,
    name: 'places',
    placeholder: 'Eg: Manali, Solang Valley, Rohtang Pass...'
  },
  {
    label: 'Any special requests?',
    type: 'textarea',
    required: false,
    name: 'requests',
    placeholder: 'Let us know your special requests'
  },
  {
    label: 'What is your estimated total budget?',
    type: 'number',
    required: false,
    name: 'budget',
    prefix: '₹',
    placeholder: 'Enter your budget'
  },
];

const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div style={{ position: "relative", width: "100%" }}>
    <input
      className="typeform-input"
      onClick={onClick}
      ref={ref}
      value={value}
      placeholder={placeholder}
      readOnly
      style={{ paddingRight: "40px" }}
    />
    <FaRegCalendarAlt
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#6ec6b8",
        pointerEvents: "none",
        fontSize: "1.5rem"
      }}
    />
  </div>
));

function App() {
  const [showForm, setShowForm] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null);
  const [onCaptchaPage, setOnCaptchaPage] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (currentQ < questions.length) {
      setCurrentQ(currentQ + 1)
    } else {
      setOnCaptchaPage(true)
    }
  }

  return (
    <div className="bg-container">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </nav>
      {!showForm ? (
        <div className="hero-overlay">
          <h1 className="hero-title">Planning your next trip?</h1>
          <p className="hero-subtitle">Fill out this short form to help us plan your custom trip!</p>
          <button className="hero-btn" onClick={() => setShowForm(true)}>
            Let's Go &rarr;
          </button>
        </div>
      ) : submitted ? (
        <div className="typeform-overlay">
          <h1 className="typeform-title">Thank you!</h1>
          <p className="hero-subtitle">We have received your enquiry. We will contact you soon.</p>
        </div>
      ) : onCaptchaPage ? (
        <div className="typeform-overlay">
          <h1 className="typeform-title">Ready to submit your custom trip enquiry?</h1>
          <div style={{ margin: "32px 0" }}>
            <ReCAPTCHA
              sitekey="6Lf0NlorAAAAAIZAibEeZmb0ke-JqtYs44CDUKjo"
              onChange={value => setCaptchaValue(value)}
            />
          </div>
          <button
            className="hero-btn"
            style={{ fontSize: "2rem", marginTop: "24px" }}
            disabled={!captchaValue}
            onClick={() => setSubmitted(true)}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="typeform-overlay">
          {currentQ === 0 ? (
            <>
              <h1 className="typeform-title">Personal Details</h1>
              <div className="typeform-question">
                <label>What's your name? <span style={{color:'#ffd700'}}>*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={answers.name || ''}
                  onChange={handleChange}
                  required
                  className="typeform-input"
                />
              </div>
              <div className="typeform-question">
                <label>What's your phone number? <span style={{color:'#ffd700'}}>*</span></label>
                <input type="tel" name="phone" placeholder="Enter your phone number" value={answers.phone || ''} onChange={handleChange} required className="typeform-input" />
              </div>
              <div className="typeform-question">
                <label>What's your email address? <span style={{color:'#ffd700'}}>*</span></label>
                <input type="email" name="email" placeholder="Enter your email address" value={answers.email || ''} onChange={handleChange} required className="typeform-input" />
              </div>
              <button className="typeform-next-btn" onClick={handleNext}>
                Next &rarr;
              </button>
            </>
          ) : (
            <>
              <h1 className="typeform-title">{questions[currentQ-1].label}{questions[currentQ-1].required && <span style={{color:'#ffd700'}}>*</span>}</h1>
              {questions[currentQ-1].type === 'select' ? (
                <select name={questions[currentQ-1].name} value={answers[questions[currentQ-1].name] || ''} onChange={handleChange} required={questions[currentQ-1].required} className="typeform-input">
                  {questions[currentQ-1].options.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
                  ))}
                </select>
              ) : questions[currentQ-1].type === 'radio' ? (
                <div className="flex gap-6 mt-2">
                  {questions[currentQ-1].options.map(opt => (
                    <label key={opt.value} className="text-white font-medium">
                      <input type="radio" name={questions[currentQ-1].name} value={opt.value} checked={answers[questions[currentQ-1].name] === opt.value} onChange={handleChange} required={questions[currentQ-1].required} className="mr-2 accent-yellow-400" /> {opt.label}
                    </label>
                  ))}
                </div>
              ) : questions[currentQ-1].type === 'textarea' ? (
                <textarea name={questions[currentQ-1].name} rows={2} style={{resize:'vertical'}} value={answers[questions[currentQ-1].name] || ''} onChange={handleChange} placeholder={questions[currentQ-1].placeholder || ''} className="typeform-input" />
              ) : questions[currentQ-1].type === 'date' && (questions[currentQ-1].name === 'arrival' || questions[currentQ-1].name === 'departure') ? (
                <ReactDatePicker
                  selected={answers[questions[currentQ-1].name] ? new Date(answers[questions[currentQ-1].name]) : null}
                  onChange={date => setAnswers({ ...answers, [questions[currentQ-1].name]: date })}
                  customInput={
                    <CustomDateInput placeholder={questions[currentQ-1].placeholder || ''} />
                  }
                  dateFormat="yyyy-MM-dd"
                  required={questions[currentQ-1].required}
                />
              ) : questions[currentQ-1].name === 'budget' ? (
                <div style={{ position: "relative", width: "100%" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6ec6b8",
                      fontSize: "2rem",
                      pointerEvents: "none"
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    name={questions[currentQ-1].name}
                    placeholder={questions[currentQ-1].placeholder || ''}
                    value={answers[questions[currentQ-1].name] || ''}
                    onChange={handleChange}
                    required={questions[currentQ-1].required}
                    className="typeform-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              ) : (
                <div style={{ position: "relative", width: "100%" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#6ec6b8",
                      fontSize: "2rem",
                      pointerEvents: "none"
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type={questions[currentQ-1].type}
                    name={questions[currentQ-1].name}
                    placeholder={questions[currentQ-1].placeholder || ''}
                    value={answers[questions[currentQ-1].name] || ''}
                    onChange={handleChange}
                    required={questions[currentQ-1].required}
                    className="typeform-input"
                    style={{ paddingLeft: "2.5rem" }}
                  />
                </div>
              )}
              <button className="typeform-next-btn" onClick={handleNext}>
                Next &rarr;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App