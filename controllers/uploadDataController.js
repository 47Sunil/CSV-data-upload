import userModel from "../models/userModel.js";
import dataModel from "../models/dataModel.js";
import csv from "csvtojson";

export const uploadData = async (req, res) => {
  try {
    let fileData = [];
    const response = await csv().fromFile(req.file.path); // Use await to read the CSV

    for (let i = 0; i < response.length; i++) {
      fileData.push({
        country: response[i].Country,
        county: response[i].County,
      });
    }

    const storedData = await userModel.insertMany(fileData); // Use await for data insertion

    return res.status(201).json({
      success: true,
      message: "Data uploaded",
      data: storedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await dataModel.find().skip(skip).limit(limit);

    const totalCount = await dataModel.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data: data,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
