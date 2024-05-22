import { adsModel } from "../../database/models/ads.model.js";
import { propertyRequestModel } from "../../database/models/propertyRequest.model.js";

export const getUserStats = async (user) => {
          const adsCount = await adsModel.countDocuments({ createdBy: user._id });
          const totalAdsAmount = await getTotalAmount(adsModel, user._id);

          const requestsCount = await propertyRequestModel.countDocuments({ createdBy: user._id });
          const totalRequestsAmount = await getTotalAmount(propertyRequestModel, user._id);

          return {
                    name: user.name,
                    role: user.role,
                    adsCount,
                    totalAdsAmount,
                    requestsCount,
                    totalRequestsAmount,
                    ...user.toObject()
          };
};

const getTotalAmount = async (model, userId) => {
          const result = await model.aggregate([
                    { $match: { createdBy: userId } },
                    { $group: { _id: null, total: { $sum: '$price' } } }
          ]);

          return result[0] ? result[0].total : 0;
};
