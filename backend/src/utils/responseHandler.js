export const responseHandler = {
  success: (res, data = null, message = 'Xử lý yêu cầu thành công!', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      content: data,
      timestamp: new Date().toISOString()
    });
  },

  error: (res, message = 'Đã xảy ra lỗi hệ thống!', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }
};

export default responseHandler;