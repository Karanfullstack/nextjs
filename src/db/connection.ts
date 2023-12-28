import mongoose, {Connection} from "mongoose";
const {MONGO_URI} = process.env;

if (!MONGO_URI) {
	throw new Error("Lack of MONGO_URI");
}
// Pool connection
let cachedConnection: Connection | null = null;
export const dbConnection = async (): Promise<Connection> => {
	if (cachedConnection) {
		console.log("cahced connection");
		return cachedConnection;
	}
	const connection = await mongoose.connect(MONGO_URI as string);
	cachedConnection = connection.connection; // mongoose.connection
	console.log("first connection");
	return connection.connection;
};
