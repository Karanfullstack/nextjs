import mongoose, {Connection} from "mongoose";
const {MONGO_URI} = process.env;

if (!MONGO_URI) {
	throw new Error("Lack of MONGO_URI");
}
// Pool connection
let cachedConnection: Connection | null = null;
export const DB_CONNECTION = async (): Promise<Connection> => {
	if (cachedConnection) {
		console.log("cached connection");
		return cachedConnection;
	}
	const DB = await mongoose.connect(MONGO_URI as string);
	cachedConnection = DB.connection; // mongoose.connection
	console.log("first connection");
	return DB.connection;
};
