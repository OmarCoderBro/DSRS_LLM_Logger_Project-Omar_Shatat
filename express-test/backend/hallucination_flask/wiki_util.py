import requests

def get_wikipedia_context(query):
    try:
        search_url = "https://en.wikipedia.org/w/api.php"
        search_params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": query,
            "utf8": 1,
        }

        search_response = requests.get(search_url, params=search_params, timeout=5)

        # Make sure the response is valid JSON
        try:
            search_data = search_response.json()
        except ValueError:
            return "Wikipedia returned an invalid response."

        if "query" not in search_data or "search" not in search_data["query"]:
            return "No relevant information found on Wikipedia."

        results = search_data["query"]["search"]
        if not results:
            return "No relevant information found on Wikipedia."

        page_title = results[0]["title"]
        summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title}"
        summary_response = requests.get(summary_url, timeout=5)

        try:
            summary_data = summary_response.json()
        except ValueError:
            return "Wikipedia summary could not be parsed."

        return summary_data.get("extract", "No summary found.")

    except Exception as e:
        print(f"[Wikipedia Error] {e}")
        return "Error fetching data from Wikipedia."