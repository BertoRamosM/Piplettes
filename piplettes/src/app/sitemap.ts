import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const resEvents = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`
  );
  const events = await resEvents.json();

  const eventsEntries: MetadataRoute.Sitemap = events.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${_id}`,
  }));

  const resBlog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
  const blogs = await resBlog.json();

  const blogEntries: MetadataRoute.Sitemap = blogs.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${_id}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/events`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    ...eventsEntries,
    ...blogEntries,
  ];
}
