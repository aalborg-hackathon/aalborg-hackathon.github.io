import {
  Circle,
  Document,
  Ellipse,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import type { CollectionEntry } from "astro:content";

export function EventPoster({ event }: { event: CollectionEntry<"events"> }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 42 }}>Aalborg Hackathon</Text>
          <Text>{event.data.host.name}</Text>
          <Text>{new Date(event.data.date).toLocaleString("da-dk")}</Text>
        </View>
        <Svg>
          <Circle cx={100} cy={400} r={100} fill="hotpink" />
        </Svg>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    //backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
