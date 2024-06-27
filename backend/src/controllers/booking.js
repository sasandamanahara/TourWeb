const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const BookingModel = require('../model/booking')

exports.create = async (req, res, next) => {

    const {
        tourist,
        tourName,
        //price
    } = req.body;

    try {
        const { pdf } = req.files;
        if (!pdf) {
            throw createHttpError(404, "pdf not found")
        };
        let filepath = __dirname + '../../../public/pdfs/' + pdf.name
        pdf.mv(filepath);
        let filepathtoUplaod = '/public/pdfs/' + pdf.name

        if (!tourist || !tourName ) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        const touristId = mongoose.Types.ObjectId(tourist);
        const tourId = mongoose.Types.ObjectId(tour);

        const booking = new BookingModel({
            tourist: touristId,
            tour: tourId,
            total: tour.price,
            date: Date.now(),
            bookingStatus: 'pending',
            file: filepathtoUplaod,
           
        });

        const result = await booking.save();

        res.status(201).send(result);

    } catch (error) {

        next(error)

    }

}

exports.getBookingsByPartner = async (req, res, next) => {

    const PartnerId = req.params.id;

    try {

        const bookings = await BookingModel.find({ Partner: PartnerId }).populate('tourist').populate('tour').exec();
        res.send(bookings);


    } catch (error) {
        next(error)
    }

}

exports.getBookingsBytourist = async (req, res, next) => {

    const touristId = req.params.id;

    try {

        const bookings = await BookingModel.find({ tourist: touristId }).populate('tourist').populate('tour').exec();
        res.send(bookings);
    }
    catch (error) {
        next(error)
    }
}