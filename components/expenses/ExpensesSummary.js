import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
    const expensesSummary = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (

        <View style={style.container}>
            <Text style={style.period}>
                {periodName}
            </Text>
            <Text style={style.summary}>
                ${expensesSummary.toFixed(2)}
            </Text>
        </View>
    );

}

export default ExpensesSummary;

const style = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary50,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,

    },
    period: {
        color: GlobalStyles.colors.primary400,
    },
    summary: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold",
        fontSize: 15,
    },

});