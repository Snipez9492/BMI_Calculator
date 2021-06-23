import re

attempts = 3

while True:
    name = input("What is your name: ")
    if name.isalpha():
        print("Welcome", name)
        break
    else:
        print("WARNING: Only letters, no numbers or special characters. You have", attempts, "left.")
        attempts -= 1
        if attempts == 0:
            print("You have exceeded the amount of attempts. Goodbye!")
            break
        continue


pattern2 = "[a-zA-Z]"
try:
    question = input("What is your weight in lbs: ")
    if re.search(pattern2, question):
        raise ValueError("Invalid entry.")
except ValueError as v:
    print(v)
