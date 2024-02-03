"use client";

import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

import { Blog } from "@/types";

export default function BreadCrumb({ blog }: { blog: Blog }) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href="/blogs">Articles</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>{blog.id.substring(0, 6)}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
