import re

attempts = 3

while True:
    name = input("What is your name: ")
    if name.isalpha():
        print("Welcome", name)
        break
    else:
        attempts -= 1
        print("WARNING: Only letters, no numbers or special characters. You have", attempts, "left.")
        if attempts == 0:
            print("You have exceeded the amount of attempts. Goodbye!")
            break
        continue

pattern = "[a-zA-Z]"
try:
    weight = input("What is your weight in lbs: ")
    if re.search(pattern, weight):
        raise ValueError("Invalid entry.")
except ValueError as v:
    print(v)

height = input("What is you height: ")

lst = []
for x in height:
    if x.isdigit():
        x = int(x)
        lst.append(x)
    if len(lst) == 2:
        break

feet = lst[0] * 12
inches = lst[1] + 0

real_height = feet + inches
print(real_height, 'inches in height')

'''
BMI Formula is (weight[lbs]/height[lbs]/height[lbs]) * 703
'''


def calc_BMI():
    BMI = (int(weight) / real_height / real_height) * 703
    real_bmi = round(BMI, 1)
    return real_bmi


print(name, "your BMI is", calc_BMI())

if calc_BMI() < 18.5:
    print("You are underweight.")
elif 18.5 < calc_BMI() <= 24.9:
    print("You have normal weight")
elif 24.9 < calc_BMI() <= 29.9:
    print("You are overweight")
elif calc_BMI() > 30.0:
    print("You are overweight and need help.")
