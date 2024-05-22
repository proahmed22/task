export class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    filter() {
        let filterObj = { ...this.queryString }
        const excludeQuery = ['page', 'keyword', 'sort', 'fields']
        excludeQuery.forEach((q) => {
            delete filterObj[q]
        })

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte|lt)\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this;

    }

    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find(
                {
                    $or: [
                        { propertyType: { $regex: this.queryString.keyword, $options: 'i' } },
                        { city: { $regex: this.queryString.keyword, $options: 'i' } },
                        { district: { $regex: this.queryString.keyword, $options: 'i' } },
                        { price: { $regex: this.queryString.keyword, $options: 'i' } },
                        { area: { $regex: this.queryString.keyword, $options: 'i' } },
                        { description: { $regex: this.queryString.keyword, $options: 'i' } }

                    ]
                }
            )
        }
        return this
    }



}

