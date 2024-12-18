from helpers_and_constants.format_helper import *


class Scholarship:
    def __init__(self, name, award_type, award_description, value_description, eligibility,
                 level, programs, citizenship, selection_process, term, details, deadline,
                 contact, affiliation):
        '''
        Basic constructor
        '''

        self.name = name
        self.award_type = award_type
        self.award_description = award_description
        self.value_description = value_description
        self.eligibility = eligibility
        self.level = level
        self.programs = programs
        self.citizenship = citizenship
        self.selection_process = selection_process
        self.term = term
        self.details = details
        self.deadline = deadline
        self.contact = contact
        self.affiliation = affiliation


    def to_dict(self):
        '''
        Converts Scholarship to dict
        :return: dict
        '''

        data = {"__type__": "Scholarship"}
        data.update(self.__dict__.copy())

        # Coverts sets to lists to be stored as json
        for key, value in data.items():
            if isinstance(value, set):
                data[key] = list(value)
        return data


    def get_preview(self):
        return {
            "description": self.award_description,
            "value": self.value_description,
            "deadline": self.deadline,
            "additional_tags": None # ------PLACE HOLDER------#
        }


    @classmethod
    def from_raw_data(cls, name, award_type, award_description, value_description, eligibility,
                      level, programs, citizenship, selection_process, term, details, deadline,
                      contact, affiliation):
        '''
        Constructor from raw data crawled from a scholarship webpage. Does extra data cleaning
        '''
        return cls(name, scholar_clean(award_type, Field.TYPE), award_description, value_description, eligibility,
                   scholar_clean(level, Field.LEVEL), programs, scholar_clean(citizenship, Field.CITIZ),
                   scholar_clean(selection_process, Field.PROC), scholar_clean(term, Field.TERM), details, deadline,
                   contact, scholar_clean(affiliation, Field.AFFIL))


    @classmethod
    def from_dict(cls, d):
        '''
        Constructor from dict
        '''
        return cls(d["name"], set(d["award_type"]), d["award_description"], d["value_description"], d["eligibility"],
                           set(d["level"]), d["programs"], set(d["citizenship"]), set(d["selection_process"]), set(d["term"]),
                           d["details"], d["deadline"], d["contact"], set(d["affiliation"]))
