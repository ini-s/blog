import { groq } from "next-sanity";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import GeneralLayout from "@/layouts/general-layout.component";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useRouter } from "next/router";

import { Post, Comment } from "@/types";

import Image from "next/image";

import { PortableText } from "@portabletext/react";

import { RichText } from "@/components/RichText";

import styles from "@/styles/BlogPage.module.css";
import AddComments from "@/components/AddComments";
import AllComments from "@/components/AllComments";
import { client, urlFor } from "@/client";

interface Props {
  params: {
    slug: string;
  };
}

interface SlugPageProps {
  post: Post;
}
export const revalidate = 60;

const SlugPage: NextPageWithLayout<SlugPageProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);
  const router = useRouter();

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section className={`fullBleed ${styles.postContainer}`}>
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        <RiArrowLeftSLine />
      </button>

      <div>
        <h1 className={styles.title}>{post?.title}</h1>

        <div className={styles.authorSection}>
          <div className={styles.authorImgContainer}>
            <div className={styles.authorImg}>
              {post?.author?.image && (
                <Image
                  src={urlFor(post.author.image).url()}
                  width={200}
                  height={200}
                  alt={post.author.name}
                />
              )}
            </div>
            <p>{post?.author?.name}</p>
          </div>
          <p className={styles.postDate}>
            {new Date(post?._createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className={styles.mainImage}>
          {post?.mainImage && (
            <Image
              src={urlFor(post?.mainImage).url()}
              fill
              sizes="100%"
              alt="main image"
              priority
            />
          )}
        </div>
      </div>
      <div className={styles.bodyContainer}>
        <PortableText value={post?.body} components={RichText} />
      </div>

      <AddComments postId={post?._id} addNewComment={handleCommentAdded} />
      <AllComments comments={comments} />
    </section>
  );
};

SlugPage.getLayout = function (page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default SlugPage;

export async function getStaticPaths() {
  const paths: string[] = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: Props) {
  const slug = params.slug;

  const query = groq`
    *[_type == 'post' && slug.current == $slug][0] {
      ...,  
      body,
      author->,            
      "comments": *[_type=="comment" && post._ref==^._id]
        | order(_createdAt desc){
          name,
          comment,
          _createdAt
        }
    }
  `;

  const post: Post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}
