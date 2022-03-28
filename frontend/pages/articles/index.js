import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { fetcher } from '../../utils/api'
import styles from '../../styles/Articles.module.scss'

function Articles() {
    const [id, setID] = useState()
    const { data } = useSWR('/articles', fetcher)
    // console.log(data);
    if (!data) return <div>Loading...</div>

    // to get coords to pass it into another API to get the weather
    const getID = async (id) => {
        // console.log(id);
        setID(id)
    }

    return (
        <>
        <div className={styles.btnCont}>
                <div className={styles.space}></div>           
                <div className={styles.space}></div>           
                <div className={styles.space}></div>           
        <Link href="/">
            <a>
            <button className={styles.buttonSmall}>
                &nbsp;&nbsp;
                Search
                &nbsp;&nbsp;
            </button>
            </a>
        </Link>
                <div className={styles.space}></div>           
        <Link href="/">
            <a>
            <button className={styles.buttonSmall}>Browse by</button>
            </a>
        </Link>  
                <div className={styles.space}></div>
                <div className={styles.space}></div>
                <div className={styles.space}></div>           
        </div>
        
        <div className={styles.main}>
        <div className={styles.spacingLeft}>
            {data.data.map((article, index) => (
            <div key={index} className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.authorContainer}>
                            <p>{article.authorName}</p>
                            <p className={styles.pSmall}>{article.posted_at}</p>
                        </div>
                        <h1 className={styles.title}>{article.title}</h1>
                        <h4 className={styles.subtitle}>{article.subtitle}</h4>
                        <p className={styles.pSmall}>{article.content}</p>
                        <div className={styles.space}></div>
                        <div className={styles.space}></div>           
                        <Link href={`/articles/${article._id}`}>
                            <button className={styles.buttonSmall}>View article</button>
                        </Link>
                        {/* <button onClick={(e) => getID(e.target.value)}>
                            <option value={article._id}>Button</option>
                        </button> */}
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    
    </>
    )
}

export default Articles
