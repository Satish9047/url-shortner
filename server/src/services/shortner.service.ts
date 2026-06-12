export const shortenUrl = async (url: string) => {
    const shortCode = generateShortCode();
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
    await urlModel.saveUrlMapping(shortCode, url);
    return shortUrl; 
};