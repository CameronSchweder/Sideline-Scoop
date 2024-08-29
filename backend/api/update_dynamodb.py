import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Team-RegularSeason-Stats')
response = table.scan()
items = response['Items']

# Add an attribute to table
#for item in items:
#    table.update_item(
#        Key={'teamId': item['teamId']},
#        UpdateExpression="SET away",
#        ExpressionAttributeValues={
#            ':ties': ''
#        }
#    )

#Remove an attribute from table
#for item in items:
#    table.update_item(
#        Key={'teamId': item['teamId']},
#        UpdateExpression="REMOVE alias"
#    )