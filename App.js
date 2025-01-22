import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExerciseListItem from './src/components/ExerciseListItem';
import exercises from './assets/data/exercises.json';

export default function App() {
  const exercise = exercises[0];
  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
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
    backgroundColor: 'gainsboro',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 70
  }
});
