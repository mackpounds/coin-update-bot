import smtplib
import ssl
from email.mime.multipart import MIMEMultipart as MM
from email.mime.text import MIMEText as MT
from email.mime.image import MIMEImage as MMI
import requests as rq

msg = MM("related")
sender = "igiliegbepatrick@gmail.com"
reciever = "igiliegbepatrick@gmail.com"
password = "qshffaeoblrvghqq"


msg['Subject'] = "Testing Recipient"
msg['From'] = sender
msg['To'] = reciever



base_url = "https://pokeapi.co/api/v2/"
def get_pokemon_info(name):
    response = rq.get(f"{base_url}/pokemon/{name}")
    try:
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print("The status Code is: ", response.status_code)
            return None
    except Exception as e:
        print("The Error code", e)
        return None

pokemon_name = "ditto"
get_pokemon_data = get_pokemon_info(pokemon_name)

if get_pokemon_data:
    p_name = get_pokemon_data['name']
    abilities = get_pokemon_data['abilities']
    for a in abilities:
        p_ability = a['ability']['name']

    compose_msg = f"""
    <html>
     <body>
        <h1 style="text-align:center;">This Email was sent through a code</h1>
        <span style="width: 100%; text-align:center">
            <p>A letter of confirmation</p>
            <img src="cid:image1" width="60px">
            {p_name}\n{p_ability}
            <button type=button style="padding:8px 10px; border-radius: 5px;
             font-family:poppins; border: 0; background-color: skyblue;">Accept Invite</button>
        </span>
     </body>
    </html>
    """
    msg_alt = MM("alternative")
    msg.attach(msg_alt)
    MTObj = MT(compose_msg, "html")
    msg_alt.attach(MTObj)

else:
    print("Unsuccessful with the data file")



context = ssl.create_default_context()
try:
    with open("image/cologne .jpeg", "rb") as img_file:
        img = MMI(img_file.read())
        img.add_header("Content ID", "image1")
        msg.attach(img)


    with smtplib.SMTP_SSL(host='smtp.gmail.com', port=465, context=context) as server:
        server.login(sender, password)
        server.sendmail(sender, reciever, msg.as_string())
        print('Email sent successfully!')

except Exception as e:
    print("An SSL Error occured", e)