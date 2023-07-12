import { Schema, model } from "mongoose";
import { IProxy } from "../typing/typing";

const schema = new Schema<IProxy>({
    ip: {
        type: String,
    },
    port: {
        type: Number,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    host: {
        type: String,
        default: "",
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Proxy = model<IProxy>("Proxy", schema);

export default Proxy;