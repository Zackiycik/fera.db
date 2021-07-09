class FeraError extends Error {
    /**
     * @param { String } message
     */
    constructor(message) {
        super(message)
        this.name = "FeraError"
    }
}
module.exports = FeraError;