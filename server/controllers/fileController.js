const path = require('path');
const { UPLOAD_DIR } = require('../constants');
const { analyzeFile } = require('../utils/helper');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const filePath = path.join(UPLOAD_DIR, file.filename);

    const result = await analyzeFile(filePath);

    res.status(200).json({ message: 'File uploaded and analyzed successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const format = req.params.format;
    // Assuming the result is stored in the file system
    // Implement logic to generate the file in the requested format

    res.status(200).download(`/path/to/generated/file.${format}`);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file', error });
  }
};
