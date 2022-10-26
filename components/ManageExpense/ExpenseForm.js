import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../constants/styles";
import TextButton from "../UI/TextButton";
import Input from "./Input";

function ExpenseForms({ onCancel, onConfirm, confirmLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: !!defaultValues
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: !!defaultValues
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: !!defaultValues
        }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: {
                    value: enteredValue,
                    isValid: true
                },
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        console.log(expenseData.date);
        const amoutIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        // const dateIsValid = expenseData.date.toString() === 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        console.log(amoutIsValid);
        // console.log(dateIsValid);
        console.log(descriptionIsValid);
        if (!amoutIsValid || !descriptionIsValid) {
            Alert.alert('Invalid Input', 'Please check the data entered');
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amoutIsValid },
                    // date : {value: currentInputs.date.value, isValid: dateIsVal},
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return;
        }


        onConfirm(expenseData);
    }
    const formIsInvalid = !inputs.amount.isValid || !inputs.description.isValid;

    return (
        <View style={style.form}>
            <Text style={style.title}>Your Expenses</Text>
            <View style={style.inputsRow}>
                <Input
                    invalid={!inputs.amount.isValid}
                    newStyle={style.rowInput}
                    label='Amount'
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    newStyle={style.rowInput}
                    label='Date'
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                invalid={!inputs.description.isValid}
                label='Description'
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && (
                <Text style={style.errorText}>Please check the entered data</Text>
            )}
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
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: "center",
        paddingBottom: 29,
    }
});