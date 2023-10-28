// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const eventCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        location: z.string(),
        from: z.date(),
        to: z.date(),
        host: z.object({
            name: z.string(),
            url: z.string().url()
        })
    })

});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'events': eventCollection,
};