from enum import Enum
from crawler.helpers_and_constants.dict import *


# Define the Field Enum
class Field(Enum):
    TYPE = 1
    LEVEL = 2
    CITIZ = 3
    PROC = 4
    TERM = 5
    AFFIL = 6


field_to_dict = {
    Field.TYPE: award_types,
    Field.LEVEL: levels,
    Field.CITIZ: citizenship,
    Field.PROC: selection_process,
    Field.TERM: term,
    Field.AFFIL: affiliation
}


def csv_string_to_list(csv_string):
    return csv_string.split(', ')


# ------ PLACE HOLDER ------ #
def string_to_value(string):
    return string


def scholar_clean(string, field):
    '''
    Transforms strings crawled from the web to become meaningful data

    :param string: string
    :param field: Field
    :return:
    '''
    if field.value < 50:
        # turns a comma separated string into a set of ids
        temp_set = set()
        if string:
            for s in csv_string_to_list(string):
                try:
                    temp_set.add(field_to_dict[field][s])
                except KeyError as e:
                    logging.error(f"Cannot find value in dict\nError {e}", exc_info=True)

        return temp_set
    else:
        # ------ PLACE HOLDER ------ #
        return
