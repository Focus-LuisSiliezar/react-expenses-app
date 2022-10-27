import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function LoadingOverlay(){
    return (
        <View style={style.container}>
            <ActivityIndicator 
            size='large'
            color='white'
            
            />
        </View>
    );
}

export default LoadingOverlay;

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: GlobalStyles.colors.primary100,
    }
});