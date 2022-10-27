import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import TextButton from "./TextButton";

function ErrorOverlay({ message, onConfirm }) {
    return (
        <View style={style.container}>
            <Text style={[style.text,style.title]}>Ooops!</Text>
            <Text style={style.text}>{message}</Text>
            <TextButton
                onPress={onConfirm}
                label="Try again"
                newStyle={{marginVertical: 24, width:'35%'}}
            />
        </View>
    );
}

export default ErrorOverlay;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 24,  
        backgroundColor: GlobalStyles.colors.primary100,
    },
     text: {
        textAlign: "center",
        marginBottom: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",

    }

});