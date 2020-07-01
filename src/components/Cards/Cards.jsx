import React from 'react'
import {Card, CardContent, Typography,Grid, StylesProvider} from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import styles from './Cards.module.css';

const Cards = ({data : {confirmed,recovered,deaths,lastUpdate}}) => {
    
    if(!confirmed){
        return "Loading..."
    }

    return(
        <div className={styles.container}>
            <Grid container spacing={3}>
                <Grid item component={Card} xl={3} md={3} sm={12} xs={12} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator=","/> 
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xl={3} md={3} sm={12} xs={12} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered.value} duration={2.5} separator=","/> 
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Recovered</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xl={3} md={3} sm={12} xs={12} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Death</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths.value} duration={2.5} separator=","/> 
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Death</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards