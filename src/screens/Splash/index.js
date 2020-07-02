import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Button,
  Footer,
  FooterTab,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Right,
  Left,
  Badge,
  Header,
  Body,
  Title
} from "native-base"
import Cover from '../../assets/images/coverchat.svg'
import styles from './SplashStyle'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  })
  return (
    <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Cover width={200} height={200}/>
          <Text style={styles.textTitle}>Ninja Chat</Text>
          <Text style={styles.textSubTitle}> ~ easy in someone's communication and chat</Text>
        </Content>
      </Container>
  )
}


export default Splash;