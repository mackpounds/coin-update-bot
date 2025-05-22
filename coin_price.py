import time
import ssl
import smtplib
from email.mime.multipart import MIMEMultipart as MM
from email.mime.text import MIMEText as MT
from bs4 import BeautifulSoup as bs
import requests



crypto = 'Nillion'

base_url = 'https://api.exchangerate-api.com/v4/latest/USD'
rate_responds = requests.get(base_url)
data = rate_responds.json()
naira_rate = data['rates']['NGN']

def get_coin_info(coin):
    url = f"https://coinmarketcap.com/currencies/{coin}/"
    coin_responds = requests.get(url)


    try:
        soup = bs(coin_responds.text, "html.parser")
        price = soup.find('div', attrs = {'class': 'sc-65e7f566-0 czwNaM flexStart alignBaseline'}).find('span', attrs = {'class':'sc-65e7f566-0 WXGwg base-text'}).text
        volume_tag = soup.find('p', attrs = {'class': 'sc-71024e3e-0 sc-8ec8b63a-1 bgxfSG icQYnE change-text'})
        for svg in volume_tag.find_all("svg"):
            svg.decompose()
        volume = volume_tag.get_text(strip=True)
        return price, volume
    except Exception as e:
        print("There was a code Error", e)

# price = get_coin_info('nillion')
# print(price)



def compose_msg(last_price, alert_type="up"):

    last_price_str = last_price.replace("$", "").replace(",", "")
    price_float = float(last_price_str)
    converted_price = round(price_float * naira_rate, 2)
    formatted_price = f'{converted_price:,.2f}'
    price, volume = get_coin_info(crypto)
    if alert_type == 'up':
        mssg = f"""
               <html>
                <body style='font-family: \'poppins\', san-serif'>
                   <h4>🚨Update on {crypto} Price</h4>
                   <p style='font-style: italic;'>{crypto} price is High by <span style="color:green;">{volume}</span> <br>\n Now{last_price} ~ NGN{formatted_price}</p>
                </body>
               </html>
               """
    else:
         mssg = f"""
                <html>
                  <body style='font-family: \'poppins\', san-serif'>
                       <h4>📉 Update on {crypto} Price</h4>
                       <p style='font-style: italic;'>{crypto} price is low by <span style="color:red;">{volume}</span> <br>\n Now {last_price} ~ NGN{formatted_price}</p>
                  </body>     
                </html>
            """

    return mssg



def send_mail(html, last_price):
    msg = MM('alternative')
    sender = 'igiliegbepatrick@gmail.com'
    receiver = 'tispend55@gmail.com'
    password = 'qshffaeoblrvghqq'

    msg['Subject'] = "Crypto Price Alert"
    msg['from'] = sender
    msg['to'] = receiver
    MTobj = MT(html, 'html')
    msg.attach(MTobj)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())
        print(f'Email Sent SUCCESSFULLY. The Current {crypto} Price is ', last_price)


def main():
    #last price
    last_price = -1

    above_threshold = 0.4800
    below_threshold = 0.4500
    alert_set_up = False
    alert_set_down = False

    while True:
        price, volume = get_coin_info(crypto)
        if price != last_price:
            print(f'The {crypto} Price is {price}')
            last_price = price

            last_price_str = last_price.replace("$", "").replace(",", "")
            last_price_fl = float(last_price_str)


            if last_price_fl > above_threshold and not alert_set_up:
                html = compose_msg(last_price, "up")
                send_mail(html, last_price)
                alert_set_up = True
                alert_set_down = False #Reset the opposite alert

            elif last_price_fl < below_threshold and not alert_set_down:
                html = compose_msg(last_price, "down")
                send_mail(html, last_price)
                alert_set_down = True
                alert_set_up = False #Reset opposite alert


        time.sleep(2)


main()