const createHttpError = require('http-errors');
const TourModel = require('../model/tour');
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    const {
        tourName,
        price,
        discription,
    } = req.body;

    try {
        if (!tourName || !price || !discription) {
            throw createHttpError(400, 'Missing required parameters');
        }

        const tour = new TourModel({
            tourName,
            price,
            discription,
        });

        const result = await tour.save();
        res.status(201).send(result);

    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    const tourId = req.params.id;
    const {
        tourName,
        discription,
        price
    } = req.body;

    try {
        if (!mongoose.isValidObjectId(tourId)) {
            throw createHttpError(400, "Invalid Id");
        }

        if (!tourName || !price || !discription) {
            throw createHttpError(400, 'Missing required parameters');
        }

        const tour = await TourModel.findById(tourId).exec();

        if (!tour) {
            throw createHttpError(404, 'Tour not found');
        }

        tour.tourName = tourName;
        tour.discription = discription;
        tour.price = price;

        const result = await tour.save();
        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    const tourId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(tourId)) {
            throw createHttpError(400, "Invalid Id");
        }

        const result = await TourModel.findByIdAndDelete(tourId).exec();

        if (!result) {
            throw createHttpError(404, 'Tour not found');
        }

        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const result = await TourModel.find().exec();
        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    const Id = req.params.id;

    try {
        if (!mongoose.isValidObjectId(Id)) {
            throw createHttpError(400, "Invalid Id");
        }

        const result = await TourModel.findById(Id).exec();

        if (!result) {
            throw createHttpError(404, 'Tour not found');
        }

        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

exports.search = async (req, res, next) => {
    const query = req.query.q;

    try {
        if (!query) {
            throw createHttpError(400, "Please provide a search query");
        }

        const result = await TourModel.find({
            name: {
                $regex: query,
                $options: 'i'
            }
        }).exec();

        if (!result) {
            throw createHttpError(404, 'Tour not found');
        }

        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}
