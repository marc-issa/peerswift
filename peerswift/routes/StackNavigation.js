import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";

// Screens
import PinVerf from "../screens/PinVerf";
import Home from "../screens/Home";
import Activity from "../screens/Activity";
import Groups from "../screens/Groups";
import GroupChat from "../screens/GroupChat";
import Profile from "../screens/Profile";
import Countries from "../screens/Countries";
import Notifications from "../screens/Notifications";
import EditProfile from "../screens/EditProfile";
import DetailsScreen from "../screens/DetailsScreen";

// Actions
import SendMoney from "../screens/SendMoney";
import RequestTransfer from "../screens/RequestTransfer";
import TopUp from "../screens/TopUp";

// Add Screens
import AddRecipient from "../screens/AddRecipient";
import AddCard from "../screens/AddCard";

const Stack = createStackNavigator();

const StackNavigation = ({ navigation }) => {
	return (
		<Stack.Navigator>
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
			<Stack.Screen
				name='GroupChat'
				component={GroupChat}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Profile'
				component={Profile}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Countries'
				component={Countries}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='Notifications'
				component={Notifications}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='EditProfile'
				component={EditProfile}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='SendMoney'
				component={SendMoney}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='RequestTransfer'
				component={RequestTransfer}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='TopUp'
				component={TopUp}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='AddRecipient'
				component={AddRecipient}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='AddCard'
				component={AddCard}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
			<Stack.Screen
				name='DetailsScreen'
				component={DetailsScreen}
				options={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigation;
