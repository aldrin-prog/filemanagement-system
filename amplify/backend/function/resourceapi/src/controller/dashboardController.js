const {docClient} = require('../utils/db');

const {ScanCommand} = require('@aws-sdk/lib-dynamodb');
const TABLENAME = "SubmissionsTable-dev";
const getSubmissions = async (req, res) => {
    try {
        const command = new ScanCommand({
            TableName: TABLENAME,
            ProjectionExpression: "id, #name,#month, #year, #count",
            ExpressionAttributeNames: {
            "#name": "monthName",
            "#year": "year",
            "#count": "count",
            "#month": "month",
            },
            Limit: 6,
        });
        const data = await docClient.send(command);
        const sortedData = data.Items.sort((a, b) => b.month-a.month);
        res.status(200).json(sortedData);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error });
    }
}
module.exports = {
    getSubmissions,
};