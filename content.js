console.log("AI Email Assistant loaded.");

const emailKeywordMap = [
  {
    keywords: ["shift", "schedule", "availability"],
    subjectMatch: "Shift Change Request",
    bodyMatchIndex: 0
  },
  {
    keywords: ["availability", "update", "work hours"],
    subjectMatch: "Updated Work Availability",
    bodyMatchIndex: 1
  },
  {
    keywords: ["lab", "access", "cyber", "security"],
    subjectMatch: "Request for Lab Access",
    bodyMatchIndex: 2
  },
  {
    keywords: ["report", "daily", "progress"],
    subjectMatch: "Daily Work Report",
    bodyMatchIndex: 3
  },
  {
    keywords: ["time off", "leave", "vacation"],
    subjectMatch: "Request for Time Off",
    bodyMatchIndex: 4
  },
  {
    keywords: ["requirements", "document", "update"],
    subjectMatch: "Updated Requirements Document",
    bodyMatchIndex: 5
  },
  {
    keywords: ["reservation", "guest", "hotel"],
    subjectMatch: "Guest Reservation Confirmation",
    bodyMatchIndex: 6
  },
  {
    keywords: ["event", "details", "assignment"],
    subjectMatch: "Request for Event Details",
    bodyMatchIndex: 7
  },
  {
    keywords: ["iss", "letter", "immigration"],
    subjectMatch: "Request for Confirmation Letter",
    bodyMatchIndex: 8
  },
  {
    keywords: ["order", "supplies", "list"],
    subjectMatch: "Weekly Ordering List",
    bodyMatchIndex: 9
  }
];

function findBestEmailMatch(text) {
  text = text.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  emailKeywordMap.forEach(entry => {
    let score = 0;

    entry.keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) score++;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  });

  return bestMatch;
}

// Sample responses
const sampleRecipients = [
  "supervisor@simonrec.slu.edu",
  "itsecurity@webster.edu",
  "manager@cvs.com",
  "engineering.ops@boeing.com",
  "frontdesk@qualityinn.com",
  "iss@slu.edu",
  "event.coordinator@chaifetzarena.com",
  "kitchen.manager@slu.edu",
  "cyberlab.admin@webster.edu",
  "shiftlead@simonrec.slu.edu"
];

const sampleSubjects = [
  "Shift Change Request",
  "Updated Work Availability",
  "Request for Lab Access",
  "Daily Work Report",
  "Request for Time Off",
  "Updated Requirements Document",
  "Guest Reservation Confirmation",
  "Request for Event Details",
  "Request for Confirmation Letter",
  "Weekly Ordering List"
];

const sampleBodies = [
  "Dear Supervisor,\n\nI hope you are doing well. I wanted to inform you that I will not be able to make my scheduled shift today due to a class-related conflict. Please let me know if I should arrange coverage or follow any procedures.\n\nThank you for your understanding.\n\nBest regards,\n[Your Name]",

  "Hello,\n\nI wanted to share my updated availability for this week. Please let me know if any adjustments are required.\n\nThank you,\n[Your Name]",

  "Hi,\n\nCould I please be granted access to the cybersecurity lab this week? I am working on an experiment and need access to complete my tasks.\n\nThank you,\n[Your Name]",

  "Hello,\n\nHere is my completed work for today. Please let me know if anything requires revision or further detail.\n\nThank you,\n[Your Name]",

  "Hi,\n\nI would like to request time off on [date]. Please let me know if this request can be approved or if additional information is needed.\n\nThank you,\n[Your Name]",

  "Dear Team,\n\nI have attached the updated requirements document. Please review and let me know if any modifications are necessary.\n\nBest regards,\n[Your Name]",

  "Hello,\n\nCould you please confirm the guest’s reservation details for tonight? I want to ensure everything is prepared properly.\n\nThank you,\n[Your Name]",

  "Hi,\n\nCould you please share the details for today’s event? I need to confirm my assigned responsibilities.\n\nThank you,\n[Your Name]",

  "Dear ISS Team,\n\nI would like to request a confirmation letter for immigration purposes. Please let me know the required process or any documents needed.\n\nThank you,\n[Your Name]",

  "Hello,\n\nHere is the list of items needed for next week’s meals and events. Let me know if any changes are required.\n\nThank you,\n[Your Name]"
];

