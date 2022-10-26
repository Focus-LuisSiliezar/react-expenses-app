import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({ label, newStyle, textInputConfig }) {

    let inputStyles = [style.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(style.inputMultine)
    }

    return (
        <View style={[style.inputContainer, newStyle]}>
            <Text style={style.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}
export default Input;

const style = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
        
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary200,
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        color: GlobalStyles.colors.primary700,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary200,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontSize: 16,
    },
    inputMultine: {
        minHeight: 150,
        textAlignVertical: "top"
    }
});