import { urlFor } from "@/client";

import styles from "@/styles/Home.module.css";

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
		h1: ({ children }: any) => <h1>{children}</h1>,
		h2: ({ children }: any) => <h2>{children}</h2>,
		h3: ({ children }: any) => <h3>{children}</h3>,
		h4: ({ children }: any) => <h4>{children}</h4>,
		blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
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
