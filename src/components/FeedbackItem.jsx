import { FaEdit } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { useContext } from 'react'
import PropTypes from 'prop-types'
import Card from './shared/Card'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <button onClick={() => deleteFeedback(item.id)} className='delete'>
        <MdDelete color='purple' />
      </button>
      <div className='text-display'>
        Message: <span style={{ color: '#ff6a95' }}>{item.text}</span>
      </div>
      <div className='improvement-display'>
        Improvement Categories:
        {item.selectedCategories && item.selectedCategories.length > 0 ? (
          <span style={{ color: '#ff6a95' }}> {item.selectedCategories.join(', ')} </span>
        ) : (
          <span style={{ color: '#ff6a95' }}> None </span>
        )}
      </div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem
