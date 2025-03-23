import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch Events Data
    const resEvents = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`
    );
    if (!resEvents.ok) {
      console.error(
        `Failed to fetch events: ${resEvents.status} ${resEvents.statusText}`
      );
      return []; // Return an empty array or handle the error as needed
    }

    const events = await resEvents.json().catch((err) => {
      console.error("Error parsing events JSON:", err);
      return []; // Handle JSON parsing error by returning an empty array
    });

    const eventsEntries: MetadataRoute.Sitemap = events.map(({ _id }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${_id}`,
    }));

    // Fetch Blogs Data
    const resBlog = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`
    );
    if (!resBlog.ok) {
      console.error(
        `Failed to fetch blogs: ${resBlog.status} ${resBlog.statusText}`
      );
      return []; // Return an empty array or handle the error as needed
    }

    const blogs = await resBlog.json().catch((err) => {
      console.error("Error parsing blogs JSON:", err);
      return []; // Handle JSON parsing error by returning an empty array
    });

    const blogEntries: MetadataRoute.Sitemap = blogs.map(({ _id }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${_id}`, 
    }));

    // Return the final Sitemap
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
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return fallback sitemap in case of failure
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
    ];
  }
}
