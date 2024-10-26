import { SliceZone } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";
import { PrismicNextLink } from "@prismicio/next";
import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function ContentBody({
  page,
}: {
  page:
    | Content.BlogPostDocument
    | Content.ProjectdetailsDocument
    | Content.CertificatedetailsDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h2" size="lg">
          {page.data.title}
        </Heading>
        <div className="flex flex-row">
          {isFilled.link(page.data.githublink) && (
            <PrismicNextLink
              field={page.data.githublink}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={page.data.title + "Source code on GitHub"}>
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(page.data.live_link) && (
            <PrismicNextLink
              field={page.data.live_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={page.data.title + " Live Demo Link"}>
              <FaArrowUpRightFromSquare />
            </PrismicNextLink>
          )}
        </div>
        <div className="flex gap-4 pt-8 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-xl font-bold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
