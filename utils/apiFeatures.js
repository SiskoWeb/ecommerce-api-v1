class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString
    }

    filter() {

        //filtring
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryStringObj = { ...this.queryString }
        const excludesFields = ['page', 'sort', ' limit', 'fields']
        excludesFields.forEach((field) => delete queryStringObj[field])

        // apply filteration using [gte , gt , lte , lt]
        let queryStr = JSON.stringify(queryStringObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
        return this;

    }
}