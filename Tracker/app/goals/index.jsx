import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'


const Goals = () => {

  const { goals } = useGoals()

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable>
            <Text>{item.desc}</Text>
          </Pressable>
        )} />
    </SafeAreaView>
  )
}

export default Goals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
})