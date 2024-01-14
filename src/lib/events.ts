import { getCollection } from "astro:content";
import { startOfDay } from "date-fns";
import { linkedinGroupURL } from "../constants";

export async function useEvents() {
  const allEvents = await getCollection("events");
  const pastEvents = allEvents
    .filter(
      (event) => event.data.date.getTime() < startOfDay(new Date()).getTime()
    )
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const futureEvents = allEvents
    .filter(
      (event) => event.data.date.getTime() > startOfDay(new Date()).getTime()
    )
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());

  const nextEvent = (futureEvents.length > 0 && futureEvents[0]) || undefined;
  const joinOurNextHackathonLink =
    nextEvent?.data.signupURL ?? linkedinGroupURL;

  return {
    nextEvent,
    joinOurNextHackathonLink,
    pastEvents,
  };
}
