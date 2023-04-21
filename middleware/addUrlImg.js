class AddUrl {
    constructor(schema) {
        this.schema = schema
    }

    post(fileName) {

        this.schema.post('init', (doc) => {
            if (doc.image) {
                const imageUrl = `${process.env.BASE_URL}/${fileName}/${doc.image}`
                doc.image = imageUrl
            }

        });
        return this
    }

    save(fileName) {

        this.schema.post('save', (doc) => {
            if (doc.image) {
                const imageUrl = `${process.env.BASE_URL}/${fileName}/${doc.image}`
                doc.image = imageUrl
            }

        });
        return this
    }
}


module.exports = AddUrl;