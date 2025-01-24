import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {gql} from 'graphql-request'
import { useQuery } from '@tanstack/react-query';
import client from './graphqlClient';

const exerciseQuery = gql`
    query exercises($name: String) {
  exercises(name: $name) {
    name
    muscle
    instructions
    equipment
  }
}
`

export default function ExerciseDetailsScreen() {
    const {name} = useLocalSearchParams();
    const {data, isLoading, error} = useQuery({
        queryKey: ['exercises', name],
        queryFn: () => client.request(exerciseQuery)
    })
    
    const [instructionsExpanded, setInstructionsExpanded] = useState(false);

    if (isLoading) {
        return <ActivityIndicator/>
    }

    if (error){
        return <Text>{error.message}</Text>
    }

    const exercise = data?.exercises[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: 'Exercise Details' }} />
            <View style={styles.panel}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSubtitle}>
                    <Text style={styles.subValue}>
                        {exercise.muscle}
                    </Text>
                    <Text style={styles.subValue}>
                        &nbsp;|&nbsp;{exercise.equipment}
                    </Text>
                </Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions} numberOfLines={instructionsExpanded ? 0 : 3}>
                    {exercise.instructions}
                </Text>
                <Text onPress={()=>{setInstructionsExpanded(!instructionsExpanded)}} style={styles.seeMore}>{instructionsExpanded ? "See Less" : "See More"}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    seeMore: { alignSelf: 'center', padding: 10, fontWeight: '600', color: 'grey' },
    panel: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    container: {
        padding: 10,
        gap: 10,
        flex: 1,
        backgroundColor: 'ghostwhite'
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '500'
    },
    exerciseSubtitle: {
        color: 'dimgray'
    },
    subValue: {
        textTransform: 'capitalize'
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24,
    }
})