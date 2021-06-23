import re

pattern = "[0-9]+"

name = input("What is your name: ")

if re.search(pattern, name):
    print("Okay great")
else:
    print("Invalid input. Please try again.")

pattern2 = "[a-zA-Z]"
try:
    question = input("What is your weight in lbs: ")
    if re.search(pattern2, question):
        raise ValueError("Invalid entry.")
except ValueError as v:
    print(v)
