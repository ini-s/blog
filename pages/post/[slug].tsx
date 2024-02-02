import { groq } from "next-sanity";

import { Post } from "@/types";

import { client, urlFor } from "@/client";

import Image from "next/image";

import { PortableText } from "@portabletext/react";

import { RichText } from "@/components/RichText";

import styles from "@/styles/BlogPage.module.css";

interface Props {
	params: {
		slug: string;
	};
};

export const revalidate = 30;

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
			</div>
			<div className={styles.bodyContainer}>
				<PortableText value={post?.body} components={RichText} />
			</div>
		</div>
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
		author->
	}`;

	const post: Post = await client.fetch(query, { slug });

	return {
		props: {
			post,
		},
	};
}
