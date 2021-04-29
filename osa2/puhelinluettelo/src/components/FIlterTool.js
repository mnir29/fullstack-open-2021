import React from 'react'

const FilterTool = ({ updateFilterText, filterText }) => {
  return (
    <div>
      filter shown with: <input onChange={updateFilterText} value={filterText} />
    </div>
  )
}

export default FilterTool