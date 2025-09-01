import { Tabs } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { Chrome as Home, Wrench, DollarSign, User } from 'lucide-react-native';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isSmall = width < 360;
  const isTablet = width >= 768;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#16213E',
          borderTopColor: '#2D2D3A',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? (isSmall ? 70 : 85) : (isSmall ? 56 : 65),
          paddingBottom: Platform.OS === 'ios' ? (isSmall ? 16 : 25) : (isSmall ? 6 : 10),
          paddingTop: isSmall ? 6 : 10,
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: isSmall ? 10 : 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ size, color }) => (
            <Wrench size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pricing"
        options={{
          title: 'Pricing',
          tabBarIcon: ({ size, color }) => (
            <DollarSign size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}