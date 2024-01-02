import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input type="text" name="filterInput" onChange={handleChange} />
    </div>
  )
}

export default Filter
