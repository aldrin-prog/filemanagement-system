const { PutCommand,ScanCommand,DeleteCommand,UpdateCommand,QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const { docClient } = require("../utils/db");
const TABLENAME = "ResourcesTable-dev";
const getResources = async (req, res) => {
    try {
        const command= new ScanCommand({
            TableName: TABLENAME
        });
        const data = await docClient.send(command);
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ message:"Server Error",error:error });
    }

}
const addRousource= async (req, res) => {
    try {
        const currentDate = new Date().toISOString();
        const command = new PutCommand({
            TableName: TABLENAME,
            Item: {
                id: uuidv4(),
                ...req.body,
                statusForm:"pending",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            ConditionExpression: "attribute_not_exists(id)"
        });
        await docClient.send(command);
        res.status(201).json({ success: "Resource created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error})
    }
}

const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const currentDate = new Date().toISOString();

        const command = new UpdateCommand({
            TableName: TABLENAME,
            Key: { id: id },
            UpdateExpression: "SET #statusForm = :status, updatedAt = :updatedAt",
            ExpressionAttributeNames:{
                "#statusForm": "statusForm"
            },
            ExpressionAttributeValues: {
                ":status": req.body.statusForm,
                ":updatedAt": currentDate
            }
        });

        await docClient.send(command);

        res.status(200).json({
            success: "Resource updated successfully",
            updatedId: id
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
const deleteResource = async (req, res) => {
   try {
    const {id}=req.params;
    const command = new DeleteCommand({
        TableName: TABLENAME,
        Key: {
            id
        }
    });
    await docClient.send(command);
    res.status(200).json({ success: 'resource deleted',});
   } catch (error) {
    res.status(500).json({ message: "Server Error", error: error})
   }
}
const getUSerResources = async (req, res) => {
    try {
        const {username}=req.body;
        const command= new ScanCommand({
            TableName: TABLENAME,
            FilterExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            }
        });
        const data = await docClient.send(command);
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ message:"Server Error",error:error });
    }
}
const getProcessedForms = async (req, res) => {
    try {
        const command= new ScanCommand({
            TableName: TABLENAME,
            FilterExpression: "statusForm = :status",
            ExpressionAttributeValues: {
                ":status": "processed",
            }
        });
        const data = await docClient.send(command);
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ message:"Server Error",error:error });
    }
};


module.exports = {
    getResources,
    addRousource,
    updateResource,
    deleteResource,
    getUSerResources,
    getProcessedForms
};