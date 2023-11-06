import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

const News = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        Water and the global climate crisis: 10 things you should know
      </Text>
      <Text style={styles.paragraph}>
        Climate change is disrupting weather patterns, leading to extreme weather events, unpredictable water availability, exacerbating water scarcity and contaminating water supplies. Such impacts can drastically affect the quantity and quality of water that children need to survive.
      </Text>

      <Image source={require("../assets/globe.png")} style={{ height: 300, width: '100%' }} />

      <Text>
        Extreme weather events and changes in water cycle patterns are making it more difficult to access safe drinking water, especially for the most vulnerable children.
        Around 74 per cent of natural disasters between 2001 and 2018 were water-related, including droughts and floods. The frequency and intensity of such events are only expected to increase with climate change.
        Around 450 million children live in areas of high or extremely high water vulnerability. This means they do not have enough water to meet their everyday needs.
        When disasters hit, they can destroy or contaminate entire water supplies, increasing the risk of diseases like cholera and typhoid to which children are particularly vulnerable.
        Rising temperatures can lead to deadly pathogens in freshwater sources, making the water dangerous for people to drink.
        Contaminated water poses a huge threat to children’s lives. Water and sanitation related diseases are one of the leading causes of death in children under 5 years old.
        Every day, over 1000 children under 5 die from diseases linked to inadequate water, sanitation and hygiene.
        Climate change exacerbates water stress – areas of extremely limited water resources – leading to increased competition for water, even conflict.
        By 2040, almost 1 in 4 children will live in areas of extremely high water stress.
        Rising sea levels are causing fresh water to become salty, compromising the water resources millions of people rely on.
        Climate change is happening now. We must act, and water is part of the solution.

        Adapting to the water effects of climate change will protect children’s health and save their lives. Using water more efficiently and transitioning to solar powered water systems will reduce greenhouse gases and further protect children’s futures.

        The world needs to get water smart. Everyone has a role to play, and we cannot afford to wait.
        As we embrace the potential of React Native and similar technologies, we are taking a step towards a harmonious coexistence between humanity and the environment. By promoting awareness, encouraging collaboration, and fostering eco-friendly practices, React Native is not just a framework for mobile applications; it is a tool for positive transformation, connecting us in the noble pursuit of a greener, more sustainable tomorrow.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default News;
