import { urlFor } from "@/client";

import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { PostProps } from "@/pages";

export const revalidate = 30;

const BlogContent = ({ posts }: PostProps) => {
	return (
		<div className={styles.mainPage}>
			{posts.map((post) => (
				<div className={styles.flexContainer}>
					<Link
						href={{
							pathname: `/post/${post?.slug?.current}`,
							query: { slug: post?.slug?.current },
						}}
						key={post?._id}
					>
						<div className={styles.left}>
							<Image
								src={urlFor(post?.mainImage).url()}
								width={500}
								height={500}
								alt="blog post image"
							/>
						</div>
					</Link>
					<div className={styles.right}>
						<div>
							{post?.categories.map((item) => (
								<p key={item?._id}>{item?.title}</p>
							))}
						</div>
						<h2>{post?.title}</h2>
						<p>{post?.description}</p>
						<p>
							{" "}
							{new Date(post?._createdAt).toLocaleDateString("en-US", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})}
						</p>
						<div className={styles.authorImage}>
							<Image
								src={urlFor(post?.author?.image).url()}
								width={200}
								height={200}
								alt="author image"
							/>
							<p>{post?.author?.name}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default BlogContent;
