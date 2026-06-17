// js/ai.js
// AI Assistant - Tambahkan API key Anda

const AI_API_KEY = ""; // ← ISI API KEY ANDA DI SINI

/* Tanya AI */
window.askAI = async function(prompt) {
  if (!AI_API_KEY) {
    alert('API key belum diatur!Hubungi admin untuk konfigurasi.');
    return;
  }

  if (!prompt) {
    alert('Tulis pertanyaan!');
    return;
  }

  const btn = document.querySelector('button');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '🤔 Memikirkan...';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Kamu adalah AI Assistant untuk FahriXZ Store. Jawab dalam bahasa Indonesia.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    
    const resultDiv = document.getElementById('aiResult');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="ai-response">${answer}</div>`;
    }
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Kirim';
    }
  }
};

console.log("✅ AI.js loaded!");