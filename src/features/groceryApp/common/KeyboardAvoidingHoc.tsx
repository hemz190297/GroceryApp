import React from 'react';
import { KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native';

const withKeyboardAvoiding = (WrappedComponent) => {
    return (props) => (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <WrappedComponent {...props} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default withKeyboardAvoiding;
