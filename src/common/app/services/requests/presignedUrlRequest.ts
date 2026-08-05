export type GetPresignedUrlRequest = {
    contentType: string;
    fileSize: number;
}

export type UploadImageRequest = {
    url: string;
    image: File;
    contentType: string;
}