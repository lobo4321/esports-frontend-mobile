import { StatusBar } from 'react-native';

import {useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold,  Inter_900Black} from "@expo-google-fonts/inter"

import { Background } from './src/components/Background';
import { Home } from './src/screens/Home';
import {Router} from "./src/routes"
import { Loading } from './src/components/Loading';

import './src/service/notificationConfigs'
import { useEffect, useRef } from 'react';
import { Subscription } from 'expo-modules-core';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';
import * as Notifications from "expo-notifications"





export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()
  
  useEffect(() => {
    getPushNotificationToken()
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
        Notifications.removeNotificationSubscription(getNotificationListener.current)
      }
    }
  }, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold, 
    Inter_700Bold,
    Inter_900Black
  })
  return (
    <Background >
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transaparent"
        translucent
      />

      {fontsLoaded ? <Router /> : <Loading />}
    </Background>
  );
}

