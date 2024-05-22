import { adsModel } from "../../../../database/models/ads.model.js";
import { propertyRequestModel } from "../../../../database/models/propertyRequest.model.js";
import { userModel } from "../../../../database/models/user.model.js";
import { getUserStats } from "../../../services/statistics.service.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


const adminGetStatistics = asyncHandler(async (req, res) => {
          const page = req.query.page || 1;
          const limit = req.query.limit || 10;
          const skip = (page - 1) * limit;
          const users = await userModel.find().skip(skip).limit(+limit).sort({ createdAt: -1 }).select('-password -__v ');
          const totalUsers = await userModel.countDocuments();
          const userStatistics = await Promise.all(users.map(async user => await getUserStats(user)));
          res.json({
                    data: userStatistics,
                    page: +page,
                    limit: +limit,
                    total: totalUsers,
                    hasNextPage: skip + userStatistics.length < totalUsers,
                    hasPreviousPage: page > 1
          });
})



export { adminGetStatistics }