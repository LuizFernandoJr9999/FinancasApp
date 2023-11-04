import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import Header from '../../components/Header';
import {Background, ListBalance} from './styles';

import api from '../../services/api';
import {format} from 'date-fns';

import {useIsFocused} from '@react-navigation/native';

import BalanceItem from '../../components/BalanceItem';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);

  const [dateMovements, setDateMovements] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      //const balance = await api.get('/balance', {
      //  params: {
      //    date: dateFormated,
      //  },
      //});

      //async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@finToken');

      const balance = await api.get('/balance', {
        //params: {date: dateFormated},
        headers: {
          Authorization: `Bearer ${storageUser}`,
        },
      });
      //.catch(() => {
      //setUser(null);
      //});

      //api.defaults.headers.Authorization = 'Bearer ${token}';
      //setUser(response.data);
      //setLoading(false);

      //try {
      //  const balance = await api.get('/balance', {
      //    dateFormated,
      //    name: nome,
      //    password: password,
      //    email: email,
      //  });

      //  setLoadingAuth(false);

      //  navigation.goBack();
      //} catch (err) {
      //  console.log('ERRO', err);
      //  setLoadingAuth(false);
      //}
      //console.log(nome);
      if (isActive) {
        console.log(dateFormated);
        console.log(dateMovements);
        console.log(balance.data);
        setListBalance(balance.data);
        //console.log(listBalance(balance.data));
        //console.log(storageUser);
        //console.log(setListBalance);
      }
    }

    getMovements();

    return () => (isActive = false);
  }, [isFocused]);

  return (
    <Background>
      <Header title="Minhas movimentações" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({item}) => <BalanceItem data={item} />}
      />
    </Background>
  );
}
