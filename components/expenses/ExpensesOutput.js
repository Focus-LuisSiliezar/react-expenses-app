import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, periodName, fallbackText }) {
    let content = <Text style={style.infoText}>{fallbackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={style.rootContainer}>
            <ExpensesSummary expenses={expenses} periodName={periodName} />
            {content}
        </View>
    );
}

export default ExpensesOutput;

const style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
    },
    infoText: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 32,
        color: GlobalStyles.colors.primary700,
    },
});