console.log("AI Email Assistant loaded.");

// Sample responses
const sample_recipient = "John.Doe@example.com"
const sample_subject = "Upcoming Meeting"
const sample_body = "I want to schedule a meeting sometime soon to discuss the project we're working on. When are you available in the next week?"

//API key
const OPENAI_API_KEY = "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";

//to call ChatGPT API
async function getChatGPTSuggestion(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

function findAndInject() {
  const sendButtonToolbar = document.querySelector(':has(> div[data-testid="ComposeSendButton"])')
  if (!sendButtonToolbar) {
    console.log('Send button toolbar not found yet.')
    return
  }

  if (sendButtonToolbar.querySelector('.ai-button-container')) return

  console.log('Send button toolbar found. Injecting AI buttons...')
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'ai-button-container'
  buttonContainer.style.display = 'flex'
  buttonContainer.style.alignItems = 'center'
  buttonContainer.style.gap = '8px'

  //generate draft
  const generateButton = document.createElement('button')
  generateButton.innerText = 'Generate Draft'
  generateButton.className = 'ai-button primary'
  generateButton.onclick = async (e) => {
    e.stopPropagation()
    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const emailBody = composeArea ? composeArea.querySelector('[id*="editorParent"]') : null
    if (emailBody) {
      emailBody.innerHTML = 'Generating draft...'
      const prompt = 'Write a professional email requesting an extension for an assignment.'
      try {
        emailBody.innerHTML = await getChatGPTSuggestion(prompt)
      } catch (error) {
        emailBody.innerHTML = sample_body
      }
    } else {
      console.error('AI Assistant: Could not find the email body.')
    }
  }

  //subject
  const subjectButton = document.createElement('button')
  subjectButton.innerText = 'Suggest Subject'
  subjectButton.className = 'ai-button secondary'
  subjectButton.onclick = async (e) => {
    e.stopPropagation()
    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const subjectInput = document ? composeArea.querySelector('input[aria-label*="Subject"]') : null
    if (subjectInput) {
      subjectInput.value = 'Generating subject...'
      const prompt = 'Suggest a concise and clear subject line for an email requesting an assignment extension.'
      try {
        subjectInput.value = await getChatGPTSuggestion(prompt)
      } catch (error) {
        subjectInput.value = sample_subject
      }
    } else {
      console.error('AI Assistant: Could not find the subject input.')
    }
  }

  //receiver
  const recipientButton = document.createElement('button')
  recipientButton.innerText = 'Suggest Recipients'
  recipientButton.className = 'ai-button secondary'
  recipientButton.onclick = async (e) => {
    e.stopPropagation()
    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const recipientInput = document ? composeArea.querySelector('div[aria-label*="To"]') : null
    if (recipientInput) {
      recipientInput.innerHTML = 'Generating recipients...'
      const prompt = 'Suggest recipients for an email requesting an assignment extension.'
      try {
        recipientInput.innerHTML = await getChatGPTSuggestion(prompt)
      } catch (error) {
        recipientInput.innerHTML = sample_recipient
      }
    } else {
      console.error('AI Assistant: Could not find the recipient input.')
    }
  }

  buttonContainer.appendChild(generateButton)
  buttonContainer.appendChild(subjectButton)
  buttonContainer.appendChild(recipientButton)

  const discardButton = sendButtonToolbar.querySelector('button[aria-label*="Discard"]')
  if (discardButton) {
    discardButton.parentNode.insertBefore(buttonContainer, discardButton)
  } else {
    sendButtonToolbar.appendChild(buttonContainer)
  }
  console.log('AI buttons successfully injected.')
}

// Run the injection logic repeatedly for dynamic pages
setInterval(findAndInject, 1000);
