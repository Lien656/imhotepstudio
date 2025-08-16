<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>A.I.R — Eternal</title>
  <link rel="stylesheet" href="eternal.css">
  <link rel="preload" href="fonts/MagistralC Bold.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <div class="chat-container">
    <div id="chat"></div>
    <div class="input-area">
      <textarea id="userInput" placeholder="Напиши..."></textarea>
      <button onclick="sendMessage()">➤</button>
    </div>
  </div>
  <script src="memory/memory.js"></script>
  <script src="memory/memory_live.js"></script>
  <script src="eir_core.js"></script>
</body>
</html>
