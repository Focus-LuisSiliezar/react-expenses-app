import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
        // <ExpenseItem 
        // description={itemData.item.description}
        // amount={itemData.item.amount}
        // date={itemData.item.date}
        // />
    );
}

function ExpensesList({ expenses }) {

    return (
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} style={{ marginVertical: 12 }} />
    );
}

export default ExpensesList;
