import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sub } from 'date-fns';
const allEvents = await getCollection("events")
const sortedEvents = allEvents.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());


export const GET: APIRoute = (context) => {
  return rss({
    // `<title>` field in output xml
    title: "Aalborg Hackathon",
    // `<description>` field in output xml
    description: 'Upcoming events',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: sortedEvents.map(event => ({
        pubDate: sub(event.data.date, {
          months: 2 // Publish two months before event
        }),
        title: event.data.title,
        link: event.data.signupURL,
        description: event.data.date.toLocaleDateString()
    })),
  });
}