import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import {gql, request} from 'graphql-request'
import client from './graphqlClient';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
  exercises(muscle: $muscle, name: $name) {
    name
    muscle
    equipment
  }
}
`
export default function HomeScreen() {

  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises'],
    queryFn: () => client.request(exercisesQuery)
    
  })

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return <Text>{error.toString()}</Text>
  }

  return (
    <View style={styles.container}>
    <Stack.Screen options={{ title: 'Exercises' }} />
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{gap: 10}}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <ExerciseListItem item={item} />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  }
});
