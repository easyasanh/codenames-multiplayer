# python3
import requests
def download(fileName):
    f = open(fileName,'wb')
    f.write(requests.get('https://thispersondoesnotexist.com/image', headers={'User-Agent': 'My User Agent 1.0'}).content)
    f.close()

for i in range(2000):
    download('image' + str(i)+'.jpg')
