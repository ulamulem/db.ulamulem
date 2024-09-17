import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Set up headers for CORS
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Get the appId from query parameters, default to "129731987ksjdhjk" if not provided
  const { appId = '129731987ksjdhjk' } = req.query;

  // Define file path for the appId.json file
  const dir = path.resolve('./public/file');
  const filePath = path.join(dir, `${appId}.json`);

  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let data = [];

  // Check if the file exists, if it does, read its content
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(rawData || '[]'); // Fallback to empty array if rawData is empty
  } else {
    // If the file doesn't exist, create a new empty JSON file
    fs.writeFileSync(filePath, '[]');
  }

  // Return the data as JSON response
  res.status(200).json({ data });
}
