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
    prompt = (
        "Based on the following situation and situation already given to you from history, only generate and disply a list of object(no additional text, only 2 to 5 objects listed in format of (number in the list.)(object name):(one sentence object description)) to buy, output of one object example would be like this (1. Stationery set: A collection of essential school supplies including pens, pencils, highlighters, erasers, and a ruler.), now here is the situation given:"
        + userInput
    )
    # create a chat completion
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}]
    )

    # print the chat completion
    print(chat_completion.choices[0].message.content)
