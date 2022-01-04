import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Sidebar(props) {
    const [categories, setCategories] = useState([]); // Get the categories from the database
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        // This will fetch all the categories
        let data = await fetch(`/api/category`);
        data = await data.json();
        let categoryArray = [];
        for (let i = 0; i < data.results.length; i++) {
          categoryArray.push(data.results[i].category);
        }
        setCategories(categoryArray);
      }
    const changeCategory = async (event) => {
        props.setCurrentCategory(event.target.id);
        let data = await fetch(`/api/category?id=${event.target.id}`); // Reason why I supplied target id is because the setState may not be finished by the time the fetch is called.
        data = await data.json();
        props.setCategoryTitle(data.results[0].category);
    }

    return (
        <aside>
            <ul>
                <nav className={styles.navContainer}>
                    <Link href={'/category?id=1'} passHref><button id={1} onClick={changeCategory} className={props.currentCategory == 1 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[0]}</li></button></Link>
                    <Link href={'/category?id=2'} passHref><button id={2} onClick={changeCategory} className={props.currentCategory == 2 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[1]}</li></button></Link>
                    <Link href={'/category?id=3'} passHref><button id={3} onClick={changeCategory} className={props.currentCategory == 3 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[2]}</li></button></Link>
                    <Link href={'/category?id=4'} passHref><button id={4} onClick={changeCategory} className={props.currentCategory == 4 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[3]}</li></button></Link>
                    <Link href={'/category?id=5'} passHref><button id={5} onClick={changeCategory} className={props.currentCategory == 5 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[4]}</li></button></Link>
                </nav>
            </ul>
        </aside>
    )
}