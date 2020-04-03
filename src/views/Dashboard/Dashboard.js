import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTable from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export function Dashboard(props) {
  const { tableData, moratoriumTableData } = props;
  const interestWithMoratorium = moratoriumTableData.reduce(
    (acc, obj) => acc + obj.interest,
    0
  );
  const interestWithOutMoratorium = tableData.reduce(
    (acc, obj) => acc + obj.interest,
    0
  );
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Moratorium</p>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Total Interest without moratorium
              </h4>
              <h4 className={classes.cardTitle}>
                Rs.{interestWithOutMoratorium}
              </h4>
              <br />
              <h4 className={classes.cardTitle}>
                Total Interest with moratorium
              </h4>
              <h4 className={classes.cardTitle}>Rs.{interestWithMoratorium}</h4>
              <br />
              <h4 className={classes.cardTitle}>
                Excess interest to be paid if you avail moratorium
              </h4>
              <h4 className={classes.cardTitle}>
                Rs.{interestWithMoratorium - interestWithOutMoratorium}
              </h4>
              <br />
              <h4 className={classes.cardTitle}>Loan will be extended by</h4>
              <h4 className={classes.cardTitle}>
                {moratoriumTableData.length - tableData.length} months
              </h4>
              <br />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Loan Instalments</h4>
            </CardHeader>
            <CardBody>
              <CustomTable
                tableHeaderColor="warning"
                tableHead={["month", "EMI", "Interest", "Principle", "Balance"]}
                tableData={tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Loan Instalments With Moratorium
              </h4>
            </CardHeader>
            <CardBody>
              <CustomTable
                tableHeaderColor="warning"
                tableHead={["month", "EMI", "Interest", "Principle", "Balance"]}
                tableData={moratoriumTableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  moratoriumTableData: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  tableData: state.TableData,
  moratoriumTableData: state.MoratoriumTableData
});

export default connect(mapStateToProps)(Dashboard);
