import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

// Screens
import Login from "../screens/Login";
import OTPVerf from "../screens/OTPVerf";
import Signup from "../screens/Signup";
import PinVerf from "../screens/PinVerf";
import Home from "../screens/Home";
import Activity from "../screens/Activity";
import Groups from "../screens/Groups";

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
			<Stack.Screen
				name='PinVerf'
				component={PinVerf}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Activity'
				component={Activity}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Groups'
				component={Groups}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigation;
