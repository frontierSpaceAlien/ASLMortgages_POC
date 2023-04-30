import * as React from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Cards(props) {
  const [bgcolor] = React.useState("black");
  const { data } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Day Interest Due
              </Typography>
              <Typography variant="h9" component="div" color="white">
                {data[0] === undefined ? 0 : data[0].dayintdue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Borrower
              </Typography>
              <Typography variant="h9" component="div" color="white">
                {data[0] === undefined ? "Unknown" : data[0].borrower}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Capitalised
              </Typography>
              <Typography variant="h9" component="div" color="white">
                {data[0] === undefined ? "Unknown" : data[0].capitalised}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Interest
              </Typography>
              <Typography variant="h9" component="div" color="white">
                ${data[0] === undefined ? "0.00" : data[0].interest}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Daily Interest
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].dailyInt.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Monthly Interest
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].monthInt.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Management Fee
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].manageFee.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Broker Fee
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].brokerFee.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Legal Fee
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].legalFee.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Variation
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].variation.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Total Repayable
              </Typography>
              <Typography variant="h9" component="div" color="white">
                $
                {data[0] === undefined
                  ? "0.00"
                  : data[0].totalRepay.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ backgroundColor: bgcolor }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                Active(?)
              </Typography>
              <Typography variant="h8" component="div" color="white">
                {data[0] === undefined ? "Unknown" : data[0].active}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
