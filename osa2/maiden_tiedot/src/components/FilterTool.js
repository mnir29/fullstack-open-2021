import React from 'react'

const FilterTool = ({ updateFilterText, filterText }) => {
  return (
    <div>
      Find countries: <input onChange={updateFilterText} value={filterText}></input>
    </div>
  )
}

export default FilterTool