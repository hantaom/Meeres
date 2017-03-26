/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);
var request = require('superagent');

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;


// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
/*
.matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
*/

.matches('Greeting',(session,args) => {
    session.send("Hello! My name is Meeres! If there is anything I can do for you, feel free to ask!");
})
.matches('HaveQuestion',(session,args) => {
    session.beginDialog('/ChooseQuestion');
})
.matches('Greeting-Yes',(session,args) => {
    session.send('Yes! You can always talk to me! What would you like to talk about?');
})
.matches('academicsHelp',(session,args) => {
    session.beginDialog('/AcademicHelp');
    
})
.matches('needFriends',(session,args) => {
    session.beginDialog('/NeedFriends');
})
.matches('sorryToHear',(session,args) => {
    session.send('I’m sorry to hear that. This may seem like a big problem right now, but it happens to more students than you think. Why do you think it happened?');
})
.matches('whatsWrong',(session,args) => {
    session.send('What’s wrong?');
})
.matches('Ending',(session,args) => {
    session.send('Thank you for choosing to talk to me. Know that no matter what, Meeres’ always here! Know that UBC Counselling is always a resource for you if you need professional help. Here is how to contact them: https://students.ubc.ca/health-wellness/mental-health-support-counselling-services');
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);

var academicChoice ={
    Online:"Online resources",
    Person:"In-person tutoring",
    Talk: "Talk to my professor"
};
    
    
bot.dialog('/AcademicHelp', [
    function (session) {
        builder.Prompts.choice(session, "Looks like there are multiple options to help with your problem! Please select one of the following:",
        [academicChoice.Online, academicChoice.Person, academicChoice.Talk]); 
    },
    function (session, results) {
         var selection = results.response.entity;
        switch (selection) {
             case academicChoice.Online:
                 session.beginDialog('/FindCourse');
                 break;
             case academicChoice.Person: 
                 session.send('AMS offers free tutoring services for students in need. Please refer to the following link for more information: https://www.ams.ubc.ca/services/tutoring/');
                 session.endDialog();
                 break;
             case academicChoice.Talk:
                 session.beginDialog('/FindProf');
                 break;
        }
        
      }
]);
bot.dialog('/NeedFriends', [
    function (session) {
        builder.Prompts.choice(session, "There are many clubs that you can join on campus to find more friends. Here is a link to get started: https://www.ams.ubc.ca/clubs/joining-a-club/. If there is a specific type of club you are interested in,  please select one of the following:", 
            ["Academics","Community Service","Cultural or Identity","Grassroots or Political","Leisure or Hobby","Media or Performance","Recreational or Athletic","Science","Social","Spiritual"]); 
    },
    function (session, results) {
        var selection = results.response.entity;
        switch (selection) {
             case "Acedemics":
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Community Serivce");
                  break;
             case "Community Service":
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Academic");
                  break;
             case "Cultural or Identity": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Community Serivce");
                  break;
             case "Grassroots or Political": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Grassroots or Political");
                  break;
             case "Leisure or Hobby": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Leisure or Hobby");
                  break;
             case "Media or Performance": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Media or Performance");
                  break;
             case "Recreational or Athletic": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Recreational or Athletic");
                  break;
             case "Science": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Science");
                  break;
            case "Social": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Social");
                  break;
            case "Spiritual": 
                  session.send("Here is the list of all the clubs: https://www.campusvibe.ca/campusvibe/groups/cea260f5-8aab-4e11-bccf-fe4a846e62dc#groupcategory=Spiritual");
                  break;
                 
                
        }
        session.endDialog();
  
      }
]);
bot.dialog('/FindCourse', [
    function (session) {
        builder.Prompts.text(session, "What topic are you confused about?")
    },
    function (session, results) {
        if (results.response) {
            var resultString = results.response.entity;
            request
            .get('https://api.cognitive.microsoft.com/bing/v5.0/search')
            .query({ q: session.message.text })
            .set('Ocp-Apim-Subscription-Key','8cfd9c67654745b7bdc78cdf56cf9299')
            .end(function(err, res){
            var returnString = res.body.webPages.value[0].url;
            session.send("Here is some resources for you" + returnString);
        });
        } else {
            session.send("ok");
        }
        session.endDialog();
      }
]);
bot.dialog('/FindProf', [
    function (session) {
        builder.Prompts.text(session, "What is the full name of your professor?")
    },
    function (session, results) {
        session.send(results.response.entity)
        if (results.response) {
            var resultString = results.response.entity;
            request
            .get('https://api.cognitive.microsoft.com/bing/v5.0/search')
            .query({ q: session.message.text + "UBC Professor" })
            .set('Ocp-Apim-Subscription-Key','8cfd9c67654745b7bdc78cdf56cf9299')
            .end(function(err, res){
            var returnString = res.body.webPages.value[0].url;
            session.send("Here is your professors profile page" + returnString);
        });
        } 
        else {
            session.send("ok");
        }
        session.endDialog();
      }
]);

bot.dialog('/ChooseQuestion', [
    function (session) {
        builder.Prompts.choice(session, "What types of question do you have?", ["Search","Depression","General Inquiry"]); 
    },
    function (session, results) {
        var selection = results.response.entity;
        if (results.response) {
            switch(selection){
                case "Search":
                    return session.send("Oh you have a search question? My friend BING can help!");
                case "Depression":
                    return session.send('What’s wrong?');
                case "General Inquiry":
                    return session.send("How may I help you?");
            }
          
            
        } else {
            session.send("ok");
        }
        session.endDialog();
    }
   
]);





if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

