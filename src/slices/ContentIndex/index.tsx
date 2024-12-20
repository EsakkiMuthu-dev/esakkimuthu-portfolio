import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("projectdetails");
  const certificates = await client.getAllByType("certificatedetails");

  const contentType = slice.primary.content_type;

  const items =
    contentType === "Blog"
      ? blogPosts
      : contentType === "Project"
        ? projects
        : certificates;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}>
      <Heading size="lg" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.des) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.des} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        fallbackItemImage={slice.primary.fall_back_item_image}
        viewMoreText={slice.primary.view_more_text}
      />
    </Bounded>
  );
};

export default ContentIndex;
