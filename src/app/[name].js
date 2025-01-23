import {View, Text} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import exercises from '../../assets/data/exercises.json';

export default function ExerciseDetailsScreen(){ 
    const params = useLocalSearchParams();
    const exercise = exercises.find((exercise)=>exercise.name === params.name);
    
    if (!exercise) { 
        return <Text>Exercise not found</Text>
    }

    return (
        <View>
            <Text>Exercise details: {params.name}</Text>
        </View>
    )
}