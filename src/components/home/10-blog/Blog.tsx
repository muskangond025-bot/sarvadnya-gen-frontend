"use client";

import React from "react";
import { BlogClient, BlogPost } from "./BlogClient";
import { useLanguage } from "@/lib/LanguageContext";

export function Blog() {
  const { t } = useLanguage();

  const posts: BlogPost[] = [
    {
      key: "post1",
      category: t("blog.post1.cat"),
      title: t("blog.post1.title"),
      description: t("blog.post1.desc"),
      imageSrc: "/images/blog/blog-main.png",
      slug: "calculating-kva-outdoor-weddings",
    },
    {
      key: "post2",
      category: t("blog.post2.cat"),
      title: t("blog.post2.title"),
      description: t("blog.post2.desc"),
      imageSrc: "/images/blog/blog-image-1.png",
      slug: "cpcb-acoustic-enclosures-urban-events",
    },
    {
      key: "post3",
      category: t("blog.post3.cat"),
      title: t("blog.post3.title"),
      description: t("blog.post3.desc"),
      imageSrc: "/images/about/story-main.png",
      slug: "prime-continuous-vs-standby-dg-sets",
    },
  ];

  return <BlogClient posts={posts} />;
}
