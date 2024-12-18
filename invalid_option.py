import requests

url = "https://uwaterloo.ca/student-awards-financial-aid/awards/search-results"

missing_options = {42, 48, 50, 69, 77, 94, 114, 125, 166, 167, 169, 174, 175}

for num in missing_options:
    get_url = url + "level=All&type=All&process=All&affiliation=All&program=" + str(num) + "&term=All&citizenship=All&keyword="
    response = requests.get(get_url)

    if response.status_code == 200:
        print("Valid url:" + get_url)
    else:
        print("Error: " + str(response.status_code))
        print("Response Headers:")
        for key, value in response.headers.items():
            print(f"{key}: {value}")

        # Print the response content (if it's not too large)
        # print("Response Body:")
        # print(response.text)
