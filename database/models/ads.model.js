import { Schema, model } from "mongoose";

const adsSchema = new Schema({
          propertyType: {
                    type: String,
                    enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'],
                    required: true,
          },
          area: {
                    type: Number,
                    required: true,
          },
          price: {
                    type: Number,
                    required: true,
          },
          city: {
                    type: String,
                    required: true,
          },
          district: {
                    type: String,
                    required: true,

          },
          description: {
                    type: String,
                    required: true,

          },
          refreshedAt: {
                    type: Date,
                    default: Date.now, // Set default refresh date
          },
          createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                    required: true,
          }
}, { timestamps: true }
);

export const adsModel = model("ads", adsSchema);
