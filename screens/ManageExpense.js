import { useContext, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../components/constants/styles";
import ExpenseForms from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

const { View, StyleSheet } = require("react-native");
function ManageExpenses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);
    const editedExpenseId = route.params?.id;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesContext.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesContext.deleteExpense(editedExpenseId);
        }
        catch (error) {
            setError('Could not delete expense');
            setIsSubmitting(false);

        }

        navigation.goBack();
    }

    function cancelExpenseHandler() {
        navigation.goBack();
    }

    async function confirmExpenseHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesContext.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesContext.addExpense({ ...expenseData,id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save expense');
            setIsSubmitting(false);

        }
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
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