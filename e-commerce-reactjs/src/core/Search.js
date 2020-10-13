import React, { useEffect, useState } from 'react'
import { getCategories } from './ApiCore';

const Search = () => {
    const [categories, setCetegories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(res => setCetegories(res));
    }, [])
    return (
        <div>
            <div class="input-group input-group-lg">
                <div className="input group prepend">
                    <select class="btn">
                        <option value="0">Select Category</option>
                        {
                            categories && (
                                categories.map((categ, i) => (
                                    <option key={i * 10} value={categ._id}>{categ.name}</option>
                                ))
                            )
                        }
                    </select>
                </div>
                <input type="search" className="form-control mx-4" />
                <div className="input-group-prepend">
                    <button className="btn">Search</button>
                </div>

            </div>
        </div>
    )
}

export default Search
