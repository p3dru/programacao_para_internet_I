import requests
import requests_cache
from bs4 import BeautifulSoup


requests_cache.install_cache('q_1')
#response = requests.get('https://www.google.com/search?q=wikipedia&oq=wikipedia&aqs=chrome.0.0i131i433i512j46i131i433i512j0i131i433i512j0i3j0i512l2j46i512j0i131i433i512j0i512l2.3366j1j7&sourceid=chrome&ie=UTF-8')
#response = requests.get('https://innsite.com.br/7-sites-para-colocar-link-na-bio/')
response = requests.get('https://youtube.com')
soup = BeautifulSoup(response.text, 'html.parser')
links = soup.find_all('a')

for link in links:
    print(link.get('href'))