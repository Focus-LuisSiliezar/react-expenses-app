import { useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../components/constants/styles";
import ExpenseForms from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import TextButton from "../components/UI/TextButton";
import { ExpensesContext } from "../store/expenses-context";

const { View, StyleSheet } = require("react-native");

function ManageExpenses({ route, navigation }) {
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.id;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesContext.expenses.find(expense => expense.id === editedExpenseId);




    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesContext.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelExpenseHandler() {
        navigation.goBack();
    }

    function confirmExpenseHandler(expenseData) {
        if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, expenseData);
        } else {
            expensesContext.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={style.container}>
            <ExpenseForms
                onCancel={cancelExpenseHandler}
                onConfirm={confirmExpenseHandler}
                confirmLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={style.deleteContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpenseHandler}
                        size={25}
                    />
                </View>
            )}
        </View>
    );
}


export default ManageExpenses;
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },

});