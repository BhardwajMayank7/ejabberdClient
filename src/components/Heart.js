import React from 'react'
import { Animated } from 'react-native'
import { styles } from '../../styles'

const Heart = ({ style }) => (
    <Animated.Image
        source={require('../../assets/heart.png')}
        style={[styles.heart, style]}
    />
)

export default Heart
