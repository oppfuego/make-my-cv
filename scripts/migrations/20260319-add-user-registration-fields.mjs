import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
}

const userSchema = new mongoose.Schema({}, { strict: false, collection: "users" });
const User = mongoose.models.MigrationUser || mongoose.model("MigrationUser", userSchema);

async function run() {
    await mongoose.connect(MONGODB_URI);

    const result = await User.updateMany(
        {
            $or: [
                { firstName: { $exists: false } },
                { lastName: { $exists: false } },
                { phoneNumber: { $exists: false } },
                { dateOfBirth: { $exists: false } },
                { street: { $exists: false } },
                { city: { $exists: false } },
                { country: { $exists: false } },
                { postCode: { $exists: false } },
            ],
        },
        [
            {
                $set: {
                    firstName: { $ifNull: ["$firstName", null] },
                    lastName: { $ifNull: ["$lastName", null] },
                    phoneNumber: { $ifNull: ["$phoneNumber", null] },
                    dateOfBirth: { $ifNull: ["$dateOfBirth", null] },
                    street: { $ifNull: ["$street", null] },
                    city: { $ifNull: ["$city", null] },
                    country: { $ifNull: ["$country", null] },
                    postCode: { $ifNull: ["$postCode", null] },
                },
            },
        ]
    );

    console.log(
        `User registration fields migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`
    );
}

run()
    .catch((error) => {
        console.error("Migration failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
