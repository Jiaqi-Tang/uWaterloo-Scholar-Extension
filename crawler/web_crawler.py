from bs4 import BeautifulSoup
import requests

from helpers_and_constants.dict import class_name
from helpers_and_constants.json_helper import *
from helpers_and_constants.global_variables import *
from helpers_and_constants.error_logging_helper import *


def create_scholar_data(url):
    '''
    Crawls the given url and uses the data gathered to create a Scholarship

    :param url: string -- full url of a scholarship
    :return: Scholarship -- created by data scraped from the url
    '''

    response = requests.get(url)
    award_data = {}

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Gathers data of the scholarship title
        try:
            title = soup.find('div', class_="uw-site--title").h1.text
            award_data['title'] = title
        except AttributeError as e:
            logging.error(f"Cannot find scholarship title\nError: {e}", exc_info=True)

        # Gathers all other data of the scholarship
        for key, value in class_name.items():
            try:
                data_elements = soup.find('div', class_=key).find_all('div', class_='field-item')

                data_string = ''
                for data in data_elements:
                    data_string = data_string + data.text + '\n'

                if data_string != '':
                    award_data[value] = data_string.rstrip('\n')
                else:
                    award_data[value] = None

            except AttributeError as e:
                logging.error(f"Cannot find scholarship {value}\nError{e}", exc_info=True)
                award_data[value] = None

        return Scholarship.from_raw_data(award_data['title'], award_data['type'], award_data['description'], award_data['value'],
                           award_data['eligibility'], award_data['level'], award_data['program'], award_data['citizenship'],
                           award_data['selection-process'], award_data['term'], award_data['details'], award_data['deadline'],
                           award_data['contact'], award_data['affiliation'])
    else:
        logging.error(f"Cannot connect to url {url}\nStatus code {response.status_code}")
        return None


def update_all_scholar_data():
    '''
    Crawles all urls in the database and updates the scholarships database accordingly
    '''

    logging.info(f"Updating all scholars")

    award_links_dict = json_file_to_dict(DATABASES_LINKS_JSON)
    scholarships_dict = json_file_to_dict(DATABASES_SCHOLARSHIPS_JSON)

    for link, scholar_id in award_links_dict.items():
        link = BASE_URL + link

        logging.info(f"On scholar {scholar_id}, crawling {link}")

        if scholar_id in scholarships_dict:
            scholarships_dict[scholar_id] = create_scholar_data(link)
        else:
            scholarships_dict[len(scholarships_dict)] = create_scholar_data(link)

    safe_exit_if_error_occurred("Error occurred when running update_all_scholar_data().\nProgram exiting without updating database, see logs for more information")
    dict_to_json_file(scholarships_dict, DATABASES_SCHOLARSHIPS_JSON)


def update_all_link_data():
    '''
    Crawls the entire scholarship webpage again and updates link database
    '''
    award_links_dict = json_file_to_dict(DATABASES_LINKS_JSON)

    query = "?page="
    page = 0
    while True:
        search_url = BASE_URL + SEARCH_URL + query + str(page)

        try:
            response = requests.get(search_url)
        except Exception as e:
            logging.error(f"Failed to get page {search_url}\nError {e}", exc_info=True)
            break

        if response.status_code == 200:
            logging.info(f"Crawling page {page}")

            soup = BeautifulSoup(response.text, 'html.parser')
            target_divs = soup.find_all('div', class_='views-row')

            # Safe breaking, triggered when there are no more pages
            if not target_divs:
                break

            # Iterate over each div and extract hrefs
            for target_div in target_divs:
                try:
                    link = target_div.find('a').get('href')
                    if not award_links_dict[link]:
                        award_links_dict[link] = max(award_links_dict.values(), default=0) + 1
                except Exception as e:
                    logging.info(f"Cannot extract href\nError {e}", exc_info=True)
        else:
            logging.error(f"Failed to fetch the webpage. Status code: {response.status_code}")
            break

        page += 1

    safe_exit_if_error_occurred("Error occurred when running update_all_link_data().\nProgram exiting without updating database, see logs for more information")
    dict_to_json_file(award_links_dict, DATABASES_LINKS_JSON)


def get_all_options():
    response = requests.get(BASE_URL + SEARCH_URL)
    options_dict = {}

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        options = soup.find_all('option')

        # Print the values or text of the options
        for option in options:
            try:
                options_dict[int(option.get('value'))] = option.text.lstrip("-")
            except ValueError:
                options_dict[0] = option.text
    else:
        logging.error(f"Failed to fetch the webpage. Status code: {response.status_code}")

    for key, value in options_dict.items():
        print("'" + value + "': " + str(key) + ",")

