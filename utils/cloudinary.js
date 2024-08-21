const cloudinary = require('cloudinary').v2;

  // Configuration
  cloudinary.config({ 
    cloud_name: 'dappliafh', 
    api_key: '327975495239918', 
    api_secret: 'kUXI-GEDuzGLue0MXgnw68zqdyQ' // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;