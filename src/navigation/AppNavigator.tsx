import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTabScreen } from "../screens/Home/HomeTabScreen";
import { ClosetScreen } from "../screens/Closet/ClosetScreen";
import { RecommendationsScreen } from "../screens/Recommendations/RecommendationsScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { SettingsScreen } from "../screens/Settings/SettingsScreen";
import { GarmentDetailsScreen } from "../screens/GarmentDetails/GarmentDetailsScreen";
import { EditGarmentScreen } from "../screens/EditGarment/EditGarmentScreen";
import { SavedOutfitsScreen } from "../screens/SavedOutfits/SavedOutfitsScreen";
import { OutfitDetailsScreen } from "../screens/OutfitDetails/OutfitDetailsScreen";
export type RootStackParams = { Tabs: undefined; GarmentDetails: { garmentId: string }; EditGarment: { garmentId: string }; OutfitDetails: { outfitId: string }; SavedOutfits: undefined; };
type TabParams = { Home: undefined; Closet: undefined; Recommendations: undefined; Profile: undefined; Settings: undefined; };
const Stack = createNativeStackNavigator<RootStackParams>(); const Tab = createBottomTabNavigator<TabParams>();
function Tabs() { return <Tab.Navigator screenOptions={{ headerShown: false }}><Tab.Screen name="Home" component={HomeTabScreen} /><Tab.Screen name="Closet" component={ClosetScreen} /><Tab.Screen name="Recommendations" component={RecommendationsScreen} /><Tab.Screen name="Profile" component={ProfileScreen} /><Tab.Screen name="Settings" component={SettingsScreen} /></Tab.Navigator>; }
export function AppNavigator() { return <NavigationContainer><Stack.Navigator><Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} /><Stack.Screen name="GarmentDetails" component={GarmentDetailsScreen} /><Stack.Screen name="EditGarment" component={EditGarmentScreen} /><Stack.Screen name="OutfitDetails" component={OutfitDetailsScreen} /><Stack.Screen name="SavedOutfits" component={SavedOutfitsScreen} /></Stack.Navigator></NavigationContainer>; }
