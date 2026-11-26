export const uploadImage = async (file: File): Promise<string> => {
    const body = new FormData();
    body.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/upload-image`, {
        method: "POST",
        body,
    });

    const data: { url?: string; message?: string } = await res.json();

    if (!res.ok || !data.url) {
        throw new Error(data.message || "Image upload failed");
    }

    return data.url;
};