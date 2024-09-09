import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch Events
  const resEvents = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`
  );

  let events = [];
  if (resEvents.ok) {
    events = await resEvents.json();
  } else {
    console.error(`Failed to fetch events: ${resEvents.statusText}`);
  }

  const eventsEntries: MetadataRoute.Sitemap = events.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${_id}`,
  }));

  // Fetch Blogs (assuming this is a different endpoint)
  const resBlog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);

  let blogs = [];
  if (resBlog.ok) {
    blogs = await resBlog.json();
  } else {
    console.error(`Failed to fetch blogs: ${resBlog.statusText}`);
  }

  const blogEntries: MetadataRoute.Sitemap = blogs.map(({ _id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${_id}`,
  }));

  // Return the complete sitemap
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
    },
    ...eventsEntries,
    ...blogEntries,
  ];
}
