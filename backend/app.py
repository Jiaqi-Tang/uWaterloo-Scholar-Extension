import logging

from flask import Flask, request, jsonify
from crawler.web_crawler import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=BASE_URL)

links = None
scholars = None

def load_databases():
    award_links_dict = links
    scholarship_dict = scholars
    if award_links_dict is None or scholarship_dict is None:  # Load only once
        award_links_dict = json_file_to_dict(DATABASES_LINKS_JSON)
        scholarship_dict = json_file_to_dict(DATABASES_SCHOLARSHIPS_JSON)
        scholarship_dict = {int(k): v for k, v in scholarship_dict.items()}
    return award_links_dict, scholarship_dict


@app.route('/api/get-preview', methods=['GET'])
def get_preview():
    award_links_dict, scholarship_dict = load_databases()

    link = request.args.get('link')
    logging.info(f"get_preview for {link}")

    if not link:
        # Return an error if 'item' is not provided
        return jsonify({"error": "Missing 'item' parameter"}), 400

    # Lookup the item in the sample data
    if not award_links_dict[link]:
        award_links_dict[link] = max(award_links_dict.values(), default=0) + 1
        scholarship_dict[award_links_dict[link]] = create_scholar_data(link)

    scholar = scholarship_dict[award_links_dict[link]]

    # Return the preview as a JSON response
    return jsonify(scholar.get_preview())


app.run(host='0.0.0.0', port=5000, debug=True)
