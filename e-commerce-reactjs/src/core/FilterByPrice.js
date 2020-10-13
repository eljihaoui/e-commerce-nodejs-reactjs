import React from 'react'

const FilterByPrice = ({ handleFilters }) => {
    const prices = [
        { _id: 1, name: "Any", value: [] },
        { _id: 2, name: "0$ to 39$", value: [0, 39] },
        { _id: 3, name: "40$ to 79$", value: [40, 79] },
        { _id: 4, name: "80$ to 119$", value: [80, 119] },
        { _id: 5, name: "More", value: [120, 99999] }

    ]
    const handlePrice = (e) => {
        handleFilters(prices[e.target.value]['value']);
    }
    return (
        <div>
            <p className="titre">
                <span className="material-icons" style={{ position: 'relative', top: 5 }}>keyboard_arrow_right</span>
                 Filter by Price
                  </p>
            {
                prices.map((price, i) => (
                    <div key={i} className="my-2">
                        <label htmlFor={`${i}-${price.name}`}>
                            <input
                                onChange={handlePrice}
                                className="mx-2"
                                type="radio"
                                name="price"
                                id={`${i}-${price.name}`}
                                value={i}
                            />
                            <span >{price.name}</span>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterByPrice
