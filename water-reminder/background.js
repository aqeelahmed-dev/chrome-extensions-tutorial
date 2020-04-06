console.log("in background script")

let defaultDuration = 1.0;

chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log(alarm)
  chrome.notifications.create("my notification", {
    type: "basic",
    iconUrl: "./icons/32.png",
    title: "Drink Water",
    "message": "Dumy notifications"
  }, function (notificationID) {
    console.log("displayed the notification")
  })
});

function createAlarm() {
  chrome.alarms.create("drink water", { delayInMinutes: defaultDuration });
}

createAlarm()

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("Event recieved in background page");
    defaultDuration = request.minutes * 1.0;
    createAlarm()
    sendResponse({ success: true });
  });

// omnibox

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log(text);
  suggest([
    { content: "First content", description: "First desc" },
    { content: "Second Content", description: "Second Desc" }
  ])
})

chrome.omnibox.setDefaultSuggestion({description: "Default suggestion here"})