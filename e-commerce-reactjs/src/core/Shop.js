import React, { useState, useEffect } from 'react'
import { getCategories } from './ApiCore'
import FilterByCategory from './FilterByCategory'
import Layout from './Layout'

const Shop = () => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
            .then(res => setCategories(res));
    }, []) // s'exécute à chaque chargement du compoenent

    return (
        <div>
            <Layout
                title=""
                description="Shopping Page "
                className="container">
                <div className="row">
                    <div className="col-md-3">
                      <FilterByCategory categories={categories}></FilterByCategory>              
                           </div>
                    <div className="col-md-9">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quibusdam nam hic reiciendis aspernatur harum, explicabo, enim accusantium possimus culpa accusamus illum sapiente nostrum, quae laudantium repellat minima fuga obcaecati!</p>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Shop
