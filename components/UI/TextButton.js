import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function TextButton({ label, onPress, mode, newStyle }) {
    return (
        <View style={newStyle}>
            <Pressable onPress={onPress}
                style={({ pressed }) => pressed && style.pressed}>
                <View style={[style.button, mode === 'flat' && style.flat]}>
                    <Text style={[style.buttonText, mode === 'flat' && style.flatText]}>
                        {label}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}
export default TextButton;

const style = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    }
});