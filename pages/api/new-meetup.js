const handler = (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        const {title, image, address, description} = data;
        return data;
    }
};

export default handler;