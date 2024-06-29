import sys
import pandas as pd
import json

def describe_data(file_path):
    try:
        # Read the CSV file
        data = pd.read_csv(file_path)
        
        # Get basic information about the data
        description = data.describe().to_dict()

        # Convert the description dictionary to JSON
        json_result = json.dumps(description, ensure_ascii=False)
        
        # Print JSON result to stdout
        print(json_result)
        
    except Exception as e:
        # Print error message to stderr
        print(str(e), file=sys.stderr)

if __name__ == "__main__":
    file_path = sys.argv[1]
    describe_data(file_path)
