const express = require('express');
const path = require('path');
const PORT = 8080;

let app = express();

const FishCatch = require('./models/fishcatch.js');
const fishtegrateStreamClient = require('./util/fishtergrate-stream-client.js');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '/build')));

app.get('/sync_catch_report', (req, res, next) => {
    let message = { message: 'sync successfully' }
    let catchReport = { ...req.query, datasource: 'FAME', isVerified: false };
    FishCatch.create(catchReport);
    res.status(200);
    res.json(message);
});

app.get('/catch_reports', (req, res, next) => {
    let condition = (Object.keys(req.query).length > 0) ? { where: req.query } : {};
    FishCatch.findAll(condition).then(reports => {
        console.log(`user was fetched successfully. number of record fetched: ${reports.length}`);
        res.status(200);
        res.json(reports);
    });
});

app.get('/catch_reports/distinct', (req, res, next) => {
    let condition = (Object.keys(req.query).length > 0) ? { where: req.query } : {};
    FishCatch.findAll(condition).then(reports => {
        let result = [];
        let map = new Map();
        for (const item of reports) {
            if (!map.has(item.referenceNumber)) {
                map.set(item.referenceNumber, true);
                result.push({
                    id: result.length + 1,
                    referenceNumber: item.referenceNumber,
                    vesselName: item.vesselName,
                    boatCaptain: item.boatCaptain,
                    isVerified: item.isVerified,
                    datasource: item.datasource
                });
            }
        }
        console.log(`reports was fetched successfully. number of record fetched: ${result.length}`);
        res.status(200);
        res.json(result);
    });
});


app.get('/verify_catch_report', (req, res, next) => {
    const { referenceNumber } = req.query;
    let dateToday = new Date();
    const condition = { where: { referenceNumber: referenceNumber } };
    FishCatch.update({ verifiedDate: dateToday.toISOString(), verifiedBy: 'Philippine Government', isVerified: true }, condition).then(() => {
        FishCatch.findAll(condition).then(results => {
            results.forEach(record => fishtegrateStreamClient.publish(record));
            console.log(`publishing record to streamr was completed successfully. number of published records: ${results.lenght}`);
        });
    })
    res.status(200);
    res.json({ message: 'catch_report successfully verified' });
});


app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`app was running on PORT: ${PORT}`);
});