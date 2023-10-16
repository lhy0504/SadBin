import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { AntDesign, Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import ThemeContext from '../../constants/ThemeContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const { theme:colorScheme,  } = useContext(ThemeContext);
  const colors = Colors[colorScheme??'light'];


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarActiveBackgroundColor:colors.background,
      
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'New',
          headerShown:false,
          tabBarIcon: ({ color }) => <Feather size={25} name="plus" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="bin"
        options={{
          title: 'Bin',  headerShown:false,
          tabBarIcon: ({ color }) => <Entypo name='trash' size={25}  color={color} />,
        }}
      />
    </Tabs>
  );
}
