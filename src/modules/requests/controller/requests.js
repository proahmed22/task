import { propertyRequestModel } from "../../../../database/models/propertyRequest.model.js";
import { ApiFeatures } from "../../../utils/ApiFeatures.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



const createPropertyRequest = asyncHandler(async (req, res) => {
          const { propertyType, area, price, city, district, description } = req.body;
          const property = new propertyRequestModel({
                    propertyType,
                    area,
                    price,
                    city, district,
                    description,
                    createdBy: req.user._id
          });
          await property.save();
          return res.status(200).json({ message: "Property created successfully", property });
})

const getAllPropertyRequests = asyncHandler(async (req, res) => {
          const page = req.query.page || 1;
          const limit = req.query.limit || 10;

          // Build query
          let query = propertyRequestModel.find().populate('createdBy', 'name phone');

          const apiFeatures = new ApiFeatures(query, req.query)
                    .filter()
                    .search();


          query = apiFeatures.mongooseQuery
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({ createdAt: -1 });

          const propertyRequests = await query;
          const totalPropertyRequests = await propertyRequestModel.countDocuments(apiFeatures.mongooseQuery.getFilter());

          res.status(200).json({
                    message: 'Success',
                    data: propertyRequests,
                    page,
                    limit,
                    total: totalPropertyRequests,
                    hasNextPage: (page * limit) < totalPropertyRequests,
                    hasPreviousPage: page > 1
          });
});

const getSpecificPropertyRequest = asyncHandler(async (req, res, next) => {
          const { id } = req.params
          const property = await propertyRequestModel.findById(id).populate('createdBy', 'name phone');
          !property && next(new AppError('property request not found', 404))
          res.status(200).json({ message: 'Success', property })
})
const updatePropertyRequest = asyncHandler(async (req, res) => {
          const { id } = req.params;
          const { description, area, price } = req.body;
          const property = await propertyRequestModel.findByIdAndUpdate(id, { description, area, price }, { new: true })
          if (property.id.createdBy.toString() !== req.user._id.toString()) {
                    return next(new AppError('You are not allowed to delete this property', 403))
          }
          !property && next(new AppError('property request not found', 404))
          property && res.status(200).json({ message: 'property request updated successfully' })
})


const deletePropertyRequest = asyncHandler(async (req, res) => {
          const { id } = req.params;
          const property = await propertyRequestModel.findByIdAndDelete(id)
          if (property.id.createdBy.toString() !== req.user._id.toString()) {
                    return next(new AppError('You are not allowed to delete this property', 403))
          }
          !property && next(new AppError('property request not found', 404))
          property && res.status(200).json({ message: 'property request deleted successfully' })
})

const refreshPropertyRequests = async () => {
          try {
                    await propertyRequestModel.updateMany({},
                              { $set: { refreshedAt: new Date() } }
                    )
                    console.log('Property requests refreshed successfully')
          } catch (error) {
                    console.log(error)
          }
}


export {
          createPropertyRequest,
          getSpecificPropertyRequest,
          updatePropertyRequest,
          deletePropertyRequest,
          getAllPropertyRequests,
          refreshPropertyRequests
}