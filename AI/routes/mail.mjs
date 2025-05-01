import express from 'express';
import { getMcpAgent } from '../services/mcpAgent.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing 'content' in request body." });
  }

  try {

    const startTime = Date.now(); // ✅ 시작 시간 기록
    const agent = await getMcpAgent();
    const response = await agent.invoke({
      messages: [{ role: "user", content }]
    });

    const endTime = Date.now(); // ✅ 끝 시간 기록
    const duration = endTime - startTime; // ✅ 경과 시간 계산

    console.log(`⏱️ MCP Agent 응답 시간: ${duration}ms`);

    res.json({ result: response });
  } catch (err) {
    console.error("MCP Agent invoke error:", err);
    res.status(500).json({ error: "Failed to process email." });
  }
});

export default router;
