import requests
from bs4 import BeautifulSoup


def get_link(soup):
    links = soup.find_all('a')

    for link in links:
        print(link.get('href'))


def request(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    return soup

def to_search(soup, to_search):
    searched = soup.find_all(to_search)
    
    return searched