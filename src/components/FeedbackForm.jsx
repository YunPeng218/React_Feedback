import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [improvementCategories] = useState([
    'Service',
    'Food',
    'Ambiance',
    'Delivery Speed',
    'Friendliness',
    'Cleanliness',
    'Value',
    'Other'
  ])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setSelectedCategories(feedbackEdit.item.selectedCategories || [])
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  // NOTE: This should be checking input value not state as state won't be the updated value until the next render of the component

  // prettier-ignore
  const handleTextChange = ({ target: { value } }) => { // 👈  get the value
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
      
  // prettier-ignore
    } else if (value.trim().length < 10) { // 👈 check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value)
  }

  const handleImprovementCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
        selectedCategories,
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      // NOTE: reset to default state after submission
      setBtnDisabled(true) // 👈  add this line to reset disabled
      setRating(10) //👈 add this line to set rating back to 10
      setText('')
      setSelectedCategories([])
    }
  }

  // NOTE: pass selected to RatingSelect so we don't need local duplicate state
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className='improvement-categories' style={{ marginTop: '15px', marginBottom: '15px'}}>
          <h4>Improvement Categories: </h4>
          {improvementCategories.map((category) => (
            <button
              type='button'
              style={{ marginRight: '10px', marginTop: '10px' }}
              key={category}
              onClick={() => handleImprovementCategoryChange(category)}
              className={
                selectedCategories.includes(category) ? 'selected' : ''
              }
            >
              {category}
            </button>
          ))}
        </div>
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
