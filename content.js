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
const preDefinedDrafts = [
  {
    "name": "Late to class",
    "body": "Dear Professor,\n\nI hope this email finds you well. I wanted to inform you that I will be arriving late to class tomorrow due to a prior commitment. I apologize for any inconvenience this may cause and will make sure to catch up on any missed material.\n\nThank you for your understanding.\n\nBest regards,\n[Your Name]",  
  },
  {
    "name": "Homework extension",
    "body": "Dear Professor,\n\nI hope you are doing well. I am writing to request an extension on the homework assignment due this Friday. Due to unforeseen circumstances, I have been unable to complete the assignment on time. I would greatly appreciate it if you could grant me an extension until next Monday.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]",
  },
  {
    "name": "Schedule meeting",
    "body": "Dear Professor,\n\nI hope this message finds you well. I would like to schedule a meeting with you to discuss my progress in the course and any areas where I can improve. Please let me know your availability for the upcoming week.\n\nThank you for your time and support.\n\nBest regards,\n[Your Name]",
  },
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

  // Dropdown button
  const generateDropdownButton = document.createElement('button')
  Object.assign(generateDropdownButton, {
    id: 'generateDropdownButton',
    type: 'button',
    role: 'button',
    'aria-expanded': 'false',
    'aria-haspopup': 'menu',
    className: 'fui-Button fui-MenuButton fui-SplitButton__menuButton',
    title: 'More options',
  })
  generateDropdownButton.innerHTML = '<span class="fui-MenuButton__menuIcon ___1gqzbv5 fwrc4pm f1ugzwwg fvblgha frx94fk"><i class="fui-Icon-font ___qaf4230 f14t3ns0 fne0op0 fmd4ok8 f303qgw f1sxfq9t" fill="currentColor" aria-hidden="true"></i></span>'
  generateDropdownButton.onclick = () => {
    // When I inspected a dropdown from the original UI, it created several nested divs with specific class names and
    // attributes. I'm replicating those to make sure it is styled correctly.
    let dropdownContainer1 = document.createElement('div')
    Object.assign(dropdownContainer1, {
      id: 'dropdownContainer',
      className: 'fui-FluentProvider fui-FluentProviderr63 ___1f74osn f19n0e5 f3rmtva fgusgyc fk6fouc fkhj508 figsok6 fytdu2e f1euv43f f15twtuk f1vgc2s3 f1e31b4d f494woh',
      'data-portal-node': 'true'
    })
    dropdownContainer1.addEventListener('click', () => {
      document.body.removeChild(document.querySelector('#dropdownContainer'))
    })

    let coordinates = document.querySelector('#generateDropdownButton').getBoundingClientRect()
    let dropdownContainer2 = document.createElement('div')
    Object.assign(dropdownContainer2, {
      role: 'presentation',
      'data-tabster': '{&quot;restorer&quot;:{&quot;type&quot;:0}}',
      className: 'fui-MenuPopover ___152dg9n ft85np5 fxugw4r f19n0e5 f1ewtqcl fl8fusi f1kaai3v f1p9o1ba f1ahpp82 f1hg901r fd3pd8h f9ggezi fk6fouc fkhj508 figsok6 f1i3iumi f18k4bn6 fo1kyvf fetxo7e f8x1vz1 f8g0anz fezwn9i fz5efge f1ydixl4 f8dgqj5 fnyfnr8 fgw77r4 f1noc5he fi19xcv f1mxk9aa ffzg62k',
      style: 'position: absolute; left: 0px; top: 0px; margin: 0px',
      transform: `translate3d(${coordinates.left}px, ${coordinates.bottom}px, 0px)`,
      'data-popper-placement': 'bottom-end',
      'data-popper-is-intersecting': '',
    })

    let dropdownContainer3 = document.createElement('div')
    Object.assign(dropdownContainer3, {
      role: 'menu',
      'aria-labelledby': 'menur64',
      'data-tabster': '{&quot;mover&quot;:{&quot;cyclic&quot;:true,&quot;direction&quot;:1,&quot;memorizeCurrent&quot;:true}}',
      className: 'fui-MenuList ___1cyqkw0 f22iagw f1vx9l62 f1t6b6ee f1l02sjl',
    })

    // For each of the example drafts, add it as a menu item
    preDefinedDrafts.forEach(draft => {
      let menuItem = document.createElement('div')
      Object.assign(menuItem, {
        role: 'menuitem',
        tabindex: '0',
        className: 'fui-MenuItem rfoezjv',
      })
      menuItem.innerHTML = `<span class="fui-MenuItem__content r1ls86vo">${draft.name}</span>`
      menuItem.onclick = async (e) => {
        e.stopPropagation()

        const composeArea = sendButtonToolbar.closest('#ReadingPaneContainerId')
        const emailBody = composeArea ? composeArea.querySelector('div[aria-label*="Message body"]') : null

        if (emailBody) {
          emailBody.innerHTML = 'Generating draft...'
          emailBody.innerHTML = draft.body
        } else {
          console.error('AI Assistant: Could not find the email body.')
        }
      }

      dropdownContainer3.appendChild(menuItem)
    })
    dropdownContainer2.appendChild(dropdownContainer3)
    dropdownContainer1.appendChild(dropdownContainer2)
    document.body.appendChild(dropdownContainer1)
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
