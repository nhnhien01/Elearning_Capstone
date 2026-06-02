import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    maDanhMuc: { type: String, required: true, unique: true },
    tenDanhMuc: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;