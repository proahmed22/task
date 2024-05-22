// Import necessary modules and models
import { ApiFeatures } from '../../../utils/ApiFeatures.js';
import { AppError, asyncHandler } from '../../../utils/errorHandling.js';
import { adsModel } from './../../../../database/models/ads.model.js';
import { propertyRequestModel } from './../../../../database/models/propertyRequest.model.js';



const createNewAd = asyncHandler(async (req, res, next) => {
  const { propertyType, area, price, city, district, description } = req.body
  const ad = new adsModel({
    propertyType,
    area,
    price,
    city,
    district,
    description,
    createdBy: req.user._id
  });
  await ad.save();
  res.status(201).json({ message: 'Ad created successfully', ad });
})

const matchAd = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const ad = await adsModel.findById(id);
  if (!ad) {
    return next(new AppError('Ad not found', 404));
  }

  const priceTolerance = 0.1; // 10%
  const lowerPriceBound = ad.price * (1 - priceTolerance);
  const upperPriceBound = ad.price * (1 + priceTolerance);

  const baseQuery = propertyRequestModel.find({
    district: ad.district,
    price: { $gte: lowerPriceBound, $lte: upperPriceBound },
    area: ad.area
  });

  const apiFeatures = new ApiFeatures(baseQuery, req.query)
    .filter()
    .search();

  const pipeline = [
    { $match: apiFeatures.mongooseQuery.getFilter() },
    { $sort: { refreshedAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    { $lookup: { from: 'user', localField: 'createdBy', foreignField: '_id', as: 'user' } },
  ];

  const matchedRequests = await propertyRequestModel.aggregate(pipeline);

  res.status(200).json({
    message: 'Success',
    page,
    limit,
    total: matchedRequests.length,
    data: matchedRequests,
  });
});




const getAllAds = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const ads = await adsModel.find().skip((page - 1) * limit).limit(+limit).sort({ createdAt: -1 }).populate('createdBy', 'name phone');
  const totalAds = await adsModel.countDocuments();
  res.status(200).json({
    "message": "Success",
    data: ads,
    page: +page,
    limit: +limit,
    total: totalAds,
    hasNextPage: (page * limit) < totalAds,
    hasPreviousPage: page > 1
  });
})


const getSpecificAd = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const ad = await adsModel.findById(id).populate('createdBy', 'name phone');
  !ad && next(new AppError('Ad not found', 404))
  res.status(200).json({ message: 'Success', ad })
})

const updateAd = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { description, area, price } = req.body
  const ad = await adsModel.findByIdAndUpdate(id, { description, area, price }, { new: true })
  if (ad.id.createdBy.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not allowed to delete this ad', 403))
  }
  !ad && next(new AppError('Ad not found', 404))
  ad && res.status(200).json({ message: 'Ad deleted successfully' })
})

const deleteAd = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const ad = await adsModel.findByIdAndDelete(id)
  if (ad.id.createdBy.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not allowed to delete this ad', 403))
  }
  !ad && next(new AppError('Ad not found', 404))
  ad && res.status(200).json({ message: 'Ad deleted successfully' })
})








export {
  createNewAd,
  matchAd,
  getAllAds,
  updateAd,
  getSpecificAd,
  deleteAd

};
