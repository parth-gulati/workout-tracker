import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import exercises from '../../assets/data/exercises.json';

export default function App() {
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
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  }
});
