import React from 'react'

const FilterByCategory = ({ categories }) => {
    return (
        <div id="FilterByCategoory">
            <p className="titre">
                <span className="material-icons" style={{ position: 'relative', top: 5 }}>  keyboard_arrow_right</span>
                 Filter by category
                  </p>
            <ul>
                {categories && (
                    categories.map((catgeory, i) => (
                        <li key={i} className='list-unstyled my-3' style={{ cursor: 'pointer' }} >
                            <input style={{ cursor: 'pointer' }} value={catgeory._id} type="checkbox" id={i} className="form-check-input" />
                            <label style={{ cursor: 'pointer' }} htmlFor={i} className="form-check-label ml-3" >{catgeory.name}</label>
                        </li>
                    ))
                )}

            </ul>

        </div>
    )
}

export default FilterByCategory
