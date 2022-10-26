import { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

const { StyleSheet } = require("react-native");

function RecentExpenses() {
    const expensesContext = useContext(ExpensesContext);
    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const daysAgo = getDateMinusDays(today, 7);
        return (expense.date >= daysAgo) && (expense.date <= today);
    })
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            periodName="Last 7 Days"
            fallbackText="No expenses registered for the last 7 days"
        />
    );
}

export default RecentExpenses;
const style = StyleSheet.create({});