import { groq } from "next-sanity";

import { Post } from "@/types";

import Blogs from "@/components/Blogs";
import { client } from "@/client";

import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import GeneralLayout from "@/layouts/general-layout.component";

export interface PostProps {
  posts: Post[];
}

export const revalidate = 60;

const query = groq`*[_type == 'post']{
	...,
	author->,
	categories[]->,
  } | order(_createdAt desc)`;

const Home: NextPageWithLayout<PostProps> = ({ posts }) => {
  return (
    <>
      <Blogs posts={posts} />
    </>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(query);

  return {
    props: { posts },
  };
}

Home.getLayout = function (page: ReactElement) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
