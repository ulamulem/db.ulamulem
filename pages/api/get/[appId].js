import fs from 'fs';
import path from 'path';
import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
    // Set CORS headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { appId = '129731987ksjdhjk' } = req.query;


    const construction = getStore("ulamulem.com.db");
    const objectData = construction.get(appId)

    let data = [];

    if (objectData.data) {
      data = objectData.data;
    } else {
      await construction.setJSON(appId, { appId, data: [] });
    }
    // Send success response
    res.status(200).json({ data });
  } catch (error) {
    // Log and send error response
    console.error('Error while handling the request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
