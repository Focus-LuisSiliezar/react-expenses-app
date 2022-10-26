import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from './components/constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const ButtonTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <ButtonTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
        tabBarActiveTintColor: GlobalStyles.colors.primary50,
        headerRight: ({ tintColor }) => {
          return <IconButton
            color={tintColor}
            icon='add'
            size={24}
            onPress={() => { navigation.navigate('ManageExpenses') }
            }
          />
        }
      })}

    >
      <ButtonTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarIcon: ({ color, size }) => (
            < Ionicons name='hourglass' color={color} size={size} />
          )
        }}
      />
      <ButtonTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            < Ionicons name='calendar' color={color} size={size} />
          )
        }}
      />
    </ButtonTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='ExpensesOverview'
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ManageExpenses'
              component={ManageExpenses}
              options={{
                presentation: 'modal',
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
