import React, { useState } from 'react'

const FilterByCategory = ({ categories, handleFilters }) => {
    const [checkedId] = useState(new Set());

    const handleCategory = (category) => {

        if (checkedId.has(category._id)) {
            checkedId.delete(category._id);
        } else {
            checkedId.add(category._id)
        }
        handleFilters(Array.from(checkedId)); // convert Set to Array
    }
    //onClick={()=>handleCategory} why this for  not executing the mehotde handleCategory at every iteration
    return (
        <div id="FilterByCategoory">
            <p className="titre">
                <span className="material-icons" style={{ position: 'relative', top: 5 }}>keyboard_arrow_right</span>
                 Filter by category
                  </p>
            <ul>
                {categories && (
                    categories.map((category, i) => (
                        <li key={i} className='list-unstyled my-3' style={{ cursor: 'pointer' }} >
                            <input onClick={() => handleCategory(category)} style={{ cursor: 'pointer' }} value={category._id} type="checkbox" id={i} className="form-check-input" />
                            <label style={{ cursor: 'pointer' }} htmlFor={i} className="form-check-label mx-2" >{category.name}</label>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}
export default FilterByCategory
