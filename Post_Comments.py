import facebook
import json
import time
import sentiment_analysis
import Scrape
import key_phrase_analysis

KEY_PHRASES = ["struggle","midterm", "final", "exam"]
DATE = open('Dates.txt', 'r').read()
pageID = '1687756434851039'
token = 'EAAX4JJPK6jkBACEcJH4S63EeVwE0pOgafCfkU3NocsSVpDncWNz896AmtrXhYhYXIdCwDPtiHCeaPkE9xjNDOjuduSZBM07TSou2c6Mwo1lZBq5E6RVipqV1CQ7EhdRAGWH8ZByEjwZAeJO01xjbi3qNtnSBZBEWMXAGuBfKaa14OjeQDwZAisE2RjB1FWuWUZD'
pattern = '%Y %m %d %H:%M:%S'
AllPosts = [];
class _Post:
    def __init__(self, id, time, message):
        self.id = id
        self.time = time
        self.message = message
        self.score = 2
        self.category = ''

def parseResponse(_posts):
    jsonString = str(_posts)
    jsonString = jsonString.split('[')
    jsonString = jsonString[1].split(']')
    jsonString = jsonString[0]
    jsonString = "[" + jsonString + "]"
    jsonString = jsonString.replace("'", '"')
    return json.loads(jsonString)



def PopulatePostClass(_posts):
    jsonObject = parseResponse(_posts)
    final = len(jsonObject)
    num=0
    while num<final and jsonObject[num]['created_time'] != DATE:
        POST = _Post(jsonObject[num]['id'],jsonObject[num]['created_time'],jsonObject[num]['message'])
        AllPosts.append(POST)
        num += 1


def PostComments():
    for post in AllPosts:
        if post.score < 40:
            keyphrase=key_phrase_analysis.getKeyPhrases(post.message)
            for key in keyphrase:
                print('')
            graph.put_comment(object_id=post.id, message=Scrape.GetQuotes(post.category) )



def GetScore():
    for post in AllPosts:
        score = sentiment_analysis.getTextAnalysis(post.message)
        post.score = score

def StoreDateTimes():
    if len(AllPosts)>0:
        date = AllPosts[0].time
        with open("Dates.txt", "w") as fin:
            pass
            fin.write(date)



graph = facebook.GraphAPI(access_token=token, version='2.7')
attachment =  {
    'name': 'Link name',
    'link': 'https://www.example.com/',
    'caption': 'Check out this example',
    'description': 'This is a longer description of the attachment',
    'picture': 'https://www.example.com/thumbnail.jpg'
}
profile = graph.get_object(pageID)
posts = graph.get_connections(profile['id'], 'posts')

PopulatePostClass(posts)
GetScore()
PostComments()
StoreDateTimes()

#graph.put_comment(object_id='1031262963672150_1032927990172314', message='Great post...')



