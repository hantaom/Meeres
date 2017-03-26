import http.client, urllib.request, urllib.parse, urllib.error, base64, json, requests


def getKeyPhrases(_input):
    headers = {
        # Request headers
        'Ocp-Apim-Subscription-Key': '8f75c4b05dfd44de81b80ea5b5928a37',
        'Content-Type': 'application/json',
        'Accept': 'application/json'

    }

    params = urllib.parse.urlencode({
    })

    body = {
        "documents": [
        {
          "Ocp-Apim-Subscription-Key": "8f75c4b05dfd44de81b80ea5b5928a37",
          "language": "en",
          "id": "1",
          "text": _input
        }
      ]
    }

    url = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases'
    r = requests.post(url, data=json.dumps(body), headers=headers)
    return json.loads(r.text)["documents"][0]["keyPhrases"]
