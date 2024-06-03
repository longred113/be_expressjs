import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { SendResponse } from '../service/success/success';
import sharp from 'sharp';
import multer, { Multer } from 'multer';
import { RestError } from '../service/error/error';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const UploadToCloudinary = async (files: Express.Multer.File[], res: Response): Promise<string[]> => {
    try {
        if (!files || files.length === 0) {
            new SendResponse({
                status: 'error',
                code: 400,
                message: 'No files uploaded'
            }).send(res);
            throw new Error('No files uploaded');
        }

        const cloudinaryUrls: string[] = [];

        for (const file of files) {
            const resizedBuffer: Buffer = await sharp(file.buffer)
                .resize({ width: 800, height: 600 })
                .toBuffer();

            const url = await new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'product_images',
                        resource_type: 'auto',
                    } as any,
                    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (error) {
                            reject(error);
                        } else if (!result) {
                            reject(new Error('Cloudinary upload result is undefined'));
                        } else {
                            resolve(result.secure_url as string);
                        }
                    }
                );
                uploadStream.end(resizedBuffer);
            });

            cloudinaryUrls.push(url);
        }

        return cloudinaryUrls;

    } catch (error) {
        RestError.manageServerError(res, error, false);
        throw error;
    }
}
