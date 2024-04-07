import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

// Screens
import Login from "../screens/Login";

const Stack = createStackNavigator();

const StackNavigation = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigation;
