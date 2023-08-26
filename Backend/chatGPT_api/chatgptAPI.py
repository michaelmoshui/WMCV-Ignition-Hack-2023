import openai

openai.api_key = "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"

# list models
models = openai.Model.list()

# print the first model's id
print(models.data[0].id)
userInput = "not stop"
while userInput != "stop the conversation":
    userInput = input("Please enter a situation: ")
    if userInput == "stop the conversation":
        break

    prompt = ('''Here is a list of amazon product information in json format:
              
              B07N3H533S	FALSE	0	USD	0	0	0	5	5	https://www.amazon.com/dp/B07N3H533S	25.00	FALSE	FALSE	FALSE	FALSE	Trials Rising Gold Edition - Xbox One [Digital Code]
B07W95HD9T	FALSE	19.99	USD	0	0	0	1643	4.6	https://www.amazon.com/dp/B07W95HD9T	7557.80	FALSE	FALSE	FALSE	FALSE	Need for Speed Heat - Xbox One
B0CCPDXQ4W	FALSE	69.99	USD	0	0	0	18	2	https://www.amazon.com/dp/B0CCPDXQ4W	36.00	FALSE	FALSE	TRUE	FALSE	MADDEN NFL 24: STANDARD EDITION - Xbox [Digital Code]
B07TFP7JFH	TRUE	13.82	USD	14.99	1.17	7.81	33440	4.7	https://www.amazon.com/dp/B07TFP7JFH	157168.00	FALSE	FALSE	FALSE	FALSE	Xbox Game Pass Ultimate: 1 Month Membership [Digital Code]
B0BW33J62S	TRUE	32.99	USD	59.99	27	45.01	50	4.3	https://www.amazon.com/dp/B0BW33J62S	215.00	FALSE	FALSE	FALSE	FALSE	WWE 2K23: Standard Edition - Xbox One [Digital Code]
B08G9J44ZN	FALSE	349.99	USD	0	0	0	28646	4.8	https://www.amazon.com/dp/B08G9J44ZN	137500.80	FALSE	FALSE	FALSE	FALSE	Xbox Series S
B00MMTKXTA	FALSE	0	USD	0	0	0	845	4.4	https://www.amazon.com/dp/B00MMTKXTA	3718.00	FALSE	FALSE	FALSE	FALSE	Xbox One Limited Edition Call of Duty: Advanced Warfare Bundle
B00KAI3KW2	FALSE	0	USD	0	0	0	2554	4.1	https://www.amazon.com/dp/B00KAI3KW2	10471.40	FALSE	FALSE	FALSE	FALSE	Xbox One 500 GB Console - Black [Discontinued]
B00SNMPM0A	FALSE	0	USD	0	0	0	122	4	https://www.amazon.com/dp/B00SNMPM0A	488.00	FALSE	FALSE	FALSE	FALSE	XBOX One 500 GB Black Console
B089M5L82M	FALSE	0	USD	0	0	0	2229	4.5	https://www.amazon.com/dp/B089M5L82M	10030.50	FALSE	FALSE	FALSE	FALSE	Xbox One S 1TB Console [Previous Generation]
B0BZZ9HJBW	FALSE	29.99	USD	0	0	0	26	4.3	https://www.amazon.com/dp/B0BZZ9HJBW	111.80	FALSE	FALSE	FALSE	FALSE	Sponsored Ad - targeal Gaming Headset with Microphone for PC, PS4, PS5, Switch, Xbox One, Xbox Series X|S - 3.5mm Jack Gam...
B017QVPTGA	FALSE	0	USD	0	0	0	151	3.6	https://www.amazon.com/dp/B017QVPTGA	543.60	FALSE	FALSE	FALSE	FALSE	Xbox One Console 500GB - Matte Black
B073858Q9X	FALSE	0	USD	0	0	0	3880	4.6	https://www.amazon.com/dp/B073858Q9X	17848.00	FALSE	FALSE	FALSE	FALSE	Microsoft Xbox One S 1Tb Console - White [Discontinued]
B01MTJA6EV	FALSE	0	USD	0	0	0	3125	4.6	https://www.amazon.com/dp/B01MTJA6EV	14375.00	FALSE	FALSE	FALSE	FALSE	Microsoft Xbox One S 500GB Console - Tom Clancy's Ghost Recon Wildlands Gold Edition bundle
B0BX52JS4G	TRUE	10	USD	39.99	29.99	74.99	1	5	https://www.amazon.com/dp/B0BX52JS4G	5.00	FALSE	FALSE	FALSE	FALSE	Tom Clancy's Rainbow Six Siege Y8 Deluxe Edition - Xbox [Digital Code]
B0C7GW9F88	TRUE	44.99	USD	49.99	5	10	316	4.5	https://www.amazon.com/dp/B0C7GW9F88	1422.00	FALSE	FALSE	TRUE	FALSE	Sponsored Ad - GameSir G7 SE Wired Controller for Xbox Series X|S, Xbox One & Windows 10/11, Plug and Play Gaming Gamepad ...

Can you write a short product description based on this information? It must be in the following format. 

{‘ B09CKFYKWB’ : ‘product description for this product’ , ‘B01MF7056U’ :  ‘product description for this product’ }

The keys are the asin value of the products. Return only the above dictionary. Do not include any other types of messages, explanations, or formats.


'''
              
    )
    user_input = userInput
    # create a chat completion
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}],
    )

    # print the chat completion
    print(chat_completion.choices[0].message.content)
