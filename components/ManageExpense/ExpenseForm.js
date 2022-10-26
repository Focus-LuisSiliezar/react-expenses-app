import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";
import TextButton from "../UI/TextButton";
import Input from "./Input";

function ExpenseForms({ onCancel, onConfirm, confirmLabel }) {
    const [inputValue, setInputValue] = useState({
        amount: '',
        date: '',
        description: '',
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValue((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue,
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValue.amount,
            date: new Date(inputValue.date),
            description: inputValue.description,
        };
console.log(inputValue.amount);
console.log(inputValue.date);
console.log(inputValue.description);
        onConfirm(expenseData);


    }

    return (
        <View style={style.form}>
            <Text style={style.title}>Your Expenses</Text>
            <View style={style.inputsRow}>
                <Input
                    newStyle={style.rowInput}
                    label='Amount'
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputValue.amount,
                    }}
                />
                <Input
                    newStyle={style.rowInput}
                    label='Date'
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValue.date
                    }}
                />
            </View>
            <Input
                label='Description'
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputValue.description,
                }}
            />
            <View style={style.buttonContainer}>
                <TextButton
                    label='Cancel'
                    mode='flat'
                    onPress={onCancel}
                    newStyle={style.buttonOverrideStyle}
                />
                <TextButton
                    label={confirmLabel}
                    onPress={submitHandler}
                    newStyle={style.buttonOverrideStyle}
                />
            </View>
        </View>

    );
}

export default ExpenseForms;

const style = StyleSheet.create({
    form: {
        marginTop: 60,
        marginBottom: 40,
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 5,

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary400,
        marginVertical: 14,
        textAlign: "left",
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonOverrideStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});