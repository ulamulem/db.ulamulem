import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Allow only POST requests
  try {

    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    // Set up headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Extract POST data
    const { appId = '129731987ksjdhjk' } = req.query;
    const username = req.body.username || 'unknown';
    const message = req.body.message || 'no message';
    const date = new Date().toISOString();
  
    // Define file path
 
    const construction = getStore("ulamulem.com.db");
    const objectData = construction.get(appId)

    let data = [];

    if (objectData.data) {
      data = objectData.data;
    } else {
      await construction.setJSON(appId, { appId, data: [] });
    }
  
    // Add the new submitted data
    const submitedData = { username, message, date };
    data.push(submitedData);
  
    await construction.setJSON(appId, { appId, data });
  
    // Respond with the newly submitted data
    return res.status(200).json({ data: submitedData });
  }catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
