import React, { useState } from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from "phosphor-react-native"

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import * as Clipboard from "expo-clipboard"

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({discord,onClose, ...props} : Props) {
  const [isCopying, setIsCopying] = useState(false)

  async function handleCopyDiscordUserToClipboard(){
    setIsCopying(true)
    await Clipboard.setStringAsync(discord)


    Alert.alert('Discord Cópiado!', 'Usuário copiado para você colocar no Discord e econtrar esse gamer' )

    setIsCopying(false)
  }

  return (
    <Modal {...props} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name='close' size={20} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading title="Let's Play!" subTitle="Agora é só começar a jogar!" style={{alignItems: 'center', marginTop: 24}}/>

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUserToClipboard} disabled={isCopying}>
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
            </Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </Modal>
  );
}