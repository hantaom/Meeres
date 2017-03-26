from random import randint

import requests
from bs4 import BeautifulSoup

def GetQuotes(Category):
    topic='positive'
    pageNum=1
    quotes = []
    if Category!='':
        topic=Category
    while pageNum <= 10:
        r = requests.get("https://www.brainyquote.com/quotes/topics/topic_" + topic + str(pageNum))
        html_doc = r.text
        soup = BeautifulSoup(html_doc, 'html.parser')
        quoteTags = soup.findAll('a', { "class" : "b-qt" })
        for quote in quoteTags:
            quotes.append(quote.text)
        pageNum += 1

    phrases=["You seem a little down, so here are some words of advice for you:",
             "Things aren't going your way? Well here are some words of advice for you:",
             "Having a bad day? Here is some wisdom from famous people to brighten up your day:",
             "A wise man once said:",
             "It is easy to feel hopeless sometimes, but believe me:"]

    comment = phrases[randint(0,4)] + "\n" + "\n" + "\""
    comment += quotes[randint(0, len(quotes)-1)] + "\"" + "\n" + "\n" + "If you need someone to talk to, feel free to message me!"
    print(comment)
    print(comment)
    print(comment)
    print(comment)
    print(comment)
    print(comment)
    print(comment)
    print(comment)
    print (comment)
    return comment
GetQuotes("")