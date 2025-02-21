import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

import { PostProps } from "@/pages";
import { urlFor } from "@/client";

const Blogs = ({ posts }: PostProps) => {
  return (
    <section className={styles.mainPage}>
      <h1 className={styles.heading}>BLOGGERS</h1>
      {posts.map((post) => (
        <div className={styles.blogCard} key={post?._id}>
          <Link
            href={`/post/${post?.slug?.current}`}
            key={post?._id}
            className={styles.ImageContainer}
          >
            <div className={styles.left}>
              <Image
                src={urlFor(post?.mainImage).url()}
                width={500}
                height={500}
                alt="blog post image"
                priority
              />
            </div>
            <div className={styles.blogTitle}>
              <p>{post?.title}</p>
            </div>
          </Link>
          <div className={styles.right}>
            <div className={styles.categories}>
              {post?.categories.map((item) => (
                <p className={styles.category} key={item?._id}>
                  {item?.title}
                </p>
              ))}
            </div>
            <Link
              href={{
                pathname: `/post/${post?.slug?.current}`,
                query: { slug: post?.slug?.current },
              }}
              key={post?._id}
            >
              <h2 className={styles.title}>{post?.title}</h2>
            </Link>
            <p className={styles.description}>{post?.description}</p>
            <div className={styles.dateAndAuthor}>
              <p className={styles.date}>
                {new Date(post?._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className={styles.authorImageContainer}>
                <div className={styles.authorImage}>
                  <Image
                    src={urlFor(post?.author?.image).url()}
                    width={200}
                    height={200}
                    alt="author image"
                  />
                </div>
                <p>{post?.author?.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Blogs;
