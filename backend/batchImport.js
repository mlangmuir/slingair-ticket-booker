const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { flights, reservations } = require("./data");

const batchImport = async (req, res)=> {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("slingair");

        console.log("connected!");

        const flightKeys = Object.keys(flights);

        const flightObj = flightKeys.map((item) => {
            return (
                {
                    flight: item,
                    seats: flights[item],
                }
            )
        })

        const flightsResult = await db.collection("flights").insertMany(flightObj);

        const reservationsResult = await db.collection("reservations").insertMany(reservations);


        console.log("Success: ", flightsResult, reservationsResult)

    } catch (err) {
        console.log("Error: ", err.stack);
    }

    client.close();
    console.log("disconnected!");
};

batchImport();