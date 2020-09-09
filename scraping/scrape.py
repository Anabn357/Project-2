# Import needed libraries

import pandas as pd
from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
import time


executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless = True)

# Visit the whatoplay URL
url = "https://whatoplay.com/best?sort-by=gamer_score"
browser.visit(url)
time.sleep(1)
# Scrape page into soup:
html = browser.html
soup = bs (html, "html.parser")

end = False
j = 0
total_count = 0
asked_count = 11360
data = []
while not(end):
    
    if (j % 25 == 0 and j>0): 
        button = browser.find_by_tag("button")[33]
        button.click()
        time.sleep(1)  
        html = browser.html
        soup = bs(html, 'html.parser')
        j = 0
        
    game_name = soup.find_all("h3", class_ = "jsx-48247765 mdc-typography--subtitle1 name")[j].text
    game_score = soup.find_all("div", class_ = "jsx-937769680 breakdown-score gamer-score")[j].text
    play_score = soup.find_all("div", class_ = "playscore playscore-small sort-mask")[j].find("div").text
    critic_score = soup.find_all("div", class_ = "jsx-937769680 breakdown-score critic-score")[j].text
    platform = soup.find_all("div", class_ = "jsx-48247765 platform")[j].text
    
    data.append({"Name":game_name, "Platform": platform,"Play Score": play_score, "Game Score": game_score, "Critic Score": critic_score}) 
    
    
    j +=1 
    total_count +=1 
      
    print(total_count)
    
    if (total_count >= asked_count):
        end = True
  
df = pd.DataFrame(data)
df.to_csv("result.csv", index= False, header = True)