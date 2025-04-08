import { groq } from "next-sanity";

import { Post } from "@/types";

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

export const revalidate = 60;

const SlugPage = ({ post }: { post: Post }) => {
  return (
    <section className={styles.postContainer}>
      <div>
        <h1 className={styles.title}>{post?.title}</h1>
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

      <AddComments postId={post?._id} />
      <AllComments comments={post?.comments || []} />
    </section>
  );
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

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
		...,
		body,
		author->,
		"comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc) {
    	name,
   		comment,
    	_createdAt
  }
	}`;

  const post: Post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
