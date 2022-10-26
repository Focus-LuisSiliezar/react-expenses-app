import { useContext } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
const { StyleSheet } = require("react-native");

function AllExpenses() {
   const expensesContext = useContext(ExpensesContext);

   return (
      <ExpensesOutput
         expenses={expensesContext.expenses}
         periodName='Total'
         fallbackText='No expenses registered'
      />
   );
}

export default AllExpenses;
const style = StyleSheet.create({}); 