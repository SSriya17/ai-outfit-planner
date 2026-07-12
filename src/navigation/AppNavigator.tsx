import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChartNoAxesCombined, House, Shirt, UserRound } from "lucide-react-native";
import { HomeTabScreen } from "../screens/Home/HomeTabScreen";
import { ClosetScreen } from "../screens/Closet/ClosetScreen";
import { InsightsScreen } from "../screens/Insights/InsightsScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { GarmentDetailsScreen } from "../screens/GarmentDetails/GarmentDetailsScreen";
import { EditGarmentScreen } from "../screens/EditGarment/EditGarmentScreen";
export type RootStackParams = { Tabs: undefined; GarmentDetails: { garmentId: string }; EditGarment: { garmentId: string }; };
export type TabParams = { Home: undefined; Closet: undefined; Insights: undefined; Profile: undefined; };
const Stack = createNativeStackNavigator<RootStackParams>(); const Tab = createBottomTabNavigator<TabParams>();
function Tabs() { return <Tab.Navigator id="main-tabs" screenOptions={{ headerShown: false, tabBarActiveTintColor: "#46443E", tabBarInactiveTintColor: "#99958B", tabBarLabelStyle: { fontSize: 11, fontWeight: "600" }, tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#E4E0D7", height: 70, paddingBottom: 10, paddingTop: 8 } }}><Tab.Screen name="Home" component={HomeTabScreen} options={{ tabBarIcon: ({ color, size }) => <House color={color} size={size} />, tabBarLabel: "Home" }} /><Tab.Screen name="Closet" component={ClosetScreen} options={{ tabBarIcon: ({ color, size }) => <Shirt color={color} size={size} />, tabBarLabel: "Closet" }} /><Tab.Screen name="Insights" component={InsightsScreen} options={{ tabBarIcon: ({ color, size }) => <ChartNoAxesCombined color={color} size={size} />, tabBarLabel: "Insights" }} /><Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />, tabBarLabel: "Profile" }} /></Tab.Navigator>; }
export function AppNavigator() { return <NavigationContainer><Stack.Navigator id="root-stack"><Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /><Stack.Screen name="GarmentDetails" component={GarmentDetailsScreen} /><Stack.Screen name="EditGarment" component={EditGarmentScreen} /></Stack.Navigator></NavigationContainer>; }
