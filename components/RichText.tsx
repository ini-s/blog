import { urlFor } from "@/client";

import styles from "@/styles/BlogPage.module.css";

import Image from "next/image";
import Link from "next/link";

export const RichText = {
	types: {
		image: ({ value }: any) => {
			return (
				<div className={styles.bodyImage}>
					<Image src={urlFor(value).url()} alt="Post image" fill sizes="100%" />
				</div>
			);
		},
	},
	list: {
		bullet: ({ children }: any) => <ul>{children}</ul>,
	},
	number: ({ children }: any) => <ol>{children}</ol>,
	block: {
		normal: ({ children }: any) => (
			<p className={`${styles.bodyText} ${styles.normalText}`}>{children}</p>
		),
		h1: ({ children }: any) => (
			<h1 className={`${styles.bodyText} ${styles.heading1}`}>{children}</h1>
		),
		h2: ({ children }: any) => (
			<h2 className={`${styles.bodyText} ${styles.heading2}`}>{children}</h2>
		),
		h3: ({ children }: any) => <h3 className={styles.bodyText}>{children}</h3>,
		h4: ({ children }: any) => <h4 className={styles.bodyText}>{children}</h4>,
		blockquote: ({ children }: any) => (
			<blockquote className={styles.bodyText}>{children}</blockquote>
		),
	},
	marks: {
		link: ({ children, value }: any) => {
			const rel = !value.href.startWith("/")
				? "noreferrer noopener"
				: undefined;
			return (
				<Link href={value.href} rel={rel}>
					{children}
				</Link>
			);
		},
	},
};
