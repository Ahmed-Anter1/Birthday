import Media from '../models/Media.js';
import cloudinary from '../config/cloudinary.js';

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: req.file.mimetype.startsWith('image')
            ? 'image'
            : 'video',
          folder: 'birthday-website'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const media = await Media.create({
      type: uploadResult.resource_type,
      filename: uploadResult.public_id,
      originalName: req.file.originalname,
      path: uploadResult.secure_url, // 👈 رابط Cloudinary
      size: req.file.size,
      uploadedBy: req.user._id
    });

    res.status(201).json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
};


export const getAllMedia = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type, isVisible: true } : { isVisible: true };
    const media = await Media.find(filter).populate('uploadedBy', 'username').sort('-createdAt');
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Not found' });

await cloudinary.uploader.destroy(media.filename, {
  resource_type: media.type
});


    await media.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleVisibility = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Not found' });
    media.isVisible = !media.isVisible;
    await media.save();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};