import { useState, useEffect } from "react";
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Sidebar(props) {
    const [categories, setCategories] = useState([]); // Get the categories from the database
    const [currentCategory, setCurrentCategory] = useState(0); // Set the category id to the one the user selected
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
    // const changeCategory = async (event) => {
    //     setCurrentCategory(event.target.id);
    //     let data = await fetch(`/api/category?id=${event.target.id}`); // Reason why I supplied target id is because the setState may not be finished by the time the fetch is called.
    //     data = await data.json();
    // }

    return (
        <aside>
            <ul>
                <nav className={styles.navContainer}>
                    <Link href={'/category?id=1'} passHref><button className={currentCategory == 1 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[0]}</li></button></Link>
                    <Link href={'/category?id=2'} passHref><button className={currentCategory == 2 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[1]}</li></button></Link>
                    <Link href={'/category?id=3'} passHref><button className={currentCategory == 3 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[2]}</li></button></Link>
                    <Link href={'/category?id=4'} passHref><button className={currentCategory == 4 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[3]}</li></button></Link>
                    <Link href={'/category?id=5'} passHref><button className={currentCategory == 5 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[4]}</li></button></Link>
                </nav>
            </ul>
        </aside>
    )
}