const preDefinedDrafts = [
  {
    name: "Request Extension",
    subject: "Request for Assignment Extension",
    body:
      "Dear Professor,\n\nI hope you are doing well. I am writing to respectfully request a short extension for the upcoming assignment due on [date]. Due to unexpected circumstances, I have been unable to complete it on time. I would greatly appreciate an extension of a few days if possible.\n\nThank you for your understanding.\n\nSincerely,\nSmit Patel"
  },
  {
    name: "Schedule Meeting",
    subject: "Request to Schedule a Meeting",
    body:
      "Dear Professor,\n\nI hope this message finds you well. I would like to request a meeting to discuss my progress in the course and clarify a few questions I have. Please let me know your availability in the upcoming week.\n\nThank you for your time.\n\nBest regards,\n\nLeandru Martin"
  },
  {
    name: "Clarify Assignment",
    subject: "Clarification Needed on Assignment Instructions",
    body:
      "Dear Professor,\n\nI hope you are doing well. I am reaching out for clarification regarding the instructions for the assignment due on [date]. Could you please confirm the expected structure and any specific formatting requirements?\n\nThank you for your guidance.\n\nSincerely,\n\nSmit Patel"
  },
  {
    name: "Class Absence",
    subject: "Notification of Class Absence",
    body:
      "Dear Professor,\n\nI hope this email finds you well. I wanted to inform you that I will be unable to attend class on [date] due to personal reasons. I will review the material covered and ensure that I stay up to date.\n\nThank you for your understanding.\n\nBest regards,\n\nLeandru Martin"
  },
  {
    name: "Office Hours Request",
    subject: "Office Hours Appointment Request",
    body:
      "Dear Professor,\n\nI hope you are doing well. I would like to request a brief appointment during your office hours to go over some questions I have about the recent lecture topics. Please let me know a suitable time.\n\nThank you for your support.\n\nSincerely,\n\nSmit Patel"
  },
  {
    name: "Follow-Up Email",
    subject: "Follow-Up on Previous Email",
    body:
      "Dear Professor,\n\nI hope you are doing well. I am writing to follow up on the email I sent on [date] regarding [topic]. I understand that you have a busy schedule, but I wanted to ensure my message reached you.\n\nThank you for your time.\n\nBest regards,\n\nLeandru Martin"
  }
];



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

async function typeWriterEffect(element, text, speed = 10) {
  element.innerHTML = "";
  let i = 0;

  function typeLetter() {
    if (i < text.length) {
      if (text[i] === "\n") {
        element.innerHTML += "<br>";
      } else {
        element.innerHTML += text[i];
      }
      i++;
      setTimeout(typeLetter, speed);
    }
  }
  typeLetter();
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
    className: 'fui-SplitButton ___1ro086q ftuwxu6 fsxf2b5 f10pi13n fmrv4ls f14uur2j fye5tvs f1e8brtx fxp12j1 fr7y8no f1b65x5h f4rm5b0 fdwdeeo fckzjn8 ff0tx2l f3jppgx f96h41g f4xeytr',
  })

  const generateButton = document.createElement('button')
  Object.assign(generateButton, {
    type: 'button',
    role: 'button',
    innerText: 'Generate Draft',
    className: 'ai-button fui-Button r1alrhcs fui-SplitButton__primaryActionButton EOi57 ___t5c72m0 ffp7eso f1p3nwhy f11589ue f1q5o8ev f1pdflbu f1phragk f15wkkf3 f1s2uweq fr80ssc f1ukrpxl fecsdlb f1rq72xc fnp9lpt f1h0usnq fs4ktlq f16h9ulv fx2bmrt f1d6v5y2 f1rirnrt f1uu00uk fkvaka8 f1ux7til f9a0qzu f1lkg8j3 fkc42ay fq7113v ff1wgvm fiob0tu f1j6scgf f1x4h75k f4xjyn1 fbgcvur f1ks1yx8 f1o6qegi fcnxywj fmxjhhp f9ddjv3 f17t0x8g f194v5ow f1qgg65p fk7jm04 fhgccpy f32wu9k fu5nqqq f13prjl2 f1czftr5 f1nl83rv f12k37oa fr96u23 f1x37qnr fn4c73s',
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
        const aiResponse = await getChatGPTSuggestion(prompt);
        typeWriterEffect(emailBody, aiResponse);
      } catch (error) {
        let combinedText = (subjectInput?.value || "") + " " + (recipientInput?.innerText || "");

        const match = findBestEmailMatch(combinedText);

        let bodyText;
        if (match) {
          bodyText = sampleBodies[match.bodyMatchIndex];
          subjectInput.value = match.subjectMatch;
          subjectInput.dispatchEvent(new Event("input", { bubbles: true }));
          subjectInput.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          bodyText = sampleBodies[Math.floor(Math.random() * sampleBodies.length)];
        }

        typeWriterEffect(emailBody, bodyText);
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
    className: 'fui-Button r1alrhcs fui-MenuButton fui-SplitButton__menuButton ___136d5ro ffp7eso f1p3nwhy f11589ue f1q5o8ev f1pdflbu f1phragk f15wkkf3 f1s2uweq fr80ssc f1ukrpxl fecsdlb f1rq72xc fnp9lpt f1h0usnq fs4ktlq f16h9ulv fx2bmrt f1d6v5y2 f1rirnrt f1uu00uk fkvaka8 f1ux7til f9a0qzu f1lkg8j3 fkc42ay fq7113v ff1wgvm fiob0tu f1j6scgf f1x4h75k f4xjyn1 fbgcvur f1ks1yx8 f1o6qegi fcnxywj fmxjhhp f9ddjv3 f17t0x8g f194v5ow f1qgg65p fk7jm04 fhgccpy f32wu9k fu5nqqq f13prjl2 f1czftr5 f1nl83rv f12k37oa fr96u23 f18ktai2 fwbmr0d f44c6la frrbwxo f1um7c6d f6pwzcr',
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
      style: `position: fixed; top: ${coordinates.bottom + 5}px; left: ${coordinates.right - 150}px; z-index: 999999;`,
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
        const subjectInput = composeArea ? composeArea.querySelector('input[aria-label*="Subject"]') : null

        if (emailBody && subjectInput) {
            emailBody.innerHTML = draft.body.replace(/\n/g, "<br>");
            subjectInput.value = draft.subject;
            subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
            subjectInput.dispatchEvent(new Event('change', { bubbles: true }));

        } 
        const dropdown = document.querySelector('#dropdownContainer');
        if (dropdown) dropdown.remove();
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
