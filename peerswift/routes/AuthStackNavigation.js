import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

// Screens
import Login from "../screens/Login";
import OTPVerf from "../screens/OTPVerf";
import Signup from "../screens/Signup";

const Stack = createStackNavigator();

const AuthStackNavigation = ({ navigation }) => {
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
			<Stack.Screen
				name='OTPVerf'
				component={OTPVerf}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Signup'
				component={Signup}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
};

export default AuthStackNavigation;
