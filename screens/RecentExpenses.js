import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const { StyleSheet } = require("react-native");

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            try {
                const expenses = await fetchExpenses();
                expensesContext.setExpenses(expenses);

            }
            catch (error) {
                setError('An Error Ocurred');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);


    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const daysAgo = getDateMinusDays(today, 7);
        return (expense.date >= daysAgo) && (expense.date <= today);
    })
    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }
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