import { Tabs } from 'expo-router';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="menu"
        options={{
          title: 'menu',
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="minicurso" 
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color, size }) => <Entypo name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil" 
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Entypo name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}