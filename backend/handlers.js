"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


// returns a list of all flights
const getFlights = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const allData = await db.collection("flights").find().toArray();

        const result = [];

        allData.map((item) => {
            result.push(item.flight)
        })


        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, data: "Not Found" });
        }

        client.close();
        console.log("disconnected!");

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }
};

// returns all the seats on a specified flight
const getFlight = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const flight = req.params.flight;

        const result = await db.collection("flights").findOne({ flight });

        result
            ? res.status(200).json({ status: 200, flight, data: result })
            : res.status(404).json({ status: 404, flight, data: "Not Found" });

        client.close();
        console.log("disconnected!");

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }
};

// returns all reservations
const getReservations = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const result = await db.collection("reservations").find().toArray();

        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, data: "Not Found" });
        }

        client.close();
        console.log("disconnected!");

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }

};

// returns a single reservation
const getSingleReservation = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const id = req.params.reservation;

        const result = await db.collection("reservations").findOne({ id });

        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
        console.log("disconnected!");

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }
};

// creates a new reservation
const addReservation = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    let isBooked = false;

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const seat = req.body.seat;
        const flight = req.body.flight

        const flightData = await db.collection("flights").findOne({ flight });

        const updatedSeats = flightData.seats.map((item) => {
            if (item.id === seat && item.isAvailable) {
                return {
                    ...item,
                    isAvailable: false,
                };
            } else if (item.id === seat && !item.isAvailable) {
                isBooked = true;
                return {
                    ...item,
                };
            } else {
                return {
                    ...item,
                }
            }
        });
        await db.collection("flights").updateOne(
            { flight: flight },
            { $set: { seats: updatedSeats }
        });

        // add reservation
        !isBooked &&
            await db.collection("reservations").insertOne({ ...req.body })

        !isBooked
            ? res.status(201).json({ status: 201, data: { ...req.body}, message: "Reservation added successfully." })
            : res.status(400).json({ status: 400, message: "Seat not available." })

        client.close();
        console.log("disconnected!");

    } catch (err) {
        console.log("Error: ", err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }

    client.close();
    console.log("disconnected!");
};

// updates an existing reservation
// reservations can be updated by entering reservation id in body on Insomnia
// if you wish to change seat, include new seat in body
// NOTE: can update seats but not flight. To change flight, please DELETE reservation and POST another one

const updateReservation = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const id = req.params.reservation;

        let update;
        let seatBooked;

        const currentResData = await db.collection("reservations").find({ id }).toArray();

        if (currentResData.length > 0) {

            const flight = currentResData[0].flight;
            
            const flightData = await db.collection("flights").findOne({ flight });
                
            const updatedSeats = flightData.seats.map((item) => {

                console.log(item)
                // CURRENT SEAT: currentResData[0].seat
                // POTENTIAL UPDATED SEAT: req.body.seat

                // IF the POTENTIAL UPDATED SEAT is available
                if (item.id === req.body.seat && item.isAvailable) {
                    update = true;
                    return {
                        ...item,
                        // make POTENTIAL UPDATED SEAT not available
                        isAvailable: false,
                    };
                } else if (item.id === currentResData[0].seat && !item.isAvailable && update) {
                    return {
                        ...item,
                        // make CURRENT SEAT available again
                        isAvailable: true,
                    }
                
                // IF the POTENTIAL UPDATED SEAT is NOT available
                } else if (item.id === req.body.seat && !item.isAvailable) {
                    seatBooked = true;
                    return {
                        ...item,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            });
            await db.collection("flights").updateOne(
                { flight: flight },
                { $set: { seats: updatedSeats } }
            );
        }
                        
        if (update) {
            //update reservation
            await db.collection("reservations").updateOne(
                { id: id },
                { $set: req.body }
            )

            res.status(200).json({
                status: 200,
                id: id,
                modifiedData: req.body,
                message: "Reservation updated successfully.",
            });
        } else if (currentResData.length === 0) {
            res.status(404).json({ status: 404, message: "Reservation not found." });
        } else if (seatBooked) {
            res.status(400).json({ status: 400, message: "Seat not available." });
        } else {
            res.status(404).json({ status: 404, message: "An unknown error has occurred." });
        }

        client.close();
        console.log("disconnected!")

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }
}


// deletes a specified reservation
// reservations can be deleted by adding id in params on Insomnia
const deleteReservation = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");
        console.log("connected!");

        const id = req.params.reservation;

        const currentResData = await db.collection("reservations").find({ id }).toArray();

        if (currentResData.length > 0) {

            const flight = currentResData[0].flight;
            
            const flightData = await db.collection("flights").findOne({ flight });

            const updatedSeats = flightData.seats.map((item) => {

                // POTENTIAL DELETED SEAT: currentResData[0].seat
                // Make the POTENTIAL DELETED SEAT available again
                if (item.id === currentResData[0].seat && !item.isAvailable) {
                    return {
                        ...item,
                        isAvailable: true,
                    }
                } else {
                    return {
                        ...item,
                    }
                }
            });
            await db.collection("flights").updateOne(
                { flight: flight },
                { $set: { seats: updatedSeats } }
            );
                
            //update reservation
                await db.collection("reservations").deleteOne(
                    { id: id },
                )


                res.status(200).json({
                    status: 200,
                    id: id,
                    data: currentResData,
                    message: "Reservation updated successfully.",
                });
        } else if (currentResData.length === 0) {
            res.status(404).json({ status: 404, message: "Reservation not found." });
        } else {
            res.status(404).json({ status: 404, message: "An unknown error has occurred." });
        }

        client.close();
        console.log("disconnected!")

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err });
    }
};

module.exports = {
    getFlights,
    getFlight,
    getReservations,
    addReservation,
    getSingleReservation,
    deleteReservation,
    updateReservation,
};