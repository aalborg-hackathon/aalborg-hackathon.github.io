import {
  Circle,
  Document,
  Ellipse,
  Font,
  Image,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CollectionEntry } from "astro:content";
import path from "node:path";

Font.register({
  family: "Glitch",
  src: path.join(process.cwd(), "src/pages/event/glitch.ttf"),
});
Font.register({
  family: "Inter",
  fonts: [
    {
      fontStyle: "normal",
      src: path.join(
        process.cwd(),
        "src/pages/event/inter-latin-300-normal.ttf",
      ),
      fontWeight: "normal",
    },
  ],
});

export function EventPoster({ event }: { event: CollectionEntry<"events"> }) {
  const eventDate = new Date(event.data.date);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 52,
                fontFamily: "Glitch",
                textAlign: "center",
              }}
            >
              Aalborg Hackathon
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={[{ fontFamily: "Inter" }]}>
                <Text>{event.data.host.name}</Text>
                <Text>{event.data.location}</Text>
              </View>
              <View
                style={[
                  {
                    fontFamily: "Inter",
                    textAlign: "right",
                    alignItems: "flex-end",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  {eventDate.toLocaleString("da-dk", {
                    dateStyle: "full",
                  })}
                </Text>
                <Text style={{ textAlign: "right" }}>
                  {eventDate.toLocaleString("da-dk", {
                    timeStyle: "medium",
                  })}
                </Text>
              </View>
            </View>
          </View>

          <Image src="src/pages/event/hackathon.png" style={styles.cover} />

          <Text>{event.data.host.name}</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {},
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  cover: {
    //position: "absolute",
    width: "80%",
    alignSelf: "center",
    //minWidth: "80%",
    //minHeight: "100%",
    //display: "block",
    //height: "80%",
    //width: "100%",
  },
  text: {
    fontFamily: "Inter",
  },
  textCenter: {
    textAlign: "center",
  },
});
