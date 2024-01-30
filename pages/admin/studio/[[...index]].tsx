"use client";

import { NextStudio } from "next-sanity/studio";
import sanityConfig from "@/sanity.config";
const AdminPage = () => {
	return <NextStudio config={sanityConfig} />;
};

export default AdminPage;
