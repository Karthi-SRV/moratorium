import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomButton from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Actions from "../../store/action";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function DetailsForm() {
  const classes = useStyles();
  const [loanAmount, setLoanAmount] = React.useState("");
  const [loanTerm, setLoanTerm] = React.useState("");
  const [moratorium, setMoratorium] = React.useState("");
  const [interest, setInterest] = React.useState("");

  const onChangeLoanAmount = event => {
    setLoanAmount(event.target.value);
  };

  const onChangeLoanTerm = event => {
    setLoanTerm(event.target.value);
  };

  const onChangeMoratorium = event => {
    setMoratorium(event.target.value);
  };

  const onChangeInterest = event => {
    setInterest(event.target.value);
  };

  const calculateInterest = balance => {
    return Math.round(balance * (interest / 1200));
  };

  const calculatePrinciple = (emi, balance) => {
    return Math.round(emi - calculateInterest(balance));
  };

  const calculateEmi = () => {
    return Math.round(
      (loanAmount * (interest / 1200) * (1 + interest / 1200) ** loanTerm) /
        ((1 + interest / 1200) ** loanTerm - 1)
    );
  };

  const validateData = () => {
    return (
      parseFloat(loanAmount) > 0 &&
      parseInt(moratorium) < parseInt(loanTerm) &&
      parseInt(moratorium) > 0 &&
      parseFloat(interest) > 0
    );
  };

  const calculateMoratorium = () => {
    if (validateData()) {
      Actions.MORATORIUM_TABLE_DATA(calculateMonthlyEmi(true));
      Actions.TABLE_DATA(calculateMonthlyEmi(false));
    }
  };

  const calculateMonthlyEmi = withMoratorium => {
    let balance = loanAmount;
    const fixedEmi = calculateEmi();
    let emi;
    let instalment = 1;
    const tableData = [];
    let pushObject;
    while (balance > 0) {
      emi = balance < fixedEmi ? balance : fixedEmi;
      const interest = calculateInterest(balance);
      if (
        moratorium <= instalment &&
        parseInt(moratorium) + 3 > instalment &&
        withMoratorium
      ) {
        balance += interest;
        pushObject = {
          month: instalment,
          emi: 0,
          interest: interest,
          principle: interest,
          balance: balance
        };
      } else {
        const principle = calculatePrinciple(emi, balance);
        balance = emi === fixedEmi ? balance - principle : 0;
        pushObject = {
          month: instalment,
          emi: emi,
          interest: interest,
          principle: principle,
          balance: balance
        };
      }
      tableData.push(pushObject);
      instalment += 1;
    }
    return tableData;
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Enter Details</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Loan Amount"
                    id="loan-amount"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: onChangeLoanAmount,
                      value: loanAmount,
                      type: "number"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Loan Term (in months)"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: onChangeLoanTerm,
                      value: loanTerm,
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="When Moratorium Starts"
                    id="moratorium"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: onChangeMoratorium,
                      value: moratorium,
                      type: "number"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Rate Of Interest"
                    id="rate-of-interest"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: onChangeInterest,
                      value: interest,
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <CustomButton color="primary" onClick={calculateMoratorium}>
                Calculate
              </CustomButton>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
