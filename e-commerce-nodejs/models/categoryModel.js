const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        unique:true
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
