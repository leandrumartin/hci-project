console.log("AI Email Assistant loaded.");

// Sample responses
const sampleRecipients = [
  "John.Doe@example.com",
  "Jane.Doe@example.com",
  "Professor.Smith@example.com",
]
const sampleSubjects = [
  "Upcoming Meeting",
  "Project Timeline",
  "Homework Question",
]
const sampleBodies = [
  "I want to schedule a meeting sometime soon to discuss the project we're working on. When are you available in the next week?",
  "I hope this email finds you well. I wanted to follow up on our previous conversation regarding the project timeline. Please let me know if there are any updates.",
  "I have a question about the upcoming assignment due Friday. What is the length requirement for the written portion?",
]

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

  // Generate Draft button
  const generateSplitButton = document.createElement('div')
  Object.assign(generateSplitButton, {
    className: 'fui-SplitButton',
  })

  const generateButton = document.createElement('button')
  Object.assign(generateButton, {
    type: 'button',
    role: 'button',
    innerText: 'Generate Draft',
    className: 'ai-button primary fui-Button fui-SplitButton__primaryActionButton',
    title: 'Generate email draft using AI',
  })
  generateButton.onclick = async (e) => {
    e.stopPropagation()

    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const emailBody = composeArea ? composeArea.querySelector('div[aria-label*="Message body"]') : null
    const subjectInput = document ? composeArea.querySelector('input[aria-label*="Subject"]') : null
    const recipientInput = document ? composeArea.querySelector('div[aria-label*="To"]') : null
    
    if (emailBody) {
      emailBody.innerHTML = 'Generating draft...'
      const prompt = 'Write a professional email requesting an extension for an assignment.'
      try {
        emailBody.innerHTML = await getChatGPTSuggestion(prompt)
      } catch (error) {
        let bodyText = sampleBodies[Math.floor(Math.random() * sampleBodies.length)]

        // Generate sample body based on subject or recipient
        let subjectIndex = sampleSubjects.indexOf(subjectInput ? subjectInput.value : "")
        let recipientIndex = sampleRecipients.indexOf(recipientInput ? recipientInput.innerHTML : "")
        if (subjectIndex !== -1) {
          bodyText = sampleBodies[subjectIndex]
        } else if (recipientIndex !== -1) {
          bodyText = sampleBodies[recipientIndex]
        }

        emailBody.innerHTML = bodyText
      }
    } else {
      console.error('AI Assistant: Could not find the email body.')
    }
  }

  const generateDropdownButton = document.createElement('button')
  Object.assign(generateDropdownButton, {
    type: 'button',
    role: 'button',
    'aria-expanded': 'false',
    'aria-haspopup': 'menu',
    className: 'fui-Button fui-MenuButton fui-SplitButton__menuButton',
    title: 'More options',
  })
  generateDropdownButton.innerHTML = '<span class="fui-MenuButton__menuIcon ___1gqzbv5 fwrc4pm f1ugzwwg fvblgha frx94fk"><i class="fui-Icon-font ___qaf4230 f14t3ns0 fne0op0 fmd4ok8 f303qgw f1sxfq9t" fill="currentColor" aria-hidden="true"></i></span>'
  generateDropdownButton.onclick = (e) => {
    let coordinates = generateDropdownButton.getBoundingClientRect()
    let dropdown = document.createElement('div')
    Object.assign(dropdown, {
      role: 'presentation',
      className: 'fui-MenuPopover',
      style: `position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate3d(${coordinates.left}px, ${coordinates.bottom}px, 0px);`
    })
    document.body.appendChild(dropdown)
  }


  //subject
  const subjectButton = document.createElement('button')
  Object.assign(subjectButton, {
    type: 'button',
    role: 'button',
    innerText: 'Suggest Subject',
    className: 'ai-button secondary',
    title: 'Suggest a subject using AI based on your email content',
  })
  subjectButton.onclick = async (e) => {
    e.stopPropagation()
    
    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const emailBody = composeArea ? composeArea.querySelector('div[aria-label*="Message body"]') : null
    const subjectInput = document ? composeArea.querySelector('input[aria-label*="Subject"]') : null
    const recipientInput = document ? composeArea.querySelector('div[aria-label*="To"]') : null
    
    if (subjectInput) {
      subjectInput.value = 'Generating subject...'
      const prompt = 'Suggest a concise and clear subject line for an email requesting an assignment extension.'
      try {
        subjectInput.value = await getChatGPTSuggestion(prompt)
      } catch (error) {
        let subjectText = sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)]

        // Generate sample subject based on body text or recipient
        let bodyIndex = sampleBodies.indexOf(emailBody ? emailBody.innerHTML : "")
        let recipientIndex = sampleRecipients.indexOf(recipientInput ? recipientInput.innerHTML : "")
        if (bodyIndex !== -1) {
          subjectText = sampleSubjects[bodyIndex]
        } else if (recipientIndex !== -1) {
          subjectText = sampleSubjects[recipientIndex]
        }

        subjectInput.value = subjectText
      }
    } else {
      console.error('AI Assistant: Could not find the subject input.')
    }
  }

  //receiver
  const recipientButton = document.createElement('button')
  Object.assign(recipientButton, {
    type: 'button',
    role: 'button',
    innerText: 'Suggest Recipients',
    className: 'ai-button secondary',
    title: 'Suggest recipients using AI based on your email content',
  })
  recipientButton.onclick = async (e) => {
    e.stopPropagation()
    
    const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
    const emailBody = composeArea ? composeArea.querySelector('div[aria-label*="Message body"]') : null
    const subjectInput = document ? composeArea.querySelector('input[aria-label*="Subject"]') : null
    const recipientInput = document ? composeArea.querySelector('div[aria-label*="To"]') : null
    
    if (recipientInput) {
      recipientInput.innerHTML = 'Generating recipients...'
      const prompt = 'Suggest recipients for an email requesting an assignment extension.'
      try {
        recipientInput.innerHTML = await getChatGPTSuggestion(prompt)
      } catch (error) {
        let recipientText = sampleRecipients[Math.floor(Math.random() * sampleRecipients.length)]

        // Generate sample recipient based on body text or subject
        let bodyIndex = sampleBodies.indexOf(emailBody ? emailBody.innerHTML : "")
        let subjectIndex = sampleSubjects.indexOf(subjectInput ? subjectInput.value : "")
        if (bodyIndex !== -1) {
          recipientText = sampleRecipients[bodyIndex]
        } else if (subjectIndex !== -1) {
          recipientText = sampleRecipients[subjectIndex]
        }

        recipientInput.innerHTML = recipientText
      }
    } else {
      console.error('AI Assistant: Could not find the recipient input.')
    }
  }

  generateSplitButton.appendChild(generateButton)
  generateSplitButton.appendChild(generateDropdownButton)
  buttonContainer.appendChild(generateSplitButton)
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
