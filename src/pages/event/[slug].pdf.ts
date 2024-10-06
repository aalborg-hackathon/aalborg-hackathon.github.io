import { renderToBuffer } from "@react-pdf/renderer";
import { getEntry } from "astro:content";
import { getCollection, getEntryBySlug } from "astro:content";
import { createElement } from "react";
import { EventPoster } from "./event-poster";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(null, { status: 400 });
  }
  const ev = await getEntry("events", slug);

  if (!ev) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const buf = await renderToBuffer(createElement(EventPoster, { event: ev }));

  return new Response(buf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
};

export async function getStaticPaths() {
  const events = await getCollection("events");
  return events.map((e) => ({
    params: { slug: e.slug },
  }));
}
