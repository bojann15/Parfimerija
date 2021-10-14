import React, { useContext, useEffect, useState } from 'react'
import API from '../../api';
import { GlobalContext } from '../../context/globalState';
import Loading from '../../utilis/Loading/Loading';
import ProductItem from '../../utilis/productItem/ProductItem';

const Products = () => {
    const { products, setProducts, shouldUpdate, setShouldUpdate, categories } = useContext(GlobalContext);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await API.get(`/products?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`);
                setProducts(response.data.products);
                setResult(response.data.result)
                setShouldUpdate(false)
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();

    }, [shouldUpdate, category, sort, search, page])

    const handleDelete = async (id) => {
        try {
            await API.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setShouldUpdate(true);
        } catch (err) {
            console.error(err.message)

        }
    }

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }
    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }
    const deleteAll = () => {
        products.forEach((product) => { if (product.checked) handleDelete(product._id) })
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch('')
    };
    return (
        <>
            <div className="filter_menu">
                <div className="row" >
                    <span>Filters:</span>
                    <select name="category" value={category} onChange={handleCategory}>
                        <option value=''>All Products</option>
                        {
                            categories.map((category) => (
                                <option value={"category=" + category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <input type="text" value={search} placeholder="Search" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                <div className="row sort">
                    <span>Sort By:</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value=''>Newest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-sold'>Best sales</option>
                        <option value='sort=-price'>Price: Highest-Low</option>
                        <option value='sort=price'>Price: Low-High</option>
                    </select>
                </div>
            </div >
            {
                user?.user?.role === 1 && (<div className="delete-all">
                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll}></input>
                    <button onClick={deleteAll}>Delete all</button>
                </div>)
            }
            <div className="products">
                {
                    products.map((product) => {
                        return <ProductItem key={product._id} product={product} handleDelete={handleDelete} handleCheck={handleCheck} />
                    })
                }
            </div>
            <div className="load_more">
                {
                    result < page * 9 ? "" : <button onClick={() => setPage(page + 1)}>Load more</button>
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )


};
export default Products;
