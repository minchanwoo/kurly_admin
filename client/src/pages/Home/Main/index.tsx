import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";

import { graphql } from "../../../util/graphql";

import _ from "lodash";

import { CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      margin: 10,
      minWidth: 120
    }
  })
);

const MONTH_GAP = dateFns.differenceInMonths(
  new Date(),
  new Date("2019-08-01")
);

const MONTH_RANGE = (_.range(0, MONTH_GAP + 1).map((gap: any) => {
  const month = dateFns.format(
    dateFns.addMonths(new Date("2019-08-01"), gap),
    "yyyyMM"
  );
  return {
    ...gap,
    month
  };
}) as any).reverse();

const Main = () => {
  const [signUpUsers, setSingUpUsers] = useState([]);
  const [selectMonth, setSelectMonth] = useState([]);
  const [months, setMonths] = useState(MONTH_RANGE[0].month);

  const classes = useStyles();

  useEffect(() => {
    graphql({
      query: `
    query($months: String) {
      users(month: $months) {
        list {
          id
          createdAt
        }
      }
    }
    `,
      variables: {
        months
      }
    }).then(result => {
      const firstDayOfMonth = dateFns.parse(months, "yyyyMM", new Date());
      console.log("HAHA~!!", firstDayOfMonth);
      const ranges = _.range(
        0,
        dateFns.lastDayOfMonth(firstDayOfMonth).getDate()
      ).map((range: any) => {
        const date = dateFns.format(
          dateFns.addDays(firstDayOfMonth, range),
          "yyyyMMdd"
        );

        const count = result.users.list.filter(
          (user: any) =>
            dateFns.format(new Date(Number(user.createdAt)), "yyyyMMdd") ===
            date
        ).length;
        return { date, count };
      }) as any;

      setSelectMonth(MONTH_RANGE);
      setSingUpUsers(ranges);
    });
  }, [months]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">월별</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={months}
          onChange={(e: any) => setMonths(e.target.value)}
        >
          {selectMonth.map((as: any, i: number) => {
            return (
              <MenuItem key={i} value={as.month}>
                {as.month}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <h2>월별 가입자수</h2>
      <BarChart width={800} height={300} data={signUpUsers}>
        <Bar dataKey="count" fill="#10ac84" />
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default Main;
