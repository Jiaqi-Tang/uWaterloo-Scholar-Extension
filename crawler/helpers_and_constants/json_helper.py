import json
from crawler.scholarship import Scholarship


class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        '''
        Ensures Scholarship objects are properly turned into json

        :param obj: Scholarship
        :return: json or dict
        '''
        if isinstance(obj, Scholarship):
            return obj.to_dict()
        return super().default(obj)


def custom_object_hook(obj):
    '''
    Ensures Scholarships are properly created from dicts

    :param obj: dict
    :return: Scholarship or dict
    '''
    if "__type__" in obj and obj["__type__"] == "Scholarship":
        return Scholarship.from_dict(obj)
    return obj


def dict_to_json_file(dict_to_save, file_path):
    with open(file_path, 'w') as json_file:
        json.dump(dict_to_save, json_file, indent=4, cls=CustomEncoder)


def json_file_to_dict(file_path):
    with open(file_path, "r") as json_file:
        dict_loaded = json.load(json_file, object_hook=custom_object_hook)
    return dict_loaded
