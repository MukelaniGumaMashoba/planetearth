import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Box, Heading, Icon, Progress, Button, HStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';

// Import the background image
import backgroundImage from '../assets/LogBack.jpg';

function Gamification() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "companies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const companys = [];
      querySnapshot.forEach((doc) => {
        companys.push({ ...doc.data(), id: doc.id });
      });
      const sortedCompanies = companys.sort((a, b) => a.emissions - b.emissions);
      setCompanies(sortedCompanies);
    });

    return () => unsubscribe()
  }, [])

  const [showRanking, setShowRanking] = useState(false);

  const rankCompanies = () => {
    setShowRanking(true);
  };

  const getTrophyColor = (index) => {
    const trophyColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    return trophyColors[index] || 'gray';
  };

  const getTrophyMessage = (index) => {
    if (index === 0) {
      return 'Congratulations! You are the Eco Champion!';
    } else if (index === 1) {
      return 'Great job! You are a Carbon Conqueror!';
    } else if (index === 2) {
      return 'Well done! You are an Eco Enthusiast!';
    } else {
      return `Keep it up! You are making a positive impact!`;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, backgroundColor: 'rgba(192, 229, 124, 0.3)', paddingTop: 10 }}>
      <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: "center" }}>
        {!showRanking ? (
          <View style={styles.container}>
            <View style={styles.content}>
              <Icon as={FontAwesome} name="trophy" size={40} color="white" />
              <Text style={styles.header}>Carbon Emissions Ranking</Text>
              <Text style={styles.description}>
                "Climate change is the single greatest threat to a sustainable future, but, at the same time,
                addressing the climate challenge presents a golden opportunity to promote prosperity, security,
                and a brighter future for all."
              </Text>
              <Text style={styles.subText}>
                Join us in celebrating companies that are taking steps to reduce their carbon emissions and contribute
                to a better future for our planet. Click the button below to see the rankings!
              </Text>
              <Button onPress={rankCompanies} colorScheme="green">
                Rank Companies
              </Button>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            justifyContent: "center", display: "flex", alignContent: "center", width: "100%"
          }}>
            <Heading size="md" mb={2} color="white">
              Top Three Ranking
            </Heading>
            {companies.slice(0, 3).map((company, index) => {
              const percent = (company.goal - company.emissions) / company.goal * 100
              return (
                <Box
                  key={index}
                  bg="white"
                  p={4}
                  borderRadius={8}
                  shadow={2}
                  mb={3}
                  maxWidth="100%"
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }} mb={2}>
                    #{index + 1} {company.name}
                  </Text>
                  <HStack justifyContent="space-between" >
                    <Text fontSize={16} mb={2}>
                      Carbon Emissions: {company.emissions} tons
                    </Text>
                    <Text fontSize={16} mb={2}>
                      Goal: {company.goal} tons
                    </Text>
                  </HStack>
                  <Progress
                    value={percent}
                    size="sm"
                    colorScheme={percent
                      < 20 ? "red" : percent < 60 ? "blue" : "green"
                    }
                    mb={4}
                    mt={4}
                  />
                  <Text fontSize={14} fontWeight="bold" mb={2}>
                    Award
                  </Text>
                  <Box alignItems="center" mb={2}>
                    <Icon as={FontAwesome} name="trophy" size={24} color={getTrophyColor(index)} />
                    <Text fontSize={14} color={getTrophyColor(index)}>
                      {getTrophyMessage(index)}
                    </Text>
                  </Box>
                </Box>
              )
            })}

            <Heading size="md" mb={2} color="white">
              Other Companies
            </Heading>


            {companies.slice(3).map((company, index) => {
              const percent = (company.goal - company.emissions) / company.goal * 100
              return (
                <Box
                  key={index}
                  bg="white"
                  p={4}
                  borderRadius={8}
                  shadow={2}
                  mb={3}
                  maxWidth="100%"
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }} mb={2}>
                    #{3 + index + 1} {company.name}
                  </Text>
                  <HStack justifyContent="space-between" >
                    <Text fontSize={16} mb={2}>
                      Carbon Emissions: {company.emissions} tons
                    </Text>
                    <Text fontSize={16} mb={2}>
                      Goal: {company.goal} tons
                    </Text>
                  </HStack>
                  <Progress
                    value={(company.goal - company.emissions) / company.goal * 100}
                    size="sm"
                    colorScheme={percent
                      < 20 ? "red" : percent < 60 ? "blue" : "green"
                    }
                    mb={3}
                    mt={3}
                  />
                  <Text fontSize={14} fontWeight="bold" mb={2}>
                    {getTrophyMessage(index + 3)}
                  </Text>
                </Box>
              )
            })}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
}

export default Gamification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginVertical: 40,
    opacity: 0.9
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 16,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    margin: 16,
  },
});
