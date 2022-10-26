import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../constants/styles";

function ExpenseItem({ id, description, date, amount }) {
    const navigation = useNavigation();

    // THIS ID MIGHT CRASH
    function expensePressHandler() {
        navigation.navigate('ManageExpenses', {
            id: id,
        });
    }


    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && style.pressed}>
            <View style={style.container}>
                <View>
                    <Text style={style.description}>{description}</Text>
                    <Text style={style.date}>{getFormattedDate(date)}</Text>
                </View>
                <View style={style.amountContainer}>
                    <Text style={style.amount}> ${amount}</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExpenseItem;

const style = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    container: {
        backgroundColor: GlobalStyles.colors.primary200,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    description: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 15,
    },
    date: {
        color: GlobalStyles.colors.primary500,
        fontSize: 12,
    },
    amountContainer: {
        backgroundColor: GlobalStyles.colors.primary400,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        minWidth: 80,
    },
    amount: {
        color: 'white',
        fontWeight: "bold",

    },
});