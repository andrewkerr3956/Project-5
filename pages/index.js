import { calculateObjectSize } from 'bson'
import { delBasePath } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link  from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [categories, setCategories] = useState([]); // Get the categories from the database
  const [currentCategory, setCurrentCategory] = useState(0); // Set the category id to the one the user selected
  const [categoryTitle, setCategoryTitle] = useState(""); // Category title based on the one the user selected
  const [questionText, setQuestionText] = useState(""); // The question text value in the create question section of a category
  const [detailsText, setDetailsText] = useState(""); // The details text value in the create question section of a category

  // When the page is loaded, fetch the categories once.
  useEffect(() => {
    fetchCategories();
  }, []);
  // When the page is loaded, determine if their is a user logged in. If not, display that they must login to create questions.
  useEffect(() => {
    if(!sessionStorage.getItem("userid")) {
      setQuestionText("Login to create a question.")
      setDetailsText("You must be logged in to create a question.")
    }
  }, []);
  // When currentCategory is changed, fetch the questions from the selected category.
  useEffect(() => {
    fetchQuestions();
  }, [currentCategory])

  const fetchQuestions = async () => {
    // Build this later
  }

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
    setCurrentCategory(event.target.id);
    let data = await fetch(`/api/category?id=${event.target.id}`); // Reason why I supplied target id is because the setState may not be finished by the time the fetch is called.
    data = await data.json();
    setCategoryTitle(data.results[0].category);
  }

  const handleQuestionText = async (event) => {
    setQuestionText(event.target.value);
  }

  const handleDetailsText = async (event) => {
    setDetailsText(event.target.value);
  }

  return (
      <div>
        <Head>
          <title>Answers Galore</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.headerContainer}>
          <h1 className={styles.title}>Answers Galore</h1>
          <div style={{ marginTop: "20px" }}>
            <Link href={'/login'} passHref><button>Login</button></Link>
            <Link href={'/register'} passHref><button>Register</button></Link>
          </div>
        </header>
        <main className={styles.container}>
          <aside>
            <ul>
              <nav className={styles.navContainer}>
                <button id={1} onClick={changeCategory} className={currentCategory == 1 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[0]}</li></button>
                <button id={2} onClick={changeCategory} className={currentCategory == 2 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[1]}</li></button>
                <button id={3} onClick={changeCategory} className={currentCategory == 3 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[2]}</li></button>
                <button id={4} onClick={changeCategory} className={currentCategory == 4 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[3]}</li></button>
                <button id={5} onClick={changeCategory} className={currentCategory == 5 ? styles.active : styles.navItem}><li style={{ marginTop: "10px" }}>{categories[4]}</li></button>
              </nav>
            </ul>
          </aside>
          <div className={styles.mainContainer}>
            {currentCategory === 0 && (
              <h2>Please select a category.</h2>
            )}
            {currentCategory > 0 && (
              <>
                <h2>Welcome to {categoryTitle}</h2> <p />
                <section name={"createQuestion"}>
                  <h3>Create a Question</h3>
                  <label htmlFor={"question"}> Question <br />
                    <input type="text" value={questionText} onChange={handleQuestionText} maxLength={200} readOnly={!sessionStorage.getItem("userid")} required />
                  </label> <p />
                  <label htmlFor={"details"}> Details <br />
                    <textarea value={detailsText} onChange={handleDetailsText} rows={4} cols={24} maxLength={200} readOnly={!sessionStorage.getItem("userid")} required />
                  </label>
                </section>
                <section style={{ marginTop: "40px" }} name={"previousQuestions"}>
                  <h3>Previous Questions</h3>
                </section>
              </>
            )}
          </div>
        </main>

        <footer>

        </footer>
      </div>

  )
}
