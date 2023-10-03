import React, { useState } from 'react';
import { NativeBaseProvider, Box, Center, Heading, Button, Text, Icon, Progress, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [companies, setCompanies] = useState([
    { name: 'Company A', emissions: 90, goal: 50 },
    { name: 'Company B', emissions: 55, goal: 75 },
    { name: 'Company C', emissions: 15, goal: 80 },
    { name: 'Company D', emissions: 100, goal: 60 },
    { name: 'Company E', emissions: 70, goal: 90 },
    { name: 'Company F', emissions: 85, goal: 70 },
    
  ]);

  const [showRanking, setShowRanking] = useState(false);

  const rankCompanies = () => {
    const sortedCompanies = [...companies].sort(
      (a, b) => a.emissions - b.emissions
    );
    setCompanies(sortedCompanies);
    setShowRanking(true);
  };

  const getTrophyColor = (index) => {
    const trophyColors = ['#00A170', '#0074E4', 'teal'];
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
    <NativeBaseProvider>
      <Center flex={1} bgColor="#c0e57c" p={4}>
        {!showRanking ? (
          <>
            <Icon as={FontAwesome} name="trophy" size={40} color="white" />
            <Heading size="lg" mb={4}>
              Carbon Emissions Ranking
            </Heading>
            <Text fontSize="lg" textAlign="center" color="white" mb={4}>
  "Climate change is the single greatest threat to a sustainable future, but, at the same time, addressing the climate challenge presents a golden opportunity to promote prosperity, security, and a brighter future for all."
</Text>
<Text fontSize="md" textAlign="center" color="white" mb={4}>
  Join us in celebrating companies that are taking steps to reduce their carbon emissions and contribute to a better future for our planet. Click the button below to see the rankings!
</Text>
            <Button onPress={rankCompanies} colorScheme="blue" mb={4}>
              Rank Companies
            </Button>
          </>
        ) : (
          <ScrollView>
            <Heading size="md" mb={2} color="white">
              Top Three Ranking
            </Heading>
            {companies.slice(0, 3).map((company, index) => (
              <Box
                key={index}
                bgColor="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="90%"
              >
                <Text fontSize="lg" mb={2}>
                  {company.name}
                </Text>
                <Text fontSize="md" mb={2}>
                  Carbon Emissions: {company.emissions} tons
                </Text>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Progress Status Bar
                </Text>
                <Progress
                  value={((company.emissions / company.goal) * 100).toFixed(2)}
                  size="sm"
                  colorScheme="teal"
                  mb={2}
                />
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Award
                </Text>
                <Box alignItems="center" mb={2}>
                  <Icon as={FontAwesome} name="trophy" size={24} color={getTrophyColor(index)} />
                  <Text fontSize="sm" color={getTrophyColor(index)}>
                    {getTrophyMessage(index)}
                  </Text>
                </Box>
              </Box>
            ))}
            <Heading size="md" mb={2} color="white">
              Other Companies
            </Heading>
            {companies.slice(3).map((company, index) => (
              <Box
                key={index}
                bgColor="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="90%"
              >
                <Text fontSize="lg" mb={2}>
                  {company.name}
                </Text>
                <Text fontSize="md" mb={2}>
                  Carbon Emissions: {company.emissions} tons
                </Text>
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  Progress Status Bar
                </Text>
                <Progress
                  value={((company.emissions / company.goal) * 100).toFixed(2)}
                  size="sm"
                  colorScheme="teal"
                  mb={2}
                />
                <Text fontSize="sm" fontWeight="bold" mb={2}>
                  {getTrophyMessage(index + 3)}
                </Text>
              </Box>
            ))}
          </ScrollView>
        )}
      </Center>
    </NativeBaseProvider>
  );
}
