import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from "../../styles/Category.module.css"

import Products from '../Products/Products';

import { useGetProductsQuery } from '../../features/api/apiSlice';
import { IRootState } from '../../features/store';
import SearchParams from '../../types/SearchParams';


const Category: React.FC = () => {
    const { id } = useParams(); //!!!

    if(!id) {
        return <div>Error</div>
    }

    const parsedId = parseInt(id) ?? 0;

    console.log(id);

    const { list } = useSelector(({ categories }: IRootState) => categories);

    const [cat, setCat] = useState("");

    const defaultParams = {
        title: "",
        price_min: 0,
        price_max: 0,
        categoryId: parsedId,
    };
    const [params, setParams] = useState<SearchParams>(defaultParams);

    const defaultValues = {
        title: "",
        price_min: "",
        price_max: "",
        categoryId: "",
    }
    const [values, setValues] = useState<{ [key: string]: string }>(defaultValues);
    
    useEffect(() => {
        if(!parsedId) return;
        
        setParams({ ...defaultParams, categoryId: parsedId });
    }, [id]);
    
    useEffect(() => {
        if(!id || !list.length) return;

        const category = list.find((item) => item.id === parsedId);

        setCat(category?.name!);
    }, [list, id])

    const { data, isLoading, isSuccess } = useGetProductsQuery(params);
    
    const handleChange = ({ target: { value, name }}: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedParams = {
            ...params,
            title: values.title,
            price_min: parseInt(values.price_min) || 0,
            price_max: parseInt(values.price_max) || 0,
            categoryId: parseInt(values.categoryId) || parsedId,
        };

        setParams(updatedParams);
    }

    const handleReset = () => {
        setValues(defaultValues);
        setParams(defaultParams);
    }

    return <>
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{cat}</h2>

            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Название товара"
                        value={values.title}
                    />
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name="price_min"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_min}
                    />
                    <span>Price from</span>
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name="price_max"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_max}
                    />
                    <span>Price to</span>
                </div>

                <button type="submit" hidden />
            </form>

            {isLoading ? (
                <div className="preloader">Loading...</div>
            ) : !isSuccess || !data?.length ? (
                <div className={styles.back}>
                    <span>No results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products title="" products={data} style="{{ padding: 0 }}" amount={data.length} />
            )
        }

        </section>    
    </>;
};

export default Category;