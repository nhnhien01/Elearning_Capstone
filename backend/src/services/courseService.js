import Course from '../models/courseModel.js'; 

export const courseService = {

  getAll: async () => {
    return await Course.find();
  },

  getByCategory: async (maDanhMuc) => {
    return await Course.find({ maDanhMuc });
  },

  getPerPage: async (page, pageSize, tenKhoaHoc) => {
    const query = tenKhoaHoc ? { tenKhoaHoc: { $regex: tenKhoaHoc, $options: 'i' } } : {};
    
    const totalCount = await Course.countDocuments(query);
    const items = await Course.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      currentPage: page,
      count: items.length,
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount,
      items
    };
  },

  getDetailAndIncrementView: async (maKhoaHoc) => {
    const course = await Course.findOne({ maKhoaHoc });
    if (!course) return null;

    course.luotXem += 1;
    await course.save();
    return course;
  },

  create: async (courseData) => {
    const courseExists = await Course.findOne({ maKhoaHoc: courseData.maKhoaHoc });
    if (courseExists) throw new Error('Mã khóa học này đã tồn tại trên hệ thống!');

    return await Course.create(courseData);
  },

  update: async (maKhoaHoc, updateData) => {
    return await Course.findOneAndUpdate({ maKhoaHoc }, updateData, { new: true });
  },

  delete: async (maKhoaHoc) => {
    return await Course.findOneAndDelete({ maKhoaHoc });
  }
};
export default courseService;