const trainData = require("./modal/user");

exports.coachSeatsFunction = async (numSeats) => {

    //coachSeats
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L'];
    const seatsPerRow = [7, 7, 7, 7, 7, 7, 7,7,7,7,7,3];
    var tableSeatFind = await trainData.find();
    // let numSeats = req.body.numSeats;
    let seatsBooked = 0;
    const seatsToBook = [];

    // Check if there are enough seats available in one row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const seats = seatsPerRow[i];
        let count = 0;

        for (let j = 1; j <= seats; j++) {
            const seat = `${row}${j}`;
            if (tableSeatFind[0].train[seat] == null) {
                count++;
                seatsToBook.push(seat);
                if (count == numSeats) {
                    console.log(count, numSeats, "444", seatsToBook)
                    let a = seatsToBook.sort()
                    let res = []
                    let t = ""
                    let temp = []
                    for (let i = 0; i < a.length; i++) {
                        if (a[i].charAt(0) == t) {
                            temp.push(a[i])
                        }
                        else {
                            temp = []
                            t = a[i].charAt(0)
                            temp.push(a[i])
                        }
                        res.push(temp)
                    }
                    let mainArray = Array.from(new Set(res));
                    for (let q = 0; q < mainArray.length; q++) {
                        if (mainArray[q]?.length >= numSeats) {
                            const doc = await trainData.findById({ _id: tableSeatFind[0]._id });
                            const train = doc.train
                            mainArray[q].forEach(async (r) => {
                                if (r) {
                                    train[r] = "booked";
                                }
                            });
                            return await trainData.updateOne({ _id: tableSeatFind[0]._id }, { $set: { train: train } })
                        }
                    }

                }

            }

        }

    }

}