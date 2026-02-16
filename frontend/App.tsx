import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

type AppState = {
  counter: number;
};

type Action = { type: 'increment' } | { type: 'decrement' };

const initialState: AppState = { counter: 0 };

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 };
    case 'decrement':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const HomeScreen = ({ navigation }: HomeProps) => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.counter}>Counter: {state.counter}</Text>
      <View style={styles.buttonRow}>
        <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
        <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} />
      </View>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </SafeAreaView>
  );
};

const DetailsScreen = ({ navigation }: DetailsProps) => {
  const { state } = React.useContext(AppContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.counter}>Current Counter: {state.counter}</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  counter: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
});

export default App;