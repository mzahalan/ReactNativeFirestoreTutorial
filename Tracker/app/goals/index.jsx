import { Text, StyleSheet, FlatList, Pressable, View, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider'
import { useGoals } from '../../hooks/useGoals'
import { useState } from 'react'


const Goals = () => {
  const [selectedGoal, setSelectedGoal] = useState(null)
  const { goals, updateGoal, removeGoal } = useGoals()

  const  handleUpdateProgress = async (progress) => {
    // Putting this in will smoothen the transition
    // It's like an optimistic approach where we assume the update will work
    // selectedGoal.progress = progress
    await updateGoal(selectedGoal.id, {progress: progress})
  }

  const handleDeleteGoal = async () => {
    await removeGoal(selectedGoal)
    setSelectedGoal(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={()=>setSelectedGoal(item)}>
            <View style={styles.goal}>
              <Text style={{margin:16}}>{item.goal}</Text>
              <View style={[styles.progress, {width: `${item.progress}%`}]}/>
            </View>
          </Pressable>
        )}/>

        {selectedGoal && (
          <Modal 
            visible={selectedGoal !== null}
            animationType="slide"
            onRequestClose={()=>setSelectedGoal(null)}>
            <View style={styles.modal}>
              <Text style={styles.title}>{selectedGoal.goal}</Text>
              <Text>Adjust the progress of this goal:</Text>
              <Slider
                style={{ width: '80%', height: 40, marginVertical: 20 }}
                value={selectedGoal.progress}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#21cc8d"
                maximumTrackTintColor="#ddd"
                thumbTintColor='#21cc8d'
                onSlidingComplete={handleUpdateProgress}
              />
              <View style={styles.buttonsWrapper}>
                <Pressable style={styles.btn} onPress={()=>setSelectedGoal(null)}>
                  <Text style={{color: 'white'}}>Close</Text>
                </Pressable>
              </View>
              <View style={styles.delButtonWrapper}>
                <Pressable style={[styles.btn, {backgroundColor: '#e74c3c', width: '100%', alignItems: 'center'}]} onPress={()=> handleDeleteGoal()}>
                  <Text style={{color: 'white'}}>Delete Goal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}

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
  list: {
    paddingHorizontal: 20,
  },
  goal: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    overflow: 'hidden',
  },
  progress: {
    height: 10,
    backgroundColor: '#21cc8d',
    minWidth: 10,
    borderRadius: 2,
  },
  modal: {
    flex: 1,
    margin: 20,
    marginTop: 100,
    alignItems: 'center'
  },
  buttonsWrapper: {
    width: '80%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20
  },
  btn: {
    backgroundColor: '#21cc8d',
    padding: 16,
    borderRadius: 8,
  },
  delButtonWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 30
  }
})