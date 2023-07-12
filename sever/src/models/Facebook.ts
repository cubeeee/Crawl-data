import { Schema, model } from "mongoose";
import {  EStatus, IFacebook } from "../typing/typing";

const schema = new Schema<IFacebook>({
    name: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    birth: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: EStatus,
        default: EStatus.PENDING,
    },
    export: {
        type: Boolean,
        default: false,
    },
    isBirthday: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Facebook = model<IFacebook>("Facebook", schema);

export default Facebook;