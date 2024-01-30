import { groq } from "next-sanity";

import { Post } from "@/types";

import { client, urlFor } from "@/client";

import Image from "next/image";

import { PortableText } from "@portabletext/react";

import { RichText } from "@/components/RichText";

import styles from "@/styles/Home.module.css";

interface Props {
	params: {
		slug: string;
	};
}

export const revalidate = 30;

export const generateStaticParams = async () => {
	const query = groq`*[_type == 'post']{
    slug
  }`;
	const slugs: Post[] = await client.fetch(query);
	const slugRoutes = slugs.map((slug) => slug?.slug?.current);
	return slugRoutes?.map((slug) => ({
		params: {
			slug,
		},
	}));
};

const SlugPage = ({ post }: { post: Post }) => {
	return (
		<div className={styles.postContainer}>
			<div>
				<div className={styles.mainImage}>
					<Image
						src={urlFor(post?.mainImage).url()}
						fill
						sizes="100%"
						alt="main image"
					/>
				</div>
				{/* <div className={styles.author}>
					<Image
						src={urlFor(post?.author?.image).url()}
						width={200}
						height={200}
						alt="author image"
					/>
					<p>{post?.author?.name}</p>
					<p>{post?.author?.description}</p>
				</div> */}
			</div>
			<div className={styles.bodyContainer}>
				<PortableText value={post?.body} components={RichText} />
			</div>
		</div>
	);
};

export default SlugPage;

export async function getServerSideProps({ params }: Props) {
	const slug = params.slug;
	const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    body,
    author->
  }`;
	const post: Post = await client.fetch(query, { slug });

	return {
		props: {
			post,
		},
	};
}
