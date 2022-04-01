import styles from '../../styles/Articles.module.scss'
import Link from "next/link"
import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../utils/api'

const BlogPost = ({ post }) => {
    const [id, setID] = useState()
    const { data } = useSWR('/articles', fetcher)
    // console.log(data);
    if (!data) return <div>Loading...</div>

    const getID = async (id) => {
        // console.log(id);
        setID(id)
    }
    return (    
    <div className={styles.parent}>
        <div className={styles.article}>
            <div className={styles.main}>
                <p>{post.data.posted_at }</p>
                <h1 className={styles.title}>{post.data.title}</h1>
                <h4 className={styles.subtitle}>{post.data.subtitle}</h4>
                <p className={styles.articleContent}>{post.data.content}</p>
            </div>
        </div>

        <div className={styles.recommended}>
            <h2 className={styles.recommendedTitle}>You might also like</h2>
            {data.data.slice(0, 3).map((article, index) => (
            <div key={index} className={styles.cardSmall}>
                <div>
                    <p className={styles.recommendedP}>{article.authorName}</p>
                </div>
                <h3 className={styles.recommendedh3}>{article.title}</h3>
                <h5 className={styles.recommendedh4}>{article.subtitle}</h5>
                <p className={styles.recommendedP}>{article.posted_at}</p>
                <Link href={`/articles/${article._id}`}>
                    <button className={styles.buttonSmall}>View article</button>
                </Link>
            </div>
            ))}
        </div>

        <div className={styles.author}>
            <div className={styles.avatar}>
                <div className={styles.avatar__letters}> FU </div>
            </div>
            <p className={styles.authorName}>{post.data.authorName}</p>
            <p className={styles.authorBio}>this is me. I like pc and various things, like coding and love makings</p>
        </div>
        <div className={styles.more}>
            <p className={styles.moreHeader}>More from {post.data.authorName}</p>
            {data.data.slice(0, 3).map((article, index) => (
            <div key={index} className={styles.moreCont}>
                <p className={styles.moreP}>{article.title}</p>
                <Link href={`/articles/${article._id}`}>
                    <button className={styles.moreBtn}>View article</button>
                </Link>
            </div>
            ))}
        </div>
    </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
    const posts = await res.json()

    const paths = posts.data.map((post) => ({
        params: { id: post._id },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`
    )
    const post = await res.json()

    return {
        props: { post },
    }
}

export default BlogPost